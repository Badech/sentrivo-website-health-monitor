import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6">
      {/* Score cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 rounded-xl border border-border bg-card">
            <Skeleton className="h-4 w-32 mb-4" />
            <div className="flex items-center gap-6">
              <Skeleton className="w-24 h-24 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="p-6 rounded-xl border border-border bg-card">
          <Skeleton className="h-4 w-40 mb-4" />
          <Skeleton className="h-32 w-full" />
        </div>
        <div className="p-6 rounded-xl border border-border bg-card">
          <Skeleton className="h-4 w-40 mb-4" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
      </div>

      {/* Issues list */}
      <div className="rounded-xl border border-border bg-card">
        <div className="px-6 py-4 border-b border-border">
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="divide-y divide-border">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="px-6 py-4 flex items-center gap-4">
              <Skeleton className="w-4 h-4 rounded" />
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function IssuesListSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="p-4 md:p-6 rounded-xl border border-border bg-card">
          <div className="flex items-start gap-3">
            <Skeleton className="w-5 h-5 rounded shrink-0 mt-1" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-8 w-full rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SitesListSkeleton() {
  return (
    <div className="grid gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="p-5 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-64" />
            </div>
            <Skeleton className="w-20 h-8 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
