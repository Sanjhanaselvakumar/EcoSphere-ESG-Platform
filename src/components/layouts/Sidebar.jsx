import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Leaf, Users, Shield, Zap, FileText,
  Settings, Bell, User, LogOut, ChevronLeft, ChevronRight,
  Globe2
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utils/cn'

const navItems = [
  { to: '/dashboard',    label: 'Dashboard',     icon: LayoutDashboard },
  { to: '/environmental',label: 'Environmental',  icon: Leaf },
  { to: '/social',       label: 'Social',         icon: Users },
  { to: '/governance',   label: 'Governance',     icon: Shield },
  { to: '/gamification', label: 'Gamification',   icon: Zap },
  { to: '/reports',      label: 'Reports',        icon: FileText },
]

const bottomItems = [
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/settings',      label: 'Settings',      icon: Settings },
  { to: '/profile',       label: 'Profile',       icon: User },
]

export default function Sidebar({ collapsed, onToggle }) {
  const navigate = useNavigate()

  return (
    <aside className={cn(
      'fixed left-0 top-0 bottom-0 z-30 flex flex-col bg-white border-r border-slate-200 shadow-sm transition-all duration-200',
      collapsed ? 'w-[60px]' : 'w-56'
    )}>
      {/* Logo */}
      <div className={cn('flex items-center gap-3 px-4 py-4 border-b border-slate-200 flex-shrink-0', collapsed && 'justify-center px-3')}>
        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <Globe2 size={16} className="text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.15 }}
              className="overflow-hidden"
            >
              <span className="text-sm font-bold text-slate-900 whitespace-nowrap">EcoSphere</span>
              <p className="text-[10px] text-slate-500 whitespace-nowrap">ESG Platform</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {!collapsed && (
          <p className="px-3 mb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Main Menu</p>
        )}
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => cn(
              'sidebar-item',
              isActive ? 'sidebar-item-active' : 'sidebar-item-inactive',
              collapsed && 'justify-center px-0'
            )}
            title={collapsed ? label : undefined}
          >
            <Icon size={17} className="flex-shrink-0" />
            {!collapsed && <span className="truncate">{label}</span>}
          </NavLink>
        ))}

        {!collapsed && (
          <p className="px-3 mt-4 mb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Account</p>
        )}
        {collapsed && <div className="my-2 border-t border-slate-200" />}
        {bottomItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => cn(
              'sidebar-item',
              isActive ? 'sidebar-item-active' : 'sidebar-item-inactive',
              collapsed && 'justify-center px-0'
            )}
            title={collapsed ? label : undefined}
          >
            <Icon size={17} className="flex-shrink-0" />
            {!collapsed && <span className="truncate">{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div className={cn('border-t border-slate-200 p-3 flex-shrink-0', collapsed && 'flex flex-col items-center gap-2')}>
        {!collapsed && (
          <div className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 cursor-pointer mb-1">
            <div className="w-7 h-7 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-semibold flex-shrink-0">SC</div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-slate-900 truncate">Sarah Chen</p>
              <p className="text-[10px] text-slate-500 truncate">ESG Manager</p>
            </div>
          </div>
        )}
        <button
          onClick={() => navigate('/login')}
          className={cn(
            'flex items-center gap-2 w-full px-3 py-2 rounded-md text-xs font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors',
            collapsed && 'justify-center px-0'
          )}
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut size={15} />
          {!collapsed && 'Logout'}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-16 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm hover:bg-slate-50 transition-colors z-10"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  )
}
