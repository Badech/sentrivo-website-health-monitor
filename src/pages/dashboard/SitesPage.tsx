import { AppTopbar } from "@/components/app/AppTopbar";
import { StatusPill } from "@/components/app/StatusPill";
import { Globe, ArrowUpRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const sites = [
  { name: "acme-corp.com", health: 87, status: "healthy" as const, issues: 3, lastScan: "32m ago", pages: 142 },
  { name: "shopflow.io", health: 64, status: "warning" as const, issues: 7, lastScan: "1h ago", pages: 89 },
  { name: "greenleaf.co", health: 42, status: "critical" as const, issues: 12, lastScan: "45m ago", pages: 56 },
  { name: "nova-agency.com", health: 93, status: "healthy" as const, issues: 1, lastScan: "2h ago", pages: 34 },
];

export default function SitesPage() {
  return (
    <>
      <AppTopbar title="Sites" />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-foreground">Monitored Sites</h2>
              <p className="text-sm text-muted-foreground">Manage and monitor all your websites</p>
            </div>
            <Button size="sm" className="gap-1.5">
              <Plus size={14} /> Add Site
            </Button>
          </div>

          <div className="grid gap-4">
            {sites.map((site) => (
              <div key={site.name} className="p-5 rounded-xl border border-border bg-card shadow-card hover:shadow-card-hover transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <Globe size={18} className="text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{site.name}</h3>
                      <p className="text-xs text-muted-foreground">{site.pages} pages · Last scan {site.lastScan}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <p className="text-lg font-bold text-foreground">{site.health}</p>
                      <p className="text-[10px] text-muted-foreground">Health Score</p>
                    </div>
                    <StatusPill status={site.status} label={`${site.issues} issues`} />
                    <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
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
