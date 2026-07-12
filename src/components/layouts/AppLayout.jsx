import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { cn } from '@/utils/cn'

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
      <div className={cn('flex flex-col min-h-screen transition-all duration-200', collapsed ? 'pl-[60px]' : 'pl-56')}>
        <Navbar sidebarCollapsed={collapsed} />
        <main className="flex-1 pt-14">
          <div className="p-6 max-w-[1400px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
