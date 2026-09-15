export function severityColor(severity: string): string {
  const s = severity.toLowerCase();
  if (s === "critical") return "#e0473e";
  if (s === "high") return "var(--color-sev-high)";
  if (s === "medium") return "var(--color-sev-medium)";
  return "var(--color-sev-low)";
}

export function SeverityBadge({ severity }: { severity: string }) {
  const color = severityColor(severity);
  return (
    <span
      className="font-mono text-xs px-2 py-1 rounded shrink-0 inline-flex items-center gap-1.5"
      style={{ color: color, backgroundColor: "rgba(255,255,255,0.03)" }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
      {severity.toUpperCase()}
    </span>
  );
}
