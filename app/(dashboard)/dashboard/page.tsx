import { AppTopbar } from '@/components/app/AppTopbar';
import { AlertTriangle, XCircle, CheckCircle2, ArrowUpRight, TrendingDown, Bell, Activity } from 'lucide-react';
import { StatusPill } from '@/components/app/StatusPill';
import { getDashboardData, getCurrentWorkspace, getAllSites } from '@/lib/data';

// Force dynamic rendering - this page requires database access
export const dynamic = 'force-dynamic';

export default async function DashboardOverview() {
  // Get current workspace and first site for demo
  const workspace = await getCurrentWorkspace();
  const sites = await getAllSites(workspace.id);
  
  // Use first site for dashboard, or show empty state
  const firstSite = sites[0];
  
  // If no sites exist, show empty state
  if (!firstSite) {
    return (
      <>
        <AppTopbar title="Dashboard" showSiteContext />
        <main className="flex-1 p-4 md:p-6 overflow-auto bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-2">No sites yet</h2>
              <p className="text-muted-foreground mb-4">Add your first site to start monitoring</p>
              <a href="/dashboard/sites" className="text-primary hover:underline">Go to Sites →</a>
            </div>
          </div>
        </main>
      </>
    );
  }

  // Get real dashboard data from database
  const dashboardData = await getDashboardData(firstSite.id);
  
  const healthScore = dashboardData.site.healthScore || 0;
  const leadRiskScore = dashboardData.site.leadRiskScore || 0;
  const lastScanAt = dashboardData.site.lastScanAt;
  const issueCounts = dashboardData.issueCounts;
  const recentIssues = dashboardData.recentIssues.map(issue => ({
    id: issue.id,
    title: issue.title,
    severity: issue.severity.toLowerCase(),
    page: issue.page,
    time: getRelativeTime(issue.firstSeenAt),
    impact: issue.impactSummary || '',
  }));

  // Format time relative to now
  function getRelativeTime(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }

  return (
    <>
      <AppTopbar title="Dashboard" showSiteContext />
      <main className="flex-1 p-4 md:p-6 overflow-auto bg-muted/30">
        <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
          {/* Action Needed Banner */}
          {issueCounts.critical > 0 && (
            <div className="p-4 md:p-5 rounded-xl border border-critical/30 bg-critical/5 shadow-card">
              <div className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5">
                  <div className="w-8 h-8 rounded-lg bg-critical/10 flex items-center justify-center">
                    <AlertTriangle size={16} className="text-critical" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground mb-1">
                    {issueCounts.critical} critical issue{issueCounts.critical > 1 ? 's' : ''} require immediate attention
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    These issues are actively blocking conversions and should be fixed today to prevent lead loss.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <a href="/dashboard/issues" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-critical text-critical-foreground text-xs font-medium hover:bg-critical/90 transition-colors">
                      View Critical Issues
                      <ArrowUpRight size={12} />
                    </a>
                    <a href="mailto:?subject=Critical%20Issues%20Alert&body=View%20details%20in%20dashboard" className="px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-medium text-foreground hover:bg-muted transition-colors">
                      Email Summary to Team
                    </a>
                  </div>
                </div>
                <button className="shrink-0 text-muted-foreground hover:text-foreground transition-colors">
                  <XCircle size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Score cards row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {/* Health Score */}
            <div className="p-4 md:p-6 rounded-xl border border-border bg-card shadow-card">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xs md:text-sm font-semibold text-muted-foreground">Website Health</h3>
                  <p className="text-[10px] md:text-xs text-muted-foreground/80 mt-0.5">Overall score</p>
                </div>
                <div className="p-2 rounded-lg bg-success/10">
                  <Activity size={14} className="text-success" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-extrabold text-success">{healthScore}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Last scan: {lastScanAt ? new Date(lastScanAt).toLocaleDateString() : 'Never'}
                </p>
              </div>
            </div>

            {/* Lead Risk */}
            <div className="p-4 md:p-6 rounded-xl border border-border bg-card shadow-card">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xs md:text-sm font-semibold text-muted-foreground">Lead Risk</h3>
                  <p className="text-[10px] md:text-xs text-muted-foreground/80 mt-0.5">Conversion blockers</p>
                </div>
                <div className="p-2 rounded-lg bg-warning/10">
                  <TrendingDown size={14} className="text-warning" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-extrabold text-warning">{leadRiskScore}%</div>
                <p className="text-xs text-muted-foreground mt-1">{issueCounts.critical} critical issues</p>
              </div>
            </div>

            {/* Active Monitoring */}
            <div className="p-4 md:p-6 rounded-xl border border-border bg-card shadow-card">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xs md:text-sm font-semibold text-muted-foreground">Active Monitoring</h3>
                  <p className="text-[10px] md:text-xs text-muted-foreground/80 mt-0.5">Real-time alerts</p>
                </div>
                <div className="p-2 rounded-lg bg-primary/10">
                  <Bell size={14} className="text-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-extrabold text-foreground">24/7</div>
                <p className="text-xs text-muted-foreground mt-1">All systems active</p>
              </div>
            </div>
          </div>

          {/* Grid: Weekly Trend + Issue Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Weekly Trend */}
            <div className="p-4 md:p-6 rounded-xl border border-border bg-card shadow-card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xs md:text-sm font-semibold text-foreground">Weekly Issue Trend</h3>
                  <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5">
                    Recent monitoring activity
                  </p>
                </div>
              </div>
              <div className="h-32 flex items-end gap-2">
                {dashboardData.weeklyTrend.length > 0 ? (
                  dashboardData.weeklyTrend.map((day, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full bg-muted rounded-t" style={{ height: `${(day.total / 20) * 100}%` }}>
                        <div className="w-full bg-critical rounded-t" style={{ height: `${(day.critical / day.total) * 100}%` }} />
                      </div>
                      <span className="text-[10px] text-muted-foreground">{day.day.slice(0, 3)}</span>
                    </div>
                  ))
                ) : (
                  <div className="flex-1 flex items-center justify-center text-xs text-muted-foreground">
                    No trend data yet
                  </div>
                )}
              </div>
            </div>

            {/* Issue Distribution */}
            <div className="p-4 md:p-6 rounded-xl border border-border bg-card shadow-card">
              <h3 className="text-xs md:text-sm font-semibold text-foreground mb-4">Issue Distribution</h3>
              <div className="space-y-3">
                <SeverityBar label="Critical" count={issueCounts.critical} total={issueCounts.total} color="bg-critical" priority="High Priority" />
                <SeverityBar label="Warning" count={issueCounts.warning} total={issueCounts.total} color="bg-warning" />
                <SeverityBar label="Healthy" count={issueCounts.total - issueCounts.critical - issueCounts.warning} total={issueCounts.total} color="bg-success" />
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
              {recentIssues.length > 0 ? (
                recentIssues.map((issue) => (
                  <div key={issue.id} className="group hover:bg-muted/30 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between px-6 py-3.5">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        {issue.severity === 'critical' && <XCircle size={15} className="text-critical shrink-0" />}
                        {issue.severity === 'warning' && <AlertTriangle size={15} className="text-warning shrink-0" />}
                        {issue.severity === 'healthy' && <CheckCircle2 size={15} className="text-success shrink-0" />}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-foreground truncate">{issue.title}</span>
                          </div>
                          {issue.severity === 'critical' && issue.impact && (
                            <p className="text-xs text-muted-foreground mt-0.5 hidden group-hover:block">
                              {issue.impact}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 shrink-0 ml-4">
                        <span className="text-xs font-mono text-muted-foreground hidden sm:block">{issue.page}</span>
                        <StatusPill status={issue.severity as 'critical' | 'warning' | 'healthy'} />
                        <span className="text-xs text-muted-foreground hidden md:block">{issue.time}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-6 py-8 text-center text-sm text-muted-foreground">
                  No issues detected yet
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function SeverityBar({ label, count, total, color, priority }: { label: string; count: number; total: number; color: string; priority?: string }) {
  const percentage = total > 0 ? (count / total) * 100 : 0;
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-foreground font-medium">{label}</span>
          {priority && <span className="text-[10px] text-muted-foreground">• {priority}</span>}
        </div>
        <span className="text-muted-foreground font-mono">{count}</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div className={`h-full ${color} transition-all duration-500`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
