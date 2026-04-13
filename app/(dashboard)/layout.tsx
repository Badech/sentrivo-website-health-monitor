import { AppSidebar } from '@/components/app/AppSidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background w-full">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {children}
      </div>
    </div>
  );
}
