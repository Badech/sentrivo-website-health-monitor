import { AppTopbar } from "@/components/app/AppTopbar";
import { FileText, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const reports = [
  { name: "Weekly Summary — Apr 7–13", date: "Apr 13, 2026", type: "Weekly", pages: 142, issues: 8 },
  { name: "Weekly Summary — Mar 31–Apr 6", date: "Apr 6, 2026", type: "Weekly", pages: 140, issues: 5 },
  { name: "Monthly Overview — March 2026", date: "Apr 1, 2026", type: "Monthly", pages: 138, issues: 23 },
  { name: "Weekly Summary — Mar 24–30", date: "Mar 30, 2026", type: "Weekly", pages: 136, issues: 6 },
];

export default function ReportsPage() {
  return (
    <>
      <AppTopbar title="Reports" />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-foreground">Reports</h2>
              <p className="text-sm text-muted-foreground">Weekly and monthly conversion health reports</p>
            </div>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Calendar size={14} /> Schedule
            </Button>
          </div>

          <div className="space-y-3">
            {reports.map((report) => (
              <div key={report.name} className="flex items-center justify-between p-5 rounded-xl border border-border bg-card shadow-card hover:shadow-card-hover transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText size={18} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{report.name}</h3>
                    <p className="text-xs text-muted-foreground">{report.date} · {report.pages} pages · {report.issues} issues found</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-medium hidden sm:block">{report.type}</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <Download size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
