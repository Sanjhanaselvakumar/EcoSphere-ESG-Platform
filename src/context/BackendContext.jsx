import { createContext, useContext, useEffect, useState } from 'react'
import { checkHealth } from '@/services/api'

const BackendContext = createContext({ online: false, checking: true })

export function BackendProvider({ children }) {
  const [state, setState] = useState({ online: false, checking: true, message: '' })

  useEffect(() => {
    checkHealth().then(({ online, message }) => {
      setState({ online, checking: false, message })
    })
  }, [])

  return <BackendContext.Provider value={state}>{children}</BackendContext.Provider>
}

export const useBackend = () => useContext(BackendContext)
