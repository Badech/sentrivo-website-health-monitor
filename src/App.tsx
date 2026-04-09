import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import { AppLayout } from "./components/app/AppLayout.tsx";
import DashboardOverview from "./pages/dashboard/DashboardOverview.tsx";
import SitesPage from "./pages/dashboard/SitesPage.tsx";
import ScansPage from "./pages/dashboard/ScansPage.tsx";
import IssuesPage from "./pages/dashboard/IssuesPage.tsx";
import ReportsPage from "./pages/dashboard/ReportsPage.tsx";
import SettingsPage from "./pages/dashboard/SettingsPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<AppLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="sites" element={<SitesPage />} />
            <Route path="scans" element={<ScansPage />} />
            <Route path="issues" element={<IssuesPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
