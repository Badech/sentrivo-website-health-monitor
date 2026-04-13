import { AppTopbar } from '@/components/app/AppTopbar';
import { StatusPill } from '@/components/app/StatusPill';
import { XCircle, AlertTriangle, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getIssues, getCurrentWorkspace, getAllSites } from '@/lib/data';
import { IssueList } from '@/components/issues/IssueList';

// Force dynamic rendering - this page requires database access
export const dynamic = 'force-dynamic';

export default async function IssuesPage() {
  // Get real issues from database
  const workspace = await getCurrentWorkspace();
  const sites = await getAllSites(workspace.id);
  const firstSite = sites[0];
  
  const issuesData = firstSite ? await getIssues({ siteId: firstSite.id }) : [];
  
  // Transform to UI format
  const issues = issuesData.map(issue => ({
    id: issue.id,
    title: issue.title,
    severity: issue.severity.toLowerCase() as 'critical' | 'warning',
    category: issue.category,
    page: issue.scanPage?.path || 'N/A',
    device: 'both' as const,
    evidence: issue.evidenceSummary || '',
    impact: issue.impactSummary || '',
    recommendation: issue.recommendation || '',
  }));

  return (
    <>
      <AppTopbar title="Issues" />
      <main className="flex-1 p-4 md:p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-0 mb-4 md:mb-6">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-foreground">All Issues</h2>
              <p className="text-xs md:text-sm text-muted-foreground">
                {issues.length} issues detected across your monitored sites
              </p>
            </div>
            <Button size="sm" variant="outline" className="gap-1.5 self-start md:self-auto">
              <Filter size={14} /> Filter
            </Button>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 md:mb-6">
            <div className="p-3 md:p-4 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 mb-1">
                <XCircle size={14} className="text-critical" />
                <p className="text-xs text-muted-foreground">Critical</p>
              </div>
              <p className="text-xl md:text-2xl font-bold text-foreground">
                {issues.filter(i => i.severity === 'critical').length}
              </p>
            </div>
            <div className="p-3 md:p-4 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle size={14} className="text-warning" />
                <p className="text-xs text-muted-foreground">Warning</p>
              </div>
              <p className="text-xl md:text-2xl font-bold text-foreground">
                {issues.filter(i => i.severity === 'warning').length}
              </p>
            </div>
            <div className="p-3 md:p-4 rounded-xl border border-border bg-card">
              <p className="text-xs text-muted-foreground mb-1">Open</p>
              <p className="text-xl md:text-2xl font-bold text-foreground">{issues.length}</p>
            </div>
            <div className="p-3 md:p-4 rounded-xl border border-border bg-card">
              <p className="text-xs text-muted-foreground mb-1">Resolved</p>
              <p className="text-xl md:text-2xl font-bold text-success">0</p>
            </div>
          </div>

          {/* Issues List */}
          {issues.length > 0 ? (
            <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
              <IssueList issues={issues} />
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-card shadow-card p-12 text-center">
              <p className="text-muted-foreground">No issues detected yet. Run a scan to start monitoring.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
