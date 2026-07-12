import { cn } from '@/utils/cn'

const variants = {
  green:  'bg-green-50 text-green-700 border-green-100',
  red:    'bg-red-50 text-red-700 border-red-100',
  yellow: 'bg-amber-50 text-amber-700 border-amber-100',
  blue:   'bg-blue-50 text-blue-700 border-blue-100',
  purple: 'bg-purple-50 text-purple-700 border-purple-100',
  gray:   'bg-slate-100 text-slate-600 border-slate-200',
  orange: 'bg-orange-50 text-orange-700 border-orange-100',
  teal:   'bg-teal-50 text-teal-700 border-teal-100',
}

export default function Badge({ children, variant = 'gray', className, dot = false }) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border',
      variants[variant] || variants.gray,
      className
    )}>
      {dot && (
        <span className={cn(
          'w-1.5 h-1.5 rounded-full',
          variant === 'green' ? 'bg-green-500' :
          variant === 'red' ? 'bg-red-500' :
          variant === 'yellow' ? 'bg-amber-500' :
          variant === 'blue' ? 'bg-blue-500' : 'bg-slate-400'
        )} />
      )}
      {children}
    </span>
  )
}
