import { cn } from '@/utils/cn'

const sizeMap = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-7 h-7 text-xs',
  md: 'w-9 h-9 text-sm',
  lg: 'w-11 h-11 text-base',
  xl: 'w-14 h-14 text-lg',
}

const colorMap = [
  'bg-green-100 text-green-700',
  'bg-blue-100 text-blue-700',
  'bg-purple-100 text-purple-700',
  'bg-orange-100 text-orange-700',
  'bg-teal-100 text-teal-700',
  'bg-rose-100 text-rose-700',
  'bg-amber-100 text-amber-700',
  'bg-indigo-100 text-indigo-700',
]

function getColor(initials = '') {
  const idx = (initials.charCodeAt(0) || 0) % colorMap.length
  return colorMap[idx]
}

export default function Avatar({ initials, size = 'md', className, src }) {
  if (src) {
    return (
      <img src={src} alt={initials} className={cn('rounded-full object-cover', sizeMap[size] || sizeMap.md, className)} />
    )
  }
  return (
    <div className={cn(
      'rounded-full flex items-center justify-center font-semibold flex-shrink-0',
      sizeMap[size] || sizeMap.md,
      getColor(initials),
      className
    )}>
      {initials?.slice(0, 2).toUpperCase()}
    </div>
  )
}
