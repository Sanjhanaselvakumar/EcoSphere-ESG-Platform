import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/utils/cn'
import { motion } from 'framer-motion'

const iconColorMap = {
  green:  'bg-green-50 text-green-600',
  emerald:'bg-emerald-50 text-emerald-600',
  blue:   'bg-blue-50 text-blue-600',
  purple: 'bg-purple-50 text-purple-600',
  amber:  'bg-amber-50 text-amber-600',
  red:    'bg-red-50 text-red-600',
  teal:   'bg-teal-50 text-teal-600',
  orange: 'bg-orange-50 text-orange-600',
}

export default function StatCard({ title, value, unit, change, changeType, description, color = 'green', icon: Icon, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-surface rounded-lg border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-200 p-5"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center', iconColorMap[color] || iconColorMap.green)}>
          {Icon && <Icon size={17} />}
        </div>
        {change && (
          <div className={cn(
            'flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full',
            changeType === 'positive' ? 'bg-green-50 text-green-700' :
            changeType === 'negative' ? 'bg-red-50 text-red-700' : 'bg-slate-100 text-slate-600'
          )}>
            {changeType === 'positive' ? <TrendingUp size={11} /> :
             changeType === 'negative' ? <TrendingDown size={11} /> :
             <Minus size={11} />}
            {change}
          </div>
        )}
      </div>
      <div className="space-y-0.5">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-textPrimary">{value}</span>
          {unit && <span className="text-sm text-textSecondary font-medium">{unit}</span>}
        </div>
        <p className="text-xs font-medium text-textSecondary uppercase tracking-wide">{title}</p>
        {description && <p className="text-xs text-slate-400 mt-1">{description}</p>}
      </div>
    </motion.div>
  )
}
