import { AppTopbar } from '@/components/app/AppTopbar';
import { StatusPill } from '@/components/app/StatusPill';
import { XCircle, AlertTriangle, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const issues = [
  { id: 'ISS-001', severity: 'critical' as const, title: 'Contact form submission returning 500', page: '/contact', category: 'Broken Form', detected: '2h ago', status: 'Open' },
  { id: 'ISS-002', severity: 'critical' as const, title: 'Primary CTA not visible on mobile viewport', page: '/pricing', category: 'CTA Weakness', detected: '4h ago', status: 'Open' },
  { id: 'ISS-003', severity: 'critical' as const, title: 'Calendly embed failing to initialize', page: '/schedule', category: 'Booking Widget', detected: '5h ago', status: 'Open' },
  { id: 'ISS-004', severity: 'warning' as const, title: 'Mobile page load time exceeds 4s threshold', page: '/services', category: 'Mobile UX', detected: '6h ago', status: 'Open' },
  { id: 'ISS-005', severity: 'warning' as const, title: 'GA4 conversion event not firing on form submit', page: '/landing-v2', category: 'Tracking Gap', detected: '12h ago', status: 'Open' },
  { id: 'ISS-006', severity: 'warning' as const, title: 'Click-to-call link returns invalid tel: format', page: '/contact', category: 'Call Button', detected: '1d ago', status: 'In Progress' },
  { id: 'ISS-007', severity: 'warning' as const, title: 'Hero CTA contrast ratio below WCAG AA', page: '/', category: 'CTA Weakness', detected: '1d ago', status: 'Open' },
  { id: 'ISS-008', severity: 'warning' as const, title: 'Image lazy loading not applied to LCP element', page: '/about', category: 'Mobile UX', detected: '2d ago', status: 'Open' },
];

export default function IssuesPage() {
  return (
    <>
      <AppTopbar title="Issues" />
      <main className="flex-1 p-4 md:p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-0 mb-4 md:mb-6">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-foreground">Issues Center</h2>
              <p className="text-xs md:text-sm text-muted-foreground">All detected issues across your monitored sites</p>
            </div>
            <Button variant="outline" size="sm" className="gap-1.5 self-start md:self-auto">
              <Filter size={14} /> Filter
            </Button>
          </div>

          {/* Summary pills */}
          <div className="flex gap-2 md:gap-3 mb-4 md:mb-6 flex-wrap">
            <div className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg border border-border bg-card text-xs md:text-sm">
              <span className="text-muted-foreground">Total: </span>
              <span className="font-semibold text-foreground">8</span>
            </div>
            <div className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg border border-critical/20 bg-critical/5 text-xs md:text-sm">
              <span className="text-critical/70">Critical: </span>
              <span className="font-semibold text-critical">3</span>
            </div>
            <div className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg border border-warning/20 bg-warning/5 text-xs md:text-sm">
              <span className="text-warning/70">Warning: </span>
              <span className="font-semibold text-warning">5</span>
            </div>
          </div>

          {/* Mobile: Card Layout */}
          <div className="md:hidden space-y-3">
            {issues.map((issue) => (
              <div key={issue.id} className="p-4 rounded-xl border border-border bg-card shadow-card">
                <div className="flex items-start gap-3 mb-3">
                  {issue.severity === 'critical' ? (
                    <XCircle size={16} className="text-critical shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle size={16} className="text-warning shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-foreground mb-1 leading-snug">{issue.title}</h3>
                    <p className="text-xs text-muted-foreground font-mono">{issue.page}</p>
                  </div>
                  <StatusPill status={issue.severity} />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground pl-7">
                  <span>{issue.category}</span>
                  <span>{issue.detected}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Table Layout */}
          <div className="hidden md:block rounded-xl border border-border bg-card shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Issue</th>
                    <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Page</th>
                    <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Category</th>
                    <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Severity</th>
                    <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Detected</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {issues.map((issue) => (
                    <tr key={issue.id} className="hover:bg-muted/20 transition-colors cursor-pointer">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          {issue.severity === 'critical' ? <XCircle size={14} className="text-critical shrink-0" /> : <AlertTriangle size={14} className="text-warning shrink-0" />}
                          <p className="text-sm text-foreground font-medium">{issue.title}</p>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-xs font-mono text-muted-foreground">{issue.page}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-xs text-muted-foreground">{issue.category}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <StatusPill status={issue.severity} />
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-xs text-muted-foreground">{issue.detected}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
