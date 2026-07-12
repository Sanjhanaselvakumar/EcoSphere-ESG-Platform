import { Filter } from 'lucide-react'
import { cn } from '@/utils/cn'

export default function FilterBar({ filters = [], activeFilter, onChange, className }) {
  return (
    <div className={cn('flex items-center gap-1.5 flex-wrap', className)}>
      <span className="flex items-center gap-1.5 text-xs text-slate-500 mr-1">
        <Filter size={12} /> Filter:
      </span>
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={cn(
            'px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150',
            activeFilter === f.value
              ? 'bg-primary-600 text-white'
              : 'bg-white border border-slate-200 text-slate-500 hover:border-primary-300 hover:text-primary-600'
          )}
        >
          {f.label}
          {f.count != null && (
            <span className={cn('ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold',
              activeFilter === f.value ? 'bg-white/20' : 'bg-slate-100'
            )}>
              {f.count}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
