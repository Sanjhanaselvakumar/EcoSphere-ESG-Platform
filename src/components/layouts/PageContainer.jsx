import { cn } from '@/utils/cn'
import Breadcrumb from '@/components/ui/Breadcrumb'

export default function PageContainer({ title, description, breadcrumbs, actions, children, className }) {
  return (
    <div className={cn('animate-fade-in', className)}>
      {/* Page Header */}
      <div className="mb-6">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumb items={breadcrumbs} className="mb-2" />
        )}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-slate-900">{title}</h1>
            {description && <p className="text-sm text-slate-500 mt-0.5">{description}</p>}
          </div>
          {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
        </div>
      </div>
      {children}
    </div>
  )
}
