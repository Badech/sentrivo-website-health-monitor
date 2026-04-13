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
      <AppTopbar title="Dashboard" showSiteContext />
      <main className="flex-1 p-4 md:p-6 overflow-auto bg-muted/30">
        <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
          {/* Action Needed Banner */}
          <div className="p-4 md:p-5 rounded-xl border border-critical/30 bg-critical/5 shadow-card">
            <div className="flex items-start gap-3">
              <div className="shrink-0 mt-0.5">
                <div className="w-8 h-8 rounded-lg bg-critical/10 flex items-center justify-center">
                  <AlertTriangle size={16} className="text-critical" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground mb-1">3 critical issues require immediate attention</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  These issues are actively blocking conversions and should be fixed today to prevent lead loss.
                </p>
                <div className="flex flex-wrap gap-2">
                  <a href="/dashboard/issues" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-critical text-critical-foreground text-xs font-medium hover:bg-critical/90 transition-colors">
                    View Critical Issues
                    <ArrowUpRight size={12} />
                  </a>
                  <button className="px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-medium text-foreground hover:bg-muted transition-colors">
                    Email Summary to Team
                  </button>
                </div>
              </div>
              <button className="shrink-0 text-muted-foreground hover:text-foreground transition-colors">
                <XCircle size={16} />
              </button>
            </div>
          </div>

          {/* Score cards row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {/* Health Score */}
            <div className="p-4 md:p-6 rounded-xl border border-border bg-card shadow-card">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <div>
                  <h3 className="text-xs md:text-sm font-semibold text-foreground">Website Health</h3>
                  <p className="text-[10px] md:text-xs text-muted-foreground">vs last week: -5 points</p>
                </div>
                <StatusPill status="healthy" />
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
                <ScoreRing score={87} size={80} />
                <div className="space-y-1.5 md:space-y-2 text-center sm:text-left">
                  <div className="flex items-center gap-2 text-xs md:text-sm">
                    <span className="w-2 h-2 rounded-full bg-success" />
                    <span className="text-muted-foreground">139 checks passed</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs md:text-sm">
                    <span className="w-2 h-2 rounded-full bg-critical" />
                    <span className="text-muted-foreground">3 critical issues</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs md:text-sm">
                    <span className="w-2 h-2 rounded-full bg-warning" />
                    <span className="text-muted-foreground">5 warnings</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Lead Risk */}
            <div className="p-4 md:p-6 rounded-xl border border-warning/20 bg-warning/5 shadow-card">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <div>
                  <h3 className="text-xs md:text-sm font-semibold text-foreground">Lead Risk Score</h3>
                  <p className="text-[10px] md:text-xs text-muted-foreground">Sample calculation</p>
                </div>
                <StatusPill status="warning" label="Medium Risk" />
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
                <ScoreRing score={62} size={80} />
                <div className="space-y-1 md:space-y-1.5 text-center sm:text-left">
                  <p className="text-xs md:text-sm text-muted-foreground">Estimated impact</p>
                  <p className="text-lg md:text-xl font-bold text-foreground">~12 leads/week</p>
                  <p className="text-[10px] md:text-xs text-muted-foreground">potentially affected by issues</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              <QuickStat icon={Globe} label="Pages Monitored" value="142" />
              <QuickStat icon={Clock} label="Last Scan" value="32m ago" />
              <QuickStat icon={TrendingUp} label="Scans This Week" value="47" />
              <QuickStat icon={AlertTriangle} label="Open Issues" value="8" />
            </div>
          </div>

          {/* Charts / Trend + Severity Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
            {/* Weekly Trend */}
            <div className="p-4 md:p-6 rounded-xl border border-border bg-card shadow-card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xs md:text-sm font-semibold text-foreground">Weekly Issue Trend</h3>
                  <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5">
                    Avg: 6.3 issues/day • Trending: ↓12%
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-2 py-1 rounded bg-success/10 border border-success/20">
                    <span className="text-xs font-semibold text-success">↓ Improving</span>
                  </div>
                </div>
              </div>
              <div className="flex items-end gap-2 md:gap-3 h-28 md:h-32">
                {weeklyTrend.map((d) => (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-primary/20 rounded-t transition-all relative"
                      style={{ height: `${(d.issues / 10) * 100}%` }}
                    >
                      <div
                        className="w-full bg-primary rounded-t transition-all"
                        style={{ height: `${Math.min(100, (d.issues / 10) * 80)}%` }}
                      />
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-medium text-foreground">
                        {d.issues}
                      </span>
                    </div>
                    <span className="text-[9px] md:text-[10px] text-muted-foreground mt-1">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Severity Breakdown */}
            <div className="p-4 md:p-6 rounded-xl border border-border bg-card shadow-card">
              <h3 className="text-xs md:text-sm font-semibold text-foreground mb-3 md:mb-4">Issues by Severity</h3>
              <div className="space-y-3 md:space-y-4">
                <SeverityBar label="Critical" count={3} total={8} color="bg-critical" priority="High impact on conversions" />
                <SeverityBar label="Warning" count={5} total={8} color="bg-warning" priority="Medium impact" />
                <SeverityBar label="Passed" count={134} total={142} color="bg-success" priority="All checks healthy" />
              </div>
              <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-border">
                <div className="flex justify-between text-xs md:text-sm">
                  <span className="text-muted-foreground">Total open issues</span>
                  <span className="font-semibold text-foreground">8</span>
                </div>
                <div className="flex justify-between text-xs md:text-sm mt-1.5">
                  <span className="text-muted-foreground">Resolved this week</span>
                  <span className="font-medium text-success">5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Issues */}
          <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Recent Issues</h3>
                <p className="text-xs text-muted-foreground">Prioritized by conversion impact</p>
              </div>
              <a href="/dashboard/issues" className="text-xs text-primary font-medium flex items-center gap-1 hover:underline">
                View all <ArrowUpRight size={12} />
              </a>
            </div>
            <div className="divide-y divide-border">
              {recentIssues.map((issue, i) => (
                <div key={i} className="group hover:bg-muted/30 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between px-6 py-3.5">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {issue.severity === 'critical' && <XCircle size={15} className="text-critical shrink-0" />}
                      {issue.severity === 'warning' && <AlertTriangle size={15} className="text-warning shrink-0" />}
                      {issue.severity === 'healthy' && <CheckCircle2 size={15} className="text-success shrink-0" />}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-foreground truncate">{issue.title}</span>
                          {i < 2 && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase bg-primary/10 text-primary shrink-0">
                              New
                            </span>
                          )}
                        </div>
                        {issue.severity === 'critical' && (
                          <p className="text-xs text-muted-foreground mt-0.5 hidden group-hover:block">
                            {i === 0 && "All contact form submissions are failing. Estimated impact: 15-20 leads/week"}
                            {i === 1 && "Primary CTA not visible to 64% of mobile visitors"}
                            {i === 2 && "Booking widget preventing appointment scheduling"}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0 ml-4">
                      <span className="text-xs font-mono text-muted-foreground hidden sm:block">{issue.page}</span>
                      <StatusPill status={issue.severity} />
                      <span className="text-xs text-muted-foreground hidden md:block">{issue.time}</span>
                    </div>
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

function SeverityBar({ label, count, total, color, priority }: { label: string; count: number; total: number; color: string; priority?: string }) {
  return (
    <div>
      <div className="flex justify-between items-start mb-1.5">
        <div className="flex-1">
          <span className="text-xs md:text-sm text-foreground font-medium">{label}</span>
          {priority && <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5">{priority}</p>}
        </div>
        <span className="font-semibold text-foreground text-sm md:text-base">{count}</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${(count / total) * 100}%` }} />
      </div>
    </div>
  );
}
