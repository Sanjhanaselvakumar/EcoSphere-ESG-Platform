import { useBackend } from '@/context/BackendContext'
import { Wifi, WifiOff } from 'lucide-react'
import { cn } from '@/utils/cn'

export default function BackendStatus() {
  const { online, checking } = useBackend()

  if (checking) {
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-xs text-slate-500">
        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-pulse" />
        Connecting…
      </div>
    )
  }

  return (
    <div className={cn(
      'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium select-none',
      online ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
    )}>
      {online ? <><Wifi size={11} /> Live</> : <><WifiOff size={11} /> Demo</>}
    </div>
  )
}
