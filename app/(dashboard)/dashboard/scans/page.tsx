import { AppTopbar } from '@/components/app/AppTopbar';
import { StatusPill } from '@/components/app/StatusPill';
import { ScanSearch, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

const scans = [
  { id: 'SCN-4892', site: 'acme-corp.com', time: '32 minutes ago', duration: '2m 14s', pages: 142, issues: 3, status: 'healthy' as const },
  { id: 'SCN-4891', site: 'shopflow.io', time: '1 hour ago', duration: '1m 48s', pages: 89, issues: 7, status: 'warning' as const },
  { id: 'SCN-4890', site: 'greenleaf.co', time: '45 minutes ago', duration: '1m 22s', pages: 56, issues: 12, status: 'critical' as const },
  { id: 'SCN-4889', site: 'nova-agency.com', time: '2 hours ago', duration: '58s', pages: 34, issues: 1, status: 'healthy' as const },
  { id: 'SCN-4888', site: 'acme-corp.com', time: '6 hours ago', duration: '2m 8s', pages: 142, issues: 5, status: 'warning' as const },
  { id: 'SCN-4887', site: 'shopflow.io', time: '7 hours ago', duration: '1m 51s', pages: 89, issues: 8, status: 'warning' as const },
];

export default function ScansPage() {
  return (
    <>
      <AppTopbar title="Scan History" />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-foreground">Scan History</h2>
              <p className="text-sm text-muted-foreground">View all automated scans and their results</p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Scan ID</th>
                    <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Site</th>
                    <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3 hidden md:table-cell">Time</th>
                    <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3 hidden lg:table-cell">Duration</th>
                    <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3 hidden lg:table-cell">Pages</th>
                    <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Issues</th>
                    <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {scans.map((scan) => (
                    <tr key={scan.id} className="hover:bg-muted/20 transition-colors cursor-pointer">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <ScanSearch size={14} className="text-muted-foreground" />
                          <span className="text-sm font-mono text-foreground">{scan.id}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-sm text-foreground font-medium">{scan.site}</span>
                      </td>
                      <td className="px-5 py-3.5 hidden md:table-cell">
                        <span className="text-xs text-muted-foreground">{scan.time}</span>
                      </td>
                      <td className="px-5 py-3.5 hidden lg:table-cell">
                        <span className="text-xs text-muted-foreground">{scan.duration}</span>
                      </td>
                      <td className="px-5 py-3.5 hidden lg:table-cell">
                        <span className="text-xs text-muted-foreground">{scan.pages}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-sm font-medium text-foreground">{scan.issues}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <StatusPill status={scan.status} />
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
