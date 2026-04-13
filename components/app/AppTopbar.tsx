"use client";

import { Bell, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppTopbar({ title }: { title: string }) {
  return (
    <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6 shrink-0">
      <h1 className="text-lg font-semibold text-foreground">{title}</h1>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" className="gap-2">
          <Download size={16} />
          <span className="hidden sm:inline">Export Report</span>
        </Button>
        <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
          <Bell size={18} className="text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-critical rounded-full" />
        </button>
      </div>
    </header>
  );
}
