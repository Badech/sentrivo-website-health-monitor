import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/app/AppSidebar";

export function AppLayout() {
  return (
    <div className="flex min-h-screen bg-background w-full">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Outlet />
      </div>
    </div>
  );
}
