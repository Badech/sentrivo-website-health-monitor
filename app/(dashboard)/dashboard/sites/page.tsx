import { AppTopbar } from '@/components/app/AppTopbar';
import { StatusPill } from '@/components/app/StatusPill';
import { Globe, ArrowUpRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const sites = [
  { name: 'acme-corp.com', health: 87, status: 'healthy' as const, issues: 3, lastScan: '32m ago', pages: 142 },
  { name: 'shopflow.io', health: 64, status: 'warning' as const, issues: 7, lastScan: '1h ago', pages: 89 },
  { name: 'greenleaf.co', health: 42, status: 'critical' as const, issues: 12, lastScan: '45m ago', pages: 56 },
  { name: 'nova-agency.com', health: 93, status: 'healthy' as const, issues: 1, lastScan: '2h ago', pages: 34 },
];

export default function SitesPage() {
  return (
    <>
      <AppTopbar title="Sites" />
      <main className="flex-1 p-4 md:p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-0 mb-4 md:mb-6">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-foreground">Monitored Sites</h2>
              <p className="text-xs md:text-sm text-muted-foreground">Manage and monitor all your websites</p>
            </div>
            <Button size="sm" className="gap-1.5 self-start md:self-auto">
              <Plus size={14} /> <span className="hidden sm:inline">Add Site</span>
            </Button>
          </div>

          <div className="grid gap-3 md:gap-4">
            {sites.map((site) => (
              <div key={site.name} className="p-4 md:p-5 rounded-xl border border-border bg-card shadow-card hover:shadow-card-hover transition-all">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <Globe size={18} className="text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-foreground truncate">{site.name}</h3>
                      <p className="text-xs text-muted-foreground truncate">{site.pages} pages · Last scan {site.lastScan}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 md:gap-4 shrink-0">
                    <div className="text-right hidden sm:block">
                      <p className="text-base md:text-lg font-bold text-foreground">{site.health}</p>
                      <p className="text-[10px] text-muted-foreground">Health</p>
                    </div>
                    <StatusPill status={site.status} label={`${site.issues}`} className="hidden sm:flex" />
                    <StatusPill status={site.status} className="sm:hidden" />
                    <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                      <ArrowUpRight size={16} />
                    </Link>
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
