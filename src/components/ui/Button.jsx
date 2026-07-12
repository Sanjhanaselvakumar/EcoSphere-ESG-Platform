import { cn } from '@/utils/cn'

const variants = {
  primary:   'bg-primary-600 hover:bg-primary-700 text-white shadow-sm',
  secondary: 'bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 shadow-sm',
  ghost:     'hover:bg-slate-100 text-slate-500',
  danger:    'bg-red-600 hover:bg-red-700 text-white shadow-sm',
  outline:   'border border-primary-300 text-primary-700 hover:bg-primary-50',
}

const sizes = {
  sm:  'px-3 py-1.5 text-xs rounded-md gap-1.5',
  md:  'px-4 py-2 text-sm rounded-md gap-2',
  lg:  'px-5 py-2.5 text-sm rounded-lg gap-2',
  icon: 'p-2 rounded-md',
}

export default function Button({
  children, variant = 'secondary', size = 'md',
  className, disabled, onClick, type = 'button', ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'inline-flex items-center font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary-200 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant] || variants.secondary,
        sizes[size] || sizes.md,
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
