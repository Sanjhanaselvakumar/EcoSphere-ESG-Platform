import { BackendProvider } from '@/context/BackendContext'
import AppRoutes from './routes'

export default function App() {
  return (
    <BackendProvider>
      <AppRoutes />
    </BackendProvider>
  )
}
