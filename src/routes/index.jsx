import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from '@/components/layouts/AppLayout'
import { Skeleton } from '@/components/ui/LoadingSkeleton'

// Lazy-loaded pages
const Login        = lazy(() => import('@/pages/Login'))
const Dashboard    = lazy(() => import('@/pages/Dashboard'))
const Environmental = lazy(() => import('@/pages/Environmental'))
const Social       = lazy(() => import('@/pages/Social'))
const Governance   = lazy(() => import('@/pages/Governance'))
const Gamification = lazy(() => import('@/pages/Gamification'))
const Reports      = lazy(() => import('@/pages/Reports'))
const Notifications = lazy(() => import('@/pages/Notifications'))
const Profile      = lazy(() => import('@/pages/Profile'))
const Settings     = lazy(() => import('@/pages/Settings'))

function PageLoader() {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-8 w-48" />
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-lg" />)}
      </div>
      <Skeleton className="h-64 rounded-lg" />
    </div>
  )
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard"     element={<Dashboard />} />
          <Route path="environmental" element={<Environmental />} />
          <Route path="social"        element={<Social />} />
          <Route path="governance"    element={<Governance />} />
          <Route path="gamification"  element={<Gamification />} />
          <Route path="reports"       element={<Reports />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile"       element={<Profile />} />
          <Route path="settings"      element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  )
}
