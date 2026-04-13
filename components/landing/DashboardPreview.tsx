"use client";

import { AlertTriangle, CheckCircle2, TrendingUp, Globe, ArrowUpRight, XCircle } from "lucide-react";

export function DashboardPreview() {
  return (
    <div className="bg-surface-dark p-4 lg:p-6 min-h-[400px]">
      {/* Top bar mock */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-critical/60" />
          <div className="w-3 h-3 rounded-full bg-warning/60" />
          <div className="w-3 h-3 rounded-full bg-success/60" />
        </div>
        <div className="flex items-center gap-2 text-xs text-surface-dark-foreground/30 font-mono">
          <Globe size={12} />
          app.sentrivo.com/dashboard
        </div>
        <div />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard label="Website Health" value="87" suffix="/100" color="success" />
        <StatCard label="Lead Risk Score" value="Medium" color="warning" />
        <StatCard label="Critical Issues" value="3" color="critical" />
        <StatCard label="Pages Monitored" value="142" color="primary" />
      </div>

      {/* Issues table mock */}
      <div className="rounded-lg border border-surface-dark-foreground/5 overflow-hidden">
        <div className="bg-surface-dark-foreground/[0.02] px-4 py-2.5 border-b border-surface-dark-foreground/5">
          <span className="text-xs font-semibold text-surface-dark-foreground/50 uppercase tracking-wider">Recent Issues</span>
        </div>
        <div className="divide-y divide-surface-dark-foreground/5">
          <IssueRow severity="critical" title="Contact form submission failing" page="/contact" time="2 hours ago" />
          <IssueRow severity="critical" title="CTA button not visible on mobile" page="/pricing" time="4 hours ago" />
          <IssueRow severity="warning" title="Page load time exceeds 4s" page="/services" time="6 hours ago" />
          <IssueRow severity="warning" title="Tracking pixel not firing" page="/landing-v2" time="12 hours ago" />
          <IssueRow severity="healthy" title="SSL certificate renewed" page="Global" time="1 day ago" />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, suffix, color }: { label: string; value: string; suffix?: string; color: string }) {
  const colorMap: Record<string, string> = {
    success: "text-success",
    warning: "text-warning",
    critical: "text-critical",
    primary: "text-primary",
  };

  return (
    <div className="rounded-lg border border-surface-dark-foreground/5 bg-surface-dark-foreground/[0.02] p-3.5">
      <p className="text-[11px] text-surface-dark-foreground/40 mb-1.5 font-medium">{label}</p>
      <p className={`text-xl font-bold ${colorMap[color]}`}>
        {value}<span className="text-xs font-normal text-surface-dark-foreground/30">{suffix}</span>
      </p>
    </div>
  );
}

function IssueRow({ severity, title, page, time }: { severity: string; title: string; page: string; time: string }) {
  const icons: Record<string, React.ReactNode> = {
    critical: <XCircle size={14} className="text-critical" />,
    warning: <AlertTriangle size={14} className="text-warning" />,
    healthy: <CheckCircle2 size={14} className="text-success" />,
  };

  const badges: Record<string, string> = {
    critical: "bg-critical/10 text-critical",
    warning: "bg-warning/10 text-warning",
    healthy: "bg-success/10 text-success",
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 hover:bg-surface-dark-foreground/[0.02] transition-colors">
      <div className="flex items-center gap-3 min-w-0">
        {icons[severity]}
        <span className="text-sm text-surface-dark-foreground/80 truncate">{title}</span>
      </div>
      <div className="hidden sm:flex items-center gap-4 shrink-0">
        <span className="text-xs font-mono text-surface-dark-foreground/30">{page}</span>
        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${badges[severity]}`}>
          {severity}
        </span>
        <span className="text-xs text-surface-dark-foreground/25">{time}</span>
      </div>
    </div>
  );
}
