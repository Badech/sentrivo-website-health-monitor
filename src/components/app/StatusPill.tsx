import { cn } from "@/lib/utils";

interface StatusPillProps {
  status: "healthy" | "warning" | "critical";
  label?: string;
}

export function StatusPill({ status, label }: StatusPillProps) {
  const config = {
    healthy: { bg: "bg-success/10", text: "text-success", dot: "bg-success", defaultLabel: "Healthy" },
    warning: { bg: "bg-warning/10", text: "text-warning", dot: "bg-warning", defaultLabel: "Warning" },
    critical: { bg: "bg-critical/10", text: "text-critical", dot: "bg-critical", defaultLabel: "Critical" },
  };
  const c = config[status];

  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium", c.bg, c.text)}>
      <span className={cn("w-1.5 h-1.5 rounded-full", c.dot)} />
      {label || c.defaultLabel}
    </span>
  );
}
