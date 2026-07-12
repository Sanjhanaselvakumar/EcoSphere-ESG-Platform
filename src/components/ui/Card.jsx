import { cn } from '@/utils/cn'

export default function Card({ children, className, hover = false, padding = true, onClick }) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-surface rounded-lg border border-slate-200 shadow-card',
        hover && 'hover:shadow-card-hover transition-shadow duration-200 cursor-pointer',
        padding && 'p-5',
        className
      )}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className, actions }) {
  return (
    <div className={cn('flex items-center justify-between mb-4', className)}>
      <div>{children}</div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}

export function CardTitle({ children, className }) {
  return <h3 className={cn('text-sm font-semibold text-textPrimary', className)}>{children}</h3>
}

export function CardDescription({ children, className }) {
  return <p className={cn('text-xs text-textSecondary mt-0.5', className)}>{children}</p>
}
