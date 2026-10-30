/* The 3D stage engine.

   This module is the only place `three` and `gsap` are imported, and it is reached exclusively
   through `import("../three/stage3d")` from Three3DStage — which never renders a canvas, and so never
   runs that import, while the style is `off`. That is what keeps about 150KB of engine out of what a
   visitor who never opened the Studio downloads, and it is why the script byte budget in
   lighthouserc.cjs survives this feature.

   Three performance rules hold throughout:
   - one InstancedMesh per scene, so every style draws in a single call (plus one for links);
   - the device ratio is `min(devicePixelRatio, cap, 2)`, never a raw device value;
   - `THREE.Clock` gives a delta, scene time is accumulated from it, and every instance position is a
     closed-form function of that accumulated time. Nothing is integrated per frame, so a 120Hz phone
     and a throttled 30Hz laptop land on the same geometry. */

import * as THREE from "three";
import { gsap } from "gsap";
import { getThree3dScene, normalizeThree3d, resolveInstanceCount, resolvePixelRatio } from "../config/three3d";

const FRAME_DELTA_CAP = 1 / 20;
const POINTER_LERP = 8;
const POINTER_RADIUS = 3.6;
const POINTER_PUSH = 1.3;
const SHELF_CELLS = 48;
const SHELF_ATLAS_COLUMNS = 12;
const SHELF_CELL_WIDTH = 256;
const SHELF_CELL_HEIGHT = 160;
const SHELF_STEP_X = 2.42;
const SHELF_STEP_Y = 1.56;

export function isThree3DSupported() {
  try {
    const probe = document.createElement("canvas");
    return Boolean(probe.getContext("webgl2") || probe.getContext("webgl"));
  } catch {
    return false;
  }
}

function colorRamp(palette) {
  const read = (value, fallback) => {
    try {
      return new THREE.Color(value || fallback);
    } catch {
      return new THREE.Color(fallback);
    }
  };
  return [
    read(palette.primary, "#8b5cf6"),
    read(palette.secondary, "#22d3ee"),
    read(palette.accent, "#f472b6"),
  ];
}

function rampColor(ramp, t, target) {
  const clamped = Math.min(0.9999, Math.max(0, t));
  const span = clamped * (ramp.length - 1);
  const index = Math.floor(span);
  return target.copy(ramp[index]).lerp(ramp[Math.min(index + 1, ramp.length - 1)], span - index);
}

function shapeGeometry(shape) {
  if (shape === "ribbon") return new THREE.PlaneGeometry(0.16, 3.1);
  if (shape === "box") return new THREE.BoxGeometry(0.5, 1, 0.5);
  if (shape === "octahedron") return new THREE.OctahedronGeometry(0.42);
  if (shape === "tetrahedron") return new THREE.TetrahedronGeometry(0.5);
  if (shape === "card") return new THREE.PlaneGeometry(2.16, 1.35);
  return new THREE.IcosahedronGeometry(0.5, 0);
}

/* Each arrangement writes the position of every instance at scene time `t`. They are pure functions
   of (t, seed, spread) — no accumulator, no velocity integration — which is what makes the animation
   frame-rate independent rather than merely frame-rate smooth. */
const ARRANGEMENTS = {
  field(data, count, t, spread) {
    for (let i = 0; i < count; i += 1) {
      const rate = data.rates[i];
      data.base[i * 3] = data.positions[i * 3] + Math.sin(t * rate * 0.35 + data.seeds[i * 3]) * 1.1 * spread;
      data.base[i * 3 + 1] = data.positions[i * 3 + 1] + Math.cos(t * rate * 0.28 + data.seeds[i * 3 + 1]) * 0.85 * spread;
      data.base[i * 3 + 2] = data.positions[i * 3 + 2] + Math.sin(t * rate * 0.31 + data.seeds[i * 3] * 1.7) * 0.9 * spread;
    }
  },
  vortex(data, count, t) {
    for (let i = 0; i < count; i += 1) {
      const radiusFactor = data.params[i * 2 + 1];
      const angle = data.params[i * 2] + t * (0.9 - radiusFactor * 0.55);
      const radius = radiusFactor * 7.4 * (1 + 0.1 * Math.sin(t * 0.7 + data.seeds[i * 3]));
      data.base[i * 3] = Math.cos(angle) * radius;
      data.base[i * 3 + 1] = Math.sin(angle) * radius * 0.62;
      data.base[i * 3 + 2] = data.positions[i * 3 + 2] + Math.sin(angle * 2) * 1.4;
    }
  },
  orbit(data, count, t) {
    for (let i = 0; i < count; i += 1) {
      const ring = data.params[i * 2];
      const tilt = 0.42 + ring * 0.5;
      const angle = data.params[i * 2 + 1] + (t * (ring % 2 === 0 ? 0.5 : -0.38)) / (1 + ring * 0.4);
      const radius = 2.6 + ring * 2.2;
      const side = Math.sin(angle) * radius;
      data.base[i * 3] = Math.cos(angle) * radius;
      data.base[i * 3 + 1] = side * Math.cos(tilt);
      data.base[i * 3 + 2] = side * Math.sin(tilt) + data.positions[i * 3 + 2] * 0.4;
    }
  },
  helix(data, count, t) {
    for (let i = 0; i < count; i += 1) {
      const u = data.params[i * 2];
      const strand = data.params[i * 2 + 1] > 0.5 ? Math.PI : 0;
      const phase = u * Math.PI * 5 + t * 0.8 + strand;
      const rise = u * 18 + t * 1.6;
      data.base[i * 3] = Math.cos(phase) * 3.6;
      data.base[i * 3 + 1] = ((rise + 9) % 18) - 9;
      data.base[i * 3 + 2] = Math.sin(phase) * 2.6;
    }
  },
  wave(data, count, t, spread) {
    for (let i = 0; i < count; i += 1) {
      const x = ((data.params[i * 2] + t * 0.45 + 11) % 22) - 11;
      data.base[i * 3] = x;
      data.base[i * 3 + 1] = data.positions[i * 3 + 1];
      data.base[i * 3 + 2] = Math.sin(x * 0.42 + t * 0.9 + data.seeds[i * 3] * 0.25) * 2.8 * spread;
      data.scales[i] = 0.75 + 0.45 * Math.sin(x * 0.5 + t * 1.2 + data.seeds[i * 3]);
    }
  },
  grid(data, count, t) {
    for (let i = 0; i < count; i += 1) {
      const x = data.positions[i * 3];
      const z = data.positions[i * 3 + 2];
      const ripple = Math.sin(Math.sqrt(x * x + z * z) * 0.62 - t * 1.5);
      data.base[i * 3] = x;
      data.base[i * 3 + 1] = 0.4 - ripple * 0.9;
      data.base[i * 3 + 2] = z;
      data.scales[i] = 0.45 + Math.abs(ripple) * 1.6;
    }
  },
  grid3d(data, count, t) {
    for (let i = 0; i < count; i += 1) {
      data.base[i * 3] = data.positions[i * 3] + Math.sin(t * 0.6 + data.seeds[i * 3]) * 0.22;
      data.base[i * 3 + 1] = data.positions[i * 3 + 1] + Math.cos(t * 0.55 + data.seeds[i * 3 + 1]) * 0.22;
      data.base[i * 3 + 2] = data.positions[i * 3 + 2];
    }
  },
  scatter(data, count, t) {
    for (let i = 0; i < count; i += 1) {
      const rate = data.rates[i];
      data.base[i * 3] = data.positions[i * 3] + Math.sin(t * rate * 0.2 + data.seeds[i * 3]) * 0.7;
      data.base[i * 3 + 1] = data.positions[i * 3 + 1] + Math.cos(t * rate * 0.24 + data.seeds[i * 3 + 1]) * 0.7;
      data.base[i * 3 + 2] = data.positions[i * 3 + 2] + Math.sin(t * rate * 0.18 + data.seeds[i * 3 + 2]) * 0.9;
      data.spins[i * 3] = t * rate * 0.5;
      data.spins[i * 3 + 1] = t * rate * 0.36;
    }
  },
};

function seedArrangement(arrangement, data, count, spread) {
  const extent = 9 * spread;
  if (arrangement === "vortex") {
    for (let i = 0; i < count; i += 1) {
      data.params[i * 2] = Math.random() * Math.PI * 2;
      data.params[i * 2 + 1] = 0.22 + Math.random() * 0.78;
      data.positions[i * 3 + 2] = (Math.random() - 0.5) * extent * 0.6;
    }
    return;
  }
  if (arrangement === "orbit") {
    for (let i = 0; i < count; i += 1) {
      data.params[i * 2] = i % 3;
      data.params[i * 2 + 1] = Math.random() * Math.PI * 2;
      data.positions[i * 3 + 2] = (Math.random() - 0.5) * extent * 0.5;
    }
    return;
  }
  if (arrangement === "helix") {
    for (let i = 0; i < count; i += 1) {
      data.params[i * 2] = i / count;
      data.params[i * 2 + 1] = Math.random();
    }
    return;
  }
  if (arrangement === "grid" || arrangement === "grid3d") {
    const side = arrangement === "grid3d"
      ? Math.max(2, Math.round(Math.cbrt(count)))
      : Math.max(4, Math.round(Math.sqrt(count)));
    const cell = (extent * 2) / side;
    const layers = arrangement === "grid3d" ? side : 1;
    let index = 0;
    for (let layer = 0; layer < layers && index < count; layer += 1) {
      for (let x = 0; x < side && index < count; x += 1) {
        for (let z = 0; z < side && index < count; z += 1) {
          data.positions[index * 3] = (x - (side - 1) / 2) * cell;
          data.positions[index * 3 + 1] = arrangement === "grid3d" ? (layer - (side - 1) / 2) * cell : 0;
          data.positions[index * 3 + 2] = (z - (side - 1) / 2) * cell;
          index += 1;
        }
      }
    }
    return;
  }
  for (let i = 0; i < count; i += 1) {
    data.positions[i * 3] = (Math.random() - 0.5) * extent * 2;
    data.positions[i * 3 + 1] = (Math.random() - 0.5) * extent * 1.1;
    data.positions[i * 3 + 2] = (Math.random() - 0.5) * extent * 0.7 - 2;
    if (arrangement === "wave") {
      data.params[i * 2] = data.positions[i * 3];
      data.positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
    }
    if (arrangement === "scatter") {
      data.positions[i * 3 + 2] = (Math.random() - 0.5) * extent * 1.6;
    }
  }
}

function shelfAtlas(projects, ramp, mode) {
  const cells = Math.min(projects.length || 1, SHELF_CELLS);
  const columns = Math.min(SHELF_ATLAS_COLUMNS, cells);
  const rows = Math.ceil(cells / columns);
  const canvas = document.createElement("canvas");
  canvas.width = columns * SHELF_CELL_WIDTH;
  canvas.height = rows * SHELF_CELL_HEIGHT;
  const context = canvas.getContext("2d");
  if (!context) return null;
  const ink = mode === "dark" ? "#f4f7fb" : "#131a24";
  const body = mode === "dark" ? "rgba(244,247,251,0.6)" : "rgba(19,26,36,0.6)";
  const panel = mode === "dark" ? "rgba(12,17,28,0.9)" : "rgba(255,255,255,0.95)";
  const accent = new THREE.Color();
  for (let i = 0; i < cells; i += 1) {
    const x = (i % columns) * SHELF_CELL_WIDTH;
    const y = Math.floor(i / columns) * SHELF_CELL_HEIGHT;
    const project = projects[i] || {};
    rampColor(ramp, cells === 1 ? 0.2 : i / (cells - 1), accent);
    context.fillStyle = panel;
    context.fillRect(x, y, SHELF_CELL_WIDTH, SHELF_CELL_HEIGHT);
    context.fillStyle = `#${accent.getHexString()}`;
    context.fillRect(x, y, 8, SHELF_CELL_HEIGHT);
    context.fillRect(x, y + SHELF_CELL_HEIGHT - 6, SHELF_CELL_WIDTH, 6);
    context.fillStyle = ink;
    context.font = "600 24px system-ui, sans-serif";
    const words = String(project.title || `Project ${i + 1}`).split(" ");
    let line = "";
    let lineY = y + 54;
    for (const word of words) {
      const candidate = line ? `${line} ${word}` : word;
      if (line && context.measureText(candidate).width > SHELF_CELL_WIDTH - 44) {
        context.fillText(line, x + 26, lineY);
        line = word;
        lineY += 29;
        if (lineY > y + SHELF_CELL_HEIGHT - 42) {
          line = "";
          break;
        }
      } else {
        line = candidate;
      }
    }
    if (line) context.fillText(line, x + 26, lineY);
    context.fillStyle = body;
    context.font = "500 15px system-ui, sans-serif";
    context.fillText(String(project.category || project.collection || "practice"), x + 26, y + SHELF_CELL_HEIGHT - 22);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 2;
  texture.needsUpdate = true;
  return { texture, columns, rows, cells };
}

export function createThree3DStage({ canvas, projects = [], palette = {}, settings, reducedMotion = false } = {}) {
  if (!canvas || !isThree3DSupported()) return null;

  let current = normalizeThree3d(settings);
  let sourceProjects = projects;
  let motionOff = Boolean(reducedMotion);
  let currentPalette = { mode: "light", ...palette };
  let build = null;
  let elapsed = 0;
  let frame = 0;
  let visible = true;
  let onScreen = true;
  let pixelRatio = 1;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "high-performance" });
  } catch {
    return null;
  }
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 120);
  camera.position.set(0, 0, 15);

  const clock = new THREE.Clock();
  const scratch = new THREE.Object3D();
  const pointer = { x: 0, y: 0, tx: 0, ty: 0, active: false };
  const reveal = { value: current.reveal ? 0 : 1 };

  const sizeStage = () => {
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width || window.innerWidth));
    const height = Math.max(1, Math.round(rect.height || window.innerHeight));
    pixelRatio = resolvePixelRatio(window.devicePixelRatio, current.pixelRatioCap);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height, false);
    renderer.setClearAlpha(0);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  const destroyBuild = () => {
    if (!build) return;
    scene.remove(build.root);
    build.tracked.forEach((object) => {
      object.geometry?.dispose();
      if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
      else object.material?.dispose();
    });
    build.texture?.dispose();
    build = null;
  };

  const render = () => {
    build?.update(elapsed);
    renderer.render(scene, camera);
  };

  const fitShelf = (columns, rows) => {
    const halfWidth = ((columns - 1) / 2) * SHELF_STEP_X + 1.08;
    const halfHeight = ((rows - 1) / 2) * SHELF_STEP_Y + 0.68;
    const tangent = Math.tan((camera.fov * Math.PI) / 360);
    camera.position.set(0, 0, Math.max(halfHeight / tangent, halfWidth / (tangent * camera.aspect)) * 1.12 + 1.4);
    camera.lookAt(0, 0, 0);
  };

  const buildScene = () => {
    destroyBuild();
    const style = getThree3dScene(current);
    if (!style) return;
    const atlasProjects = style.kind === "shelf" ? sourceProjects : [];
    const ramp = colorRamp(currentPalette);
    const spread = current.depth / 5;
    const additive = currentPalette.mode === "dark";
    const root = new THREE.Group();
    const tracked = [];

    if (style.kind === "shelf") {
      const atlas = shelfAtlas(atlasProjects, ramp, currentPalette.mode);
      if (!atlas) return;
      const count = Math.max(1, Math.min(resolveInstanceCount(current), atlas.cells));
      const columns = Math.min(8, Math.max(3, Math.round(Math.sqrt(count * 1.6))));
      const rows = Math.ceil(count / columns);
      const geometry = shapeGeometry("card");
      const cells = new Float32Array(count * 2);
      for (let i = 0; i < count; i += 1) {
        const cell = i % atlas.cells;
        cells[i * 2] = (cell % atlas.columns) / atlas.columns;
        cells[i * 2 + 1] = 1 - (Math.floor(cell / atlas.columns) + 1) / atlas.rows;
      }
      geometry.setAttribute("aCell", new THREE.InstancedBufferAttribute(cells, 2));
      const material = new THREE.ShaderMaterial({
        uniforms: {
          map: { value: atlas.texture },
          uCell: { value: new THREE.Vector2(1 / atlas.columns, 1 / atlas.rows) },
          uOpacity: { value: 1 },
        },
        vertexShader: `
          attribute vec2 aCell;
          uniform vec2 uCell;
          varying vec2 vUv;
          varying float vDistance;
          void main() {
            vUv = uv * uCell + aCell;
            vec4 placed = instanceMatrix * vec4(position, 1.0);
            vec4 viewed = modelViewMatrix * placed;
            vDistance = -viewed.z;
            gl_Position = projectionMatrix * viewed;
          }
        `,
        fragmentShader: `
          uniform sampler2D map;
          uniform float uOpacity;
          varying vec2 vUv;
          varying float vDistance;
          void main() {
            vec4 texel = texture2D(map, vUv);
            float depthFade = clamp(1.3 - vDistance / 34.0, 0.28, 1.0);
            gl_FragColor = vec4(texel.rgb, texel.a * uOpacity * depthFade);
            #include <colorspace_fragment>
          }
        `,
        transparent: true,
        depthWrite: false,
      });
      const mesh = new THREE.InstancedMesh(geometry, material, count);
      mesh.frustumCulled = false;
      mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      root.add(mesh);
      tracked.push(mesh);

      const place = (t) => {
        const breath = motionOff ? 0 : Math.sin(t * 0.5) * 0.05;
        for (let i = 0; i < count; i += 1) {
          const column = i % columns;
          const row = Math.floor(i / columns);
          const x = (column - (columns - 1) / 2) * SHELF_STEP_X;
          const y = ((rows - 1) / 2 - row) * SHELF_STEP_Y;
          const bend = 1 - Math.abs(column - (columns - 1) / 2) / Math.max(columns / 2, 1);
          // One reveal curve drives the whole deck: GSAP advances `reveal.value` in real time and the
          // stagger is derived from it, so the growth is the same at any frame rate.
          const grown = Math.min(1, Math.max(0, reveal.value * 1.6 - (i / count) * 0.6));
          scratch.position.set(x, y, bend * 1.9 - 1.4 + breath * (1 + (i % 3)));
          scratch.rotation.set(breath * 0.4, -x * 0.055, 0);
          scratch.scale.setScalar(0.2 + grown * 0.8);
          scratch.updateMatrix();
          mesh.setMatrixAt(i, scratch.matrix);
        }
        mesh.instanceMatrix.needsUpdate = true;
      };

      fitShelf(columns, rows);
      place(elapsed);
      build = { root, tracked, kind: "shelf", texture: atlas.texture, count, update: place };
      scene.add(root);
      return;
    }

    const count = resolveInstanceCount(current);
    const data = {
      ...seedData(count),
      positions: new Float32Array(count * 3),
      params: new Float32Array(count * 2),
      scales: new Float32Array(count).fill(1),
      spins: new Float32Array(count * 3),
      out: new Float32Array(count * 3),
    };
    seedArrangement(style.arrangement, data, count, spread);
    const geometry = shapeGeometry(style.shape);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      // Fixed alpha per kind; the user's brightness dial belongs to the canvas element itself, so
      // dragging it never touches a material or rebuilds a buffer.
      // Additive blending accumulates, so overlapping instances brighten one another: at 0.9 a
      // default-density field saturates to white and the theme ramp disappears. Normal blending
      // does not stack, so it keeps the heavier alpha.
      opacity: additive ? 0.45 : style.kind === "grid" ? 0.82 : 0.9,
      blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
      side: style.shape === "ribbon" ? THREE.DoubleSide : THREE.FrontSide,
      wireframe: style.shape === "octahedron" || style.shape === "tetrahedron",
    });
    const mesh = new THREE.InstancedMesh(geometry, material, count);
    mesh.frustumCulled = false;
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    root.add(mesh);
    tracked.push(mesh);

    const color = new THREE.Color();
    for (let i = 0; i < count; i += 1) {
      rampColor(ramp, count === 1 ? 0.3 : i / (count - 1), color);
      mesh.setColorAt(i, color);
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

    let links = null;
    let linkPairs = null;
    if (style.links && count > 1) {
      const pairs = Math.min(count - 1, 260);
      linkPairs = new Uint16Array(pairs * 2);
      for (let i = 0; i < pairs; i += 1) {
        linkPairs[i * 2] = i;
        linkPairs[i * 2 + 1] = (i + 1) % count;
      }
      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pairs * 6), 3));
      const lineMaterial = new THREE.LineBasicMaterial({
        color: ramp[1],
        transparent: true,
        opacity: 0.3,
        blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
        depthWrite: false,
      });
      links = new THREE.LineSegments(lineGeometry, lineMaterial);
      links.frustumCulled = false;
      root.add(links);
      tracked.push(links);
    }

    const unit = style.size * (current.size / 6);
    const spinPerInstance = style.arrangement === "scatter" || style.arrangement === "grid3d";
    const update = (t) => {
      (ARRANGEMENTS[style.arrangement] || ARRANGEMENTS.field)(data, count, t, spread);
      const halfHeight = Math.tan((camera.fov * Math.PI) / 360) * Math.max(camera.position.z, 1);
      const px = pointer.x * halfHeight * camera.aspect;
      const py = pointer.y * halfHeight;
      const interactive = current.pointer && pointer.active && style.kind === "particles";
      for (let i = 0; i < count; i += 1) {
        let x = data.base[i * 3];
        let y = data.base[i * 3 + 1];
        if (interactive) {
          const dx = x - px;
          const dy = y - py;
          const distance = Math.sqrt(dx * dx + dy * dy) || 0.0001;
          const push = (1 - distance / POINTER_RADIUS) * POINTER_PUSH;
          if (push > 0) {
            x += (dx / distance) * push;
            y += (dy / distance) * push;
          }
        }
        data.out[i * 3] = x;
        data.out[i * 3 + 1] = y;
        data.out[i * 3 + 2] = data.base[i * 3 + 2];
        scratch.position.set(x, y, data.base[i * 3 + 2]);
        if (spinPerInstance) scratch.rotation.set(data.spins[i * 3] || 0, data.spins[i * 3 + 1] || 0, 0);
        else if (style.arrangement === "wave") scratch.rotation.set(0, 0, Math.sin(t * 0.4 + data.seeds[i * 3]) * 0.25);
        else scratch.rotation.set(0, 0, 0);
        if (style.arrangement === "grid") scratch.scale.set(unit * 0.8, unit * data.scales[i], unit * 0.8);
        else scratch.scale.setScalar(unit * data.scales[i]);
        scratch.updateMatrix();
        mesh.setMatrixAt(i, scratch.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
      if (style.arrangement === "grid3d") {
        root.rotation.y = t * 0.22;
        root.rotation.x = Math.sin(t * 0.17) * 0.28;
      }
      if (links) {
        const attribute = links.geometry.getAttribute("position");
        const array = attribute.array;
        const pairCount = array.length / 6;
        for (let i = 0; i < pairCount; i += 1) {
          const a = linkPairs[i * 2] * 3;
          const b = linkPairs[i * 2 + 1] * 3;
          array[i * 6] = data.out[a];
          array[i * 6 + 1] = data.out[a + 1];
          array[i * 6 + 2] = data.out[a + 2];
          array[i * 6 + 3] = data.out[b];
          array[i * 6 + 4] = data.out[b + 1];
          array[i * 6 + 5] = data.out[b + 2];
        }
        attribute.needsUpdate = true;
      }
    };

    build = { root, tracked, kind: style.kind, count, update };
    scene.add(root);
    update(elapsed);
  };

  const start = () => {
    if (frame || !visible || !onScreen) return;
    clock.getDelta();
    frame = requestAnimationFrame(tick);
  };

  function tick() {
    frame = requestAnimationFrame(tick);
    // One delta per frame, capped: a tab left in the background for ten minutes reports that whole
    // gap on return, and without the cap the scene would jump straight past its own motion.
    const delta = Math.min(clock.getDelta(), FRAME_DELTA_CAP);
    elapsed += delta * (motionOff ? 0 : current.speed / 100);
    const ease = 1 - Math.exp(-POINTER_LERP * delta);
    pointer.x += (pointer.tx - pointer.x) * ease;
    pointer.y += (pointer.ty - pointer.y) * ease;
    render();
  }

  const stop = () => {
    if (!frame) return;
    cancelAnimationFrame(frame);
    frame = 0;
  };

  const onPointerMove = (event) => {
    pointer.active = true;
    pointer.tx = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.ty = -((event.clientY / window.innerHeight) * 2 - 1);
  };
  const onPointerLeave = () => {
    pointer.active = false;
    pointer.tx = 0;
    pointer.ty = 0;
  };
  const onVisibility = () => {
    visible = document.visibilityState !== "hidden";
    if (visible && onScreen) start();
    else stop();
  };

  const resizeObserver = typeof ResizeObserver === "undefined"
    ? null
    : new ResizeObserver(() => {
      sizeStage();
      if (build?.kind === "shelf") buildScene();
      if (!frame) render();
    });
  const screenObserver = typeof IntersectionObserver === "undefined"
    ? null
    : new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen && visible) start();
      else stop();
    }, { threshold: 0 });

  sizeStage();
  buildScene();

  if (current.reveal) {
    reveal.value = 0;
    gsap.fromTo(canvas, { opacity: 0 }, { opacity: 1, duration: 0.7, ease: "power2.out" });
    gsap.fromTo(reveal, { value: 0 }, { value: 1, duration: 1.1, ease: "power3.out", onUpdate: render });
  }
  start();
  resizeObserver?.observe(canvas);
  screenObserver?.observe(canvas);
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("pointerdown", onPointerMove, { passive: true });
  window.addEventListener("blur", onPointerLeave);
  document.addEventListener("visibilitychange", onVisibility);

  const rebuild = () => {
    if (!current.reveal) {
      buildScene();
      render();
      return;
    }
    reveal.value = 0;
    gsap.killTweensOf(canvas);
    gsap.killTweensOf(reveal);
    gsap.to(canvas, {
      opacity: 0.12,
      duration: 0.18,
      onComplete: () => {
        buildScene();
        sizeStage();
        gsap.to(canvas, { opacity: 1, duration: 0.5, ease: "power2.out" });
        gsap.to(reveal, { value: 1, duration: 1.1, ease: "power3.out", onUpdate: render });
      },
    });
  };

  return {
    update(next, options = {}) {
      const normalized = normalizeThree3d(next);
      const incoming = options.palette;
      const paletteChanged = Boolean(incoming) && (
        incoming.primary !== currentPalette.primary
        || incoming.secondary !== currentPalette.secondary
        || incoming.accent !== currentPalette.accent
        || incoming.mode !== currentPalette.mode
      );
      if (paletteChanged) currentPalette = { mode: "light", ...incoming };
      if (options.reducedMotion !== undefined) motionOff = Boolean(options.reducedMotion);
      // The catalogue arrives after first paint, so the deck has to be rebuilt when the project list
      // it draws changes — but only then, because that rebuild re-paints the title atlas.
      const projectsChanged = Boolean(options.projects) && options.projects !== sourceProjects;
      if (projectsChanged) sourceProjects = options.projects;
      const previous = getThree3dScene(current);
      const incomingScene = getThree3dScene(normalized);
      const needsRebuild = normalized.style !== current.style
        || resolveInstanceCount(normalized) !== resolveInstanceCount(current)
        || normalized.depth !== current.depth
        || Boolean(paletteChanged)
        || (projectsChanged && previous?.kind === "shelf")
        || previous?.links !== incomingScene?.links
        || previous?.arrangement !== incomingScene?.arrangement;
      current = normalized;
      if (needsRebuild) rebuild();
      else if (!frame) render();
    },
    getStats() {
      return {
        drawCalls: renderer.info.render.calls,
        instances: build?.count || 0,
        triangles: renderer.info.render.triangles,
        pixelRatio,
      };
    },
    dispose() {
      stop();
      gsap.killTweensOf(canvas);
      gsap.killTweensOf(reveal);
      resizeObserver?.disconnect();
      screenObserver?.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerMove);
      window.removeEventListener("blur", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      destroyBuild();
      renderer.dispose();
    },
  };
}

function seedData(count) {
  return {
    base: new Float32Array(count * 3),
    seeds: new Float32Array(count * 3),
    rates: Float32Array.from({ length: count }, () => 0.6 + Math.random() * 0.8),
  };
}
