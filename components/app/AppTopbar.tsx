"use client";

import { Bell, Download, Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./MobileNav";

interface AppTopbarProps {
  title: string;
  showSiteContext?: boolean;
}

export function AppTopbar({ title, showSiteContext = false }: AppTopbarProps) {
  return (
    <header className="h-16 border-b border-border bg-background flex items-center justify-between px-4 md:px-6 shrink-0">
      <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
        <MobileNav />
        <div className="min-w-0 flex-1">
          <h1 className="text-base md:text-lg font-semibold text-foreground">{title}</h1>
          {showSiteContext && (
            <div className="hidden md:flex items-center gap-2 mt-0.5">
              <span className="text-xs text-muted-foreground">acme-corp.com</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-success">Last scan: 32m ago</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        <Button variant="ghost" size="sm" className="gap-2 hidden sm:flex text-xs md:text-sm">
          <Calendar size={14} />
          <span className="hidden lg:inline">Last 7 days</span>
          <ChevronDown size={14} className="hidden lg:block" />
        </Button>
        <Button variant="outline" size="sm" className="gap-2 hidden md:flex">
          <Download size={14} />
          <span>Export</span>
        </Button>
        <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
          <Bell size={18} className="text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-critical rounded-full" />
        </button>
      </div>
    </header>
  );
}
