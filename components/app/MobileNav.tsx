"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Globe,
  ScanSearch,
  AlertTriangle,
  FileText,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Globe, label: "Sites", path: "/dashboard/sites" },
  { icon: ScanSearch, label: "Scan History", path: "/dashboard/scans" },
  { icon: AlertTriangle, label: "Issues", path: "/dashboard/issues" },
  { icon: FileText, label: "Reports", path: "/dashboard/reports" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] p-0">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center px-4 border-b border-border">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary-foreground"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5Z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="ml-2.5 text-sm font-bold text-foreground">Sentrivo</span>
          </div>

          {/* Site selector */}
          <div className="mx-3 mt-4 mb-2 p-2.5 rounded-lg bg-muted border border-border">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium mb-1">
              Current Site
            </p>
            <p className="text-sm font-medium text-foreground truncate">
              acme-corp.com
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-3 space-y-0.5">
            {navItems.map((item) => {
              const active = pathname === item.path;
              return (
                <SheetTrigger asChild key={item.path}>
                  <Link
                    href={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors w-full",
                      active
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-foreground/70 hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <item.icon size={18} className="shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                </SheetTrigger>
              );
            })}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
