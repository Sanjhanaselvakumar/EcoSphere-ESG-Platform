import { Search, X } from 'lucide-react'
import { cn } from '@/utils/cn'

export default function SearchBar({ value, onChange, placeholder = 'Search...', className }) {
  return (
    <div className={cn('relative flex-1', className)}>
      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="input pl-9 pr-8 h-9 text-sm"
      />
      {value && (
        <button onClick={() => onChange('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary hover:text-textPrimary">
          <X size={13} />
        </button>
      )}
    </div>
  )
}
