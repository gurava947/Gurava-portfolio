import "../../styles/code-plate.css";

// A Python build ships no screenshot, so a poster slot would otherwise fall back to a pair of
// initials — which reads as "nothing here" rather than "this is the program". The plate shows the
// supplied snippet and the line it prints instead.
//
// Truncation happens here rather than in CSS because a clipped <pre> still reserves the height of
// every line that was dropped, and the plate has to fit a tile that is ~115px wide on a phone.
const CODE_LINES = 4;
const CODE_WIDTH = 38;
const OUTPUT_WIDTH = 46;

export function codePlateLines(code) {
  return String(code || "")
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .slice(0, CODE_LINES)
    .map((line) => (line.length > CODE_WIDTH ? `${line.slice(0, CODE_WIDTH - 1).trimEnd()}…` : line));
}

export function codePlateOutput(output) {
  const text = String(output || "").trim();
  if (!text) return "";
  return text.length > OUTPUT_WIDTH ? `${text.slice(0, OUTPUT_WIDTH - 1)}…` : text;
}

export default function CodePlate({ code, output, language, className = "" }) {
  const lines = codePlateLines(code);
  if (lines.length === 0) return null;
  const printed = codePlateOutput(output);
  return (
    <span className={`code-plate${className ? ` ${className}` : ""}`} aria-hidden="true">
      <span className="code-plate-bar">
        <i /><i /><i />
        <b>{language || "code"}</b>
      </span>
      <pre className="code-plate-body">{lines.join("\n")}</pre>
      {printed && (
        <span className="code-plate-out">
          <em>out</em>
          <strong>{printed}</strong>
        </span>
      )}
    </span>
  );
}
