import { AppTopbar } from "@/components/app/AppTopbar";
import { StatusPill } from "@/components/app/StatusPill";
import { CheckCircle2, Clock } from "lucide-react";

const scans = [
  { id: "SCN-047", time: "Today, 2:14 PM", duration: "3m 22s", pages: 142, issues: 3, status: "critical" as const },
  { id: "SCN-046", time: "Today, 8:00 AM", duration: "3m 18s", pages: 142, issues: 5, status: "warning" as const },
  { id: "SCN-045", time: "Yesterday, 8:00 PM", duration: "3m 25s", pages: 140, issues: 4, status: "warning" as const },
  { id: "SCN-044", time: "Yesterday, 8:00 AM", duration: "3m 12s", pages: 140, issues: 2, status: "healthy" as const },
  { id: "SCN-043", time: "Apr 7, 8:00 PM", duration: "3m 30s", pages: 138, issues: 1, status: "healthy" as const },
  { id: "SCN-042", time: "Apr 7, 8:00 AM", duration: "3m 15s", pages: 138, issues: 6, status: "warning" as const },
];

export default function ScansPage() {
  return (
    <>
      <AppTopbar title="Scan History" />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-foreground">Scan History</h2>
            <p className="text-sm text-muted-foreground">Review past scans and their results</p>
          </div>

          <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Scan ID</th>
                    <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Time</th>
                    <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3 hidden sm:table-cell">Duration</th>
                    <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3 hidden md:table-cell">Pages</th>
                    <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Issues</th>
                    <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {scans.map((scan) => (
                    <tr key={scan.id} className="hover:bg-muted/20 transition-colors cursor-pointer">
                      <td className="px-5 py-3.5">
                        <span className="text-sm font-mono font-medium text-primary">{scan.id}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-sm text-foreground">{scan.time}</span>
                      </td>
                      <td className="px-5 py-3.5 hidden sm:table-cell">
                        <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                          <Clock size={12} /> {scan.duration}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 hidden md:table-cell">
                        <span className="text-sm text-muted-foreground">{scan.pages}</span>
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
