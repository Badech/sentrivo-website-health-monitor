import { AppTopbar } from '@/components/app/AppTopbar';
import { FileText, Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const reports = [
  { id: 'RPT-2024-01', title: 'January 2024 Health Report', site: 'acme-corp.com', generated: '2024-01-31', type: 'Monthly Summary', size: '2.4 MB' },
  { id: 'RPT-2023-12', title: 'December 2023 Health Report', site: 'acme-corp.com', generated: '2023-12-31', type: 'Monthly Summary', size: '2.1 MB' },
  { id: 'RPT-2023-11', title: 'November 2023 Health Report', site: 'acme-corp.com', generated: '2023-11-30', type: 'Monthly Summary', size: '1.9 MB' },
  { id: 'RPT-CUSTOM-01', title: 'Q4 2023 Executive Summary', site: 'All Sites', generated: '2024-01-05', type: 'Custom Report', size: '4.8 MB' },
];

export default function ReportsPage() {
  return (
    <>
      <AppTopbar title="Reports" />
      <main className="flex-1 p-4 md:p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-0 mb-4 md:mb-6">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-foreground">Reports</h2>
              <p className="text-xs md:text-sm text-muted-foreground">Download and view historical performance reports</p>
            </div>
            <Button size="sm" className="gap-1.5 self-start md:self-auto">
              <Calendar size={14} /> <span className="hidden sm:inline">Generate Report</span>
            </Button>
          </div>

          <div className="grid gap-3 md:gap-4">
            {reports.map((report) => (
              <div key={report.id} className="p-4 md:p-5 rounded-xl border border-border bg-card shadow-card hover:shadow-card-hover transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <FileText size={18} className="text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-foreground mb-0.5">{report.title}</h3>
                      <p className="text-xs text-muted-foreground truncate">{report.site} · {report.type} · Generated {report.generated}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 ml-12 sm:ml-0">
                    <span className="text-xs text-muted-foreground hidden sm:block">{report.size}</span>
                    <Button variant="outline" size="sm" className="gap-1.5">
                      <Download size={14} /> <span className="hidden sm:inline">Download</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
