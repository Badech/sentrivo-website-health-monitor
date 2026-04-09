import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppTopbar({ title }: { title: string }) {
  return (
    <header className="h-14 border-b border-border flex items-center justify-between px-6 bg-background shrink-0">
      <h1 className="text-sm font-semibold text-foreground">{title}</h1>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
          <Search size={16} />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground relative">
          <Bell size={16} />
          <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-critical" />
        </Button>
        <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center ml-2">
          <span className="text-xs font-semibold text-primary">A</span>
        </div>
      </div>
    </header>
  );
}
