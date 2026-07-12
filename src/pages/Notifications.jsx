import { useState } from 'react'
import { Bell, CheckCheck, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
import PageContainer from '@/components/layouts/PageContainer'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import FilterBar from '@/components/ui/FilterBar'
import { notifications as initialNotifications } from '@/data/notificationsData'
import { cn } from '@/utils/cn'

const typeIcon = { alert: '🔴', info: '🔵', success: '🟢', warning: '🟡' }
const typeVariant = { alert: 'red', info: 'blue', success: 'green', warning: 'yellow' }

export default function Notifications() {
  const [notifs, setNotifs] = useState(initialNotifications)
  const [filter, setFilter] = useState('all')

  const filtered = notifs.filter(n => {
    if (filter === 'unread') return !n.read
    if (filter === 'read') return n.read
    return true
  })

  const markAllRead = () => setNotifs(n => n.map(x => ({ ...x, read: true })))
  const markRead = (id) => setNotifs(n => n.map(x => x.id === id ? { ...x, read: true } : x))
  const deleteNotif = (id) => setNotifs(n => n.filter(x => x.id !== id))

  const unread = notifs.filter(n => !n.read).length

  return (
    <PageContainer
      title="Notifications"
      description={`${unread} unread notification${unread !== 1 ? 's' : ''}`}
      breadcrumbs={[{ label: 'Notifications' }]}
      actions={
        <Button variant="secondary" size="sm" onClick={markAllRead}>
          <CheckCheck size={13} /> Mark all read
        </Button>
      }
    >
      <div className="mb-4">
        <FilterBar
          activeFilter={filter}
          onChange={setFilter}
          filters={[
            { value: 'all', label: 'All', count: notifs.length },
            { value: 'unread', label: 'Unread', count: unread },
            { value: 'read', label: 'Read' },
          ]}
        />
      </div>

      <div className="space-y-2">
        {filtered.length === 0 ? (
          <Card>
            <div className="flex flex-col items-center justify-center py-12 text-slate-500">
              <Bell size={32} className="mb-3 opacity-40" />
              <p className="text-sm">No notifications</p>
            </div>
          </Card>
        ) : (
          filtered.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              layout
            >
              <Card className={cn('transition-all', !n.read && 'border-l-4 border-l-primary-400 bg-primary-50/20')}>
                <div className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0 mt-0.5">{typeIcon[n.type]}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-semibold text-slate-900">{n.title}</p>
                      <Badge variant={typeVariant[n.type]}>{n.type}</Badge>
                      <Badge variant={n.priority === 'high' ? 'red' : n.priority === 'medium' ? 'yellow' : 'gray'}>
                        {n.priority}
                      </Badge>
                      {!n.read && <span className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0" />}
                    </div>
                    <p className="text-sm text-slate-500">{n.message}</p>
                    <p className="text-xs text-slate-400 mt-1.5">{n.time}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {!n.read && (
                      <Button size="sm" variant="ghost" onClick={() => markRead(n.id)}>
                        <CheckCheck size={13} />
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" onClick={() => deleteNotif(n.id)}>
                      <Trash2 size={13} className="text-red-400" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </PageContainer>
  )
}
