const workerDirectory = new URL('./', self.location.href);
const pyodideIndexUrl = new URL('pyodide/', workerDirectory).href;
importScripts(new URL('pyodide/pyodide.js', workerDirectory).href);

let pyodidePromise;
let messageQueue = Promise.resolve();

async function getRuntime() {
  if (!pyodidePromise) {
    pyodidePromise = self.loadPyodide({ indexURL: pyodideIndexUrl }).catch((error) => {
      console.warn('Local Pyodide assets unavailable; trying the CDN.', error);
      return self.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.21.3/full/' });
    });
  }
  return pyodidePromise;
}

async function lintPython(pyodide, code) {
  pyodide.globals.set('__playground_source', code);
  let resultProxy;
  try {
    resultProxy = await pyodide.runPythonAsync(`
import ast as _ast
import builtins as _builtins

try:
    _tree = _ast.parse(__playground_source, filename="<playground>", mode="exec")
    _diagnostics = []
    _bound_names = set(dir(_builtins)) | {"__name__"}
    for _node in _ast.walk(_tree):
        if isinstance(_node, _ast.Name) and isinstance(_node.ctx, _ast.Store):
            _bound_names.add(_node.id)
        elif isinstance(_node, (_ast.FunctionDef, _ast.AsyncFunctionDef, _ast.ClassDef)):
            _bound_names.add(_node.name)
            if isinstance(_node, (_ast.FunctionDef, _ast.AsyncFunctionDef)):
                _bound_names.update(_arg.arg for _arg in _node.args.posonlyargs + _node.args.args + _node.args.kwonlyargs)
                if _node.args.vararg:
                    _bound_names.add(_node.args.vararg.arg)
                if _node.args.kwarg:
                    _bound_names.add(_node.args.kwarg.arg)
        elif isinstance(_node, _ast.Import):
            _bound_names.update(_alias.asname or _alias.name.split(".")[0] for _alias in _node.names)
        elif isinstance(_node, _ast.ImportFrom):
            _bound_names.update(_alias.asname or _alias.name for _alias in _node.names if _alias.name != "*")
        elif isinstance(_node, _ast.ExceptHandler) and _node.name:
            _bound_names.add(_node.name)
    for _node in _ast.walk(_tree):
        if isinstance(_node, _ast.Name) and isinstance(_node.ctx, _ast.Load) and _node.id not in _bound_names:
            _diagnostics.append({"line": _node.lineno, "column": _node.col_offset + 1, "severity": "warning", "message": "Name '" + _node.id + "' may be undefined."})
except SyntaxError as _syntax_error:
    _diagnostics = [{"line": _syntax_error.lineno or 1, "column": _syntax_error.offset or 1, "severity": "error", "message": _syntax_error.msg or str(_syntax_error)}]
_diagnostics
`);
    const result = resultProxy.toJs();
    return Array.from(result, (item) => ({
      line: Number(item.get('line')) || 1,
      column: Number(item.get('column')) || 1,
      severity: item.get('severity') ?? 'error',
      message: item.get('message') ?? 'Python source issue.',
    }));
  } finally {
    resultProxy?.destroy();
    pyodide.globals.delete('__playground_source');
  }
}

async function runCase(pyodide, code, testCase) {
  pyodide.globals.set('__playground_source', code);
  pyodide.globals.set('__playground_input', testCase.input);
  const startedAt = performance.now();
  let resultProxy;
  try {
    resultProxy = await pyodide.runPythonAsync(`
import io
import sys
import traceback

_saved_stdout = sys.stdout
_saved_stderr = sys.stderr
_saved_stdin = sys.stdin
_out = io.StringIO()
_err = io.StringIO()
sys.stdout = _out
sys.stderr = _err
sys.stdin = io.StringIO(__playground_input)
try:
    exec(compile(__playground_source, "<playground>", "exec"), {"__name__": "__main__"})
    _result = {"stdout": _out.getvalue(), "error": _err.getvalue()}
except BaseException:
    _result = {"stdout": _out.getvalue(), "error": traceback.format_exc()}
finally:
    sys.stdout = _saved_stdout
    sys.stderr = _saved_stderr
    sys.stdin = _saved_stdin
_result
`);
    const pyResult = resultProxy.toJs();
    return {
      caseId: testCase.id,
      stdout: pyResult.get('stdout') ?? '',
      error: pyResult.get('error') ?? '',
      runtimeMs: Math.max(0.01, performance.now() - startedAt),
    };
  } finally {
    resultProxy?.destroy();
    pyodide.globals.delete('__playground_source');
    pyodide.globals.delete('__playground_input');
  }
}

async function processMessage(data) {
  const { code, cases, requestId, action } = data;
  const pyodide = await getRuntime();
  if (action === 'lint') {
    const diagnostics = await lintPython(pyodide, code);
    self.postMessage({ requestId, diagnostics });
    return;
  }
  // Auto-load packages from Pyodide's package index for static imports such as numpy.
  await pyodide.loadPackagesFromImports(code);
  const results = [];
  for (const testCase of cases ?? []) results.push(await runCase(pyodide, code, testCase));
  self.postMessage({ requestId, results });
}

self.onmessage = (event) => {
  messageQueue = messageQueue.then(() => processMessage(event.data)).catch((error) => {
    self.postMessage({
      requestId: event.data.requestId,
      error: error instanceof Error ? error.message : String(error),
    });
  });
};
