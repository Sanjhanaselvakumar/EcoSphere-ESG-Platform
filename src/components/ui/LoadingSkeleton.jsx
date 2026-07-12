import { cn } from '@/utils/cn'

export function Skeleton({ className }) {
  return (
    <div className={cn('animate-pulse bg-slate-100 rounded-md', className)} />
  )
}

export function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5 space-y-3">
      <div className="flex items-start justify-between">
        <Skeleton className="w-9 h-9 rounded-lg" />
        <Skeleton className="w-14 h-5 rounded-full" />
      </div>
      <Skeleton className="w-20 h-7" />
      <Skeleton className="w-28 h-3" />
    </div>
  )
}

export function TableSkeleton({ rows = 5, cols = 4 }) {
  return (
    <div className="space-y-0 rounded-lg border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 px-4 py-3 flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-3 flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="px-4 py-3 border-t border-slate-200 flex gap-4 bg-white">
          {Array.from({ length: cols }).map((_, j) => (
            <Skeleton key={j} className="h-3 flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
}

export function ChartSkeleton({ height = 280 }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5">
      <Skeleton className="w-32 h-4 mb-2" />
      <Skeleton className="w-48 h-3 mb-5" />
      <Skeleton className={`w-full rounded-lg`} style={{ height }} />
    </div>
  )
}
