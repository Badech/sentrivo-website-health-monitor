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
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-foreground">Reports</h2>
              <p className="text-sm text-muted-foreground">Download and view historical performance reports</p>
            </div>
            <Button size="sm" className="gap-1.5">
              <Calendar size={14} /> Generate Custom Report
            </Button>
          </div>

          <div className="grid gap-4">
            {reports.map((report) => (
              <div key={report.id} className="p-5 rounded-xl border border-border bg-card shadow-card hover:shadow-card-hover transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText size={18} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{report.title}</h3>
                      <p className="text-xs text-muted-foreground">{report.site} · {report.type} · Generated {report.generated}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-muted-foreground hidden sm:block">{report.size}</span>
                    <Button variant="outline" size="sm" className="gap-1.5">
                      <Download size={14} /> Download
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
