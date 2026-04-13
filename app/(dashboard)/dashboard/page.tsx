import { AppTopbar } from '@/components/app/AppTopbar';
import { ScoreRing } from '@/components/app/ScoreRing';
import { StatusPill } from '@/components/app/StatusPill';
import { AlertTriangle, CheckCircle2, XCircle, ArrowUpRight, TrendingUp, Clock, Globe } from 'lucide-react';

const recentIssues = [
  { severity: 'critical' as const, title: 'Contact form returns 500 error', page: '/contact', time: '2h ago' },
  { severity: 'critical' as const, title: 'Primary CTA hidden below fold on mobile', page: '/pricing', time: '4h ago' },
  { severity: 'critical' as const, title: 'Booking widget fails to load', page: '/schedule', time: '5h ago' },
  { severity: 'warning' as const, title: 'Page load time 4.2s on mobile', page: '/services', time: '6h ago' },
  { severity: 'warning' as const, title: 'Google Analytics tag misfiring', page: '/landing-v2', time: '12h ago' },
  { severity: 'healthy' as const, title: 'SSL certificate renewed successfully', page: 'Global', time: '1d ago' },
];

const weeklyTrend = [
  { day: 'Mon', issues: 8 },
  { day: 'Tue', issues: 6 },
  { day: 'Wed', issues: 9 },
  { day: 'Thu', issues: 5 },
  { day: 'Fri', issues: 7 },
  { day: 'Sat', issues: 3 },
  { day: 'Sun', issues: 4 },
];

export default function DashboardOverview() {
  return (
    <>
      <AppTopbar title="Dashboard" />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Score cards row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Health Score */}
            <div className="p-6 rounded-xl border border-border bg-card shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground">Website Health</h3>
                <StatusPill status="healthy" />
              </div>
              <div className="flex items-center gap-6">
                <ScoreRing score={87} size={100} />
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 rounded-full bg-success" />
                    <span className="text-muted-foreground">139 checks passed</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 rounded-full bg-critical" />
                    <span className="text-muted-foreground">3 critical issues</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 rounded-full bg-warning" />
                    <span className="text-muted-foreground">5 warnings</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Lead Risk */}
            <div className="p-6 rounded-xl border border-border bg-card shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground">Lead Risk Score</h3>
                <StatusPill status="warning" label="Medium Risk" />
              </div>
              <div className="flex items-center gap-6">
                <ScoreRing score={62} size={100} />
                <div className="space-y-1.5">
                  <p className="text-sm text-muted-foreground">Estimated impact</p>
                  <p className="text-xl font-bold text-foreground">~12 leads/week</p>
                  <p className="text-xs text-muted-foreground">at risk from current issues</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <QuickStat icon={Globe} label="Pages Monitored" value="142" />
              <QuickStat icon={Clock} label="Last Scan" value="32m ago" />
              <QuickStat icon={TrendingUp} label="Scans This Week" value="47" />
              <QuickStat icon={AlertTriangle} label="Open Issues" value="8" />
            </div>
          </div>

          {/* Charts / Trend + Severity Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Weekly Trend */}
            <div className="p-6 rounded-xl border border-border bg-card shadow-card">
              <h3 className="text-sm font-semibold text-foreground mb-4">Weekly Issue Trend</h3>
              <div className="flex items-end gap-3 h-32">
                {weeklyTrend.map((d) => (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-primary/20 rounded-t transition-all"
                      style={{ height: `${(d.issues / 10) * 100}%` }}
                    >
                      <div
                        className="w-full bg-primary rounded-t transition-all"
                        style={{ height: `${Math.min(100, (d.issues / 10) * 80)}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Severity Breakdown */}
            <div className="p-6 rounded-xl border border-border bg-card shadow-card">
              <h3 className="text-sm font-semibold text-foreground mb-4">Issues by Severity</h3>
              <div className="space-y-4">
                <SeverityBar label="Critical" count={3} total={8} color="bg-critical" />
                <SeverityBar label="Warning" count={5} total={8} color="bg-warning" />
                <SeverityBar label="Info" count={12} total={20} color="bg-primary" />
              </div>
              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total open issues</span>
                  <span className="font-semibold text-foreground">8</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Issues */}
          <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Recent Issues</h3>
              <a href="/dashboard/issues" className="text-xs text-primary font-medium flex items-center gap-1 hover:underline">
                View all <ArrowUpRight size={12} />
              </a>
            </div>
            <div className="divide-y divide-border">
              {recentIssues.map((issue, i) => (
                <div key={i} className="flex items-center justify-between px-6 py-3.5 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    {issue.severity === 'critical' && <XCircle size={15} className="text-critical shrink-0" />}
                    {issue.severity === 'warning' && <AlertTriangle size={15} className="text-warning shrink-0" />}
                    {issue.severity === 'healthy' && <CheckCircle2 size={15} className="text-success shrink-0" />}
                    <span className="text-sm text-foreground truncate">{issue.title}</span>
                  </div>
                  <div className="flex items-center gap-4 shrink-0 ml-4">
                    <span className="text-xs font-mono text-muted-foreground hidden sm:block">{issue.page}</span>
                    <StatusPill status={issue.severity} />
                    <span className="text-xs text-muted-foreground hidden md:block">{issue.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function QuickStat({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="p-4 rounded-xl border border-border bg-card shadow-card">
      <Icon size={16} className="text-muted-foreground mb-2" />
      <p className="text-lg font-bold text-foreground">{value}</p>
      <p className="text-[11px] text-muted-foreground">{label}</p>
    </div>
  );
}

function SeverityBar({ label, count, total, color }: { label: string; count: number; total: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium text-foreground">{count}</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${(count / total) * 100}%` }} />
      </div>
    </div>
  );
}
