import { ChevronRight, Home } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'

export default function Breadcrumb({ items = [], className }) {
  return (
    <nav className={cn('flex items-center gap-1 text-xs text-textSecondary', className)}>
      <Link to="/dashboard" className="hover:text-primary-600 transition-colors flex items-center gap-1">
        <Home size={12} />
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight size={11} className="text-slate-300" />
          {item.href ? (
            <Link to={item.href} className="hover:text-primary-600 transition-colors">{item.label}</Link>
          ) : (
            <span className={cn(i === items.length - 1 ? 'text-textPrimary font-medium' : '')}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
