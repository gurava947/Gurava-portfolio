export default function MaterialSymbol({ name, className = "" }) {
  return (
    <span className={`material-symbol${className ? ` ${className}` : ""}`} aria-hidden="true">
      {name}
    </span>
  );
}
