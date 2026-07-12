import Card, { CardHeader, CardTitle, CardDescription } from './Card'
import { cn } from '@/utils/cn'

export default function ChartWrapper({ title, description, actions, children, className, height = 280 }) {
  return (
    <Card className={cn('', className)} padding={false}>
      <div className="px-5 pt-5 pb-4 border-b border-slate-200">
        <CardHeader actions={actions} className="mb-0">
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      </div>
      <div className="p-5" style={{ height }}>
        {children}
      </div>
    </Card>
  )
}
