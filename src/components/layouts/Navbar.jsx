import { Bell, Search, Sun, Moon, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Avatar from '@/components/ui/Avatar'
import { notifications } from '@/data/notificationsData'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utils/cn'

export default function Navbar({ sidebarCollapsed }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const navigate = useNavigate()

  const unread = notifications.filter(n => !n.read).length

  return (
    <header className={cn(
      'fixed top-0 right-0 z-20 bg-white border-b border-slate-200 flex items-center gap-3 px-5 h-14 transition-all duration-200',
      sidebarCollapsed ? 'left-[60px]' : 'left-56'
    )}>
      {/* Search */}
      <div className="flex-1 max-w-sm">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            placeholder="Search anything..."
            className="w-full h-8 pl-9 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-1 ml-auto">
        {/* Dark mode toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-md hover:bg-slate-100 text-slate-500 transition-colors"
        >
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen(!notifOpen); setUserOpen(false) }}
            className="p-2 rounded-md hover:bg-slate-100 text-slate-500 transition-colors relative"
          >
            <Bell size={16} />
            {unread > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-1 w-80 bg-white border border-slate-200 rounded-xl shadow-2xl z-50"
              >
                <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-900">Notifications</span>
                  <span className="text-xs text-primary-600 cursor-pointer hover:underline">Mark all read</span>
                </div>
                <div className="divide-y divide-border max-h-80 overflow-y-auto">
                  {notifications.slice(0, 5).map(n => (
                    <div key={n.id} className={cn('px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer', !n.read && 'bg-primary-50/40')}>
                      <div className="flex items-start gap-2.5">
                        <div className={cn('w-2 h-2 rounded-full mt-1.5 flex-shrink-0',
                          n.priority === 'high' ? 'bg-red-500' :
                          n.priority === 'medium' ? 'bg-amber-500' : 'bg-green-500'
                        )} />
                        <div>
                          <p className="text-xs font-medium text-slate-900">{n.title}</p>
                          <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{n.message}</p>
                          <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 border-t border-slate-200">
                  <Link to="/notifications" onClick={() => setNotifOpen(false)} className="text-xs text-primary-600 hover:underline font-medium">
                    View all notifications
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Menu */}
        <div className="relative ml-1">
          <button
            onClick={() => { setUserOpen(!userOpen); setNotifOpen(false) }}
            className="flex items-center gap-2 pl-2 pr-1 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <Avatar initials="SC" size="sm" />
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-slate-900 leading-tight">Sarah Chen</p>
              <p className="text-[10px] text-slate-500 leading-tight">ESG Manager</p>
            </div>
            <ChevronDown size={13} className="text-slate-500 ml-0.5" />
          </button>

          <AnimatePresence>
            {userOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 py-1"
              >
                {[
                  { label: 'View Profile', to: '/profile' },
                  { label: 'Settings', to: '/settings' },
                  { label: 'Notifications', to: '/notifications' },
                ].map(item => (
                  <Link key={item.to} to={item.to} onClick={() => setUserOpen(false)}
                    className="block px-4 py-2 text-xs text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="border-t border-slate-200 my-1" />
                <button
                  onClick={() => { setUserOpen(false); navigate('/login') }}
                  className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
