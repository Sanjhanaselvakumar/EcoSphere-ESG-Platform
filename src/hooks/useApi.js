/**
 * useApi — generic data-fetching hook
 * Calls an async apiFn, falls back to staticData if backend is offline.
 *
 * Usage:
 *   const { data, loading, error, isLive, refetch } = useApi(fetchChallenges, staticChallenges)
 */
import { useState, useEffect, useCallback } from 'react'

export function useApi(apiFn, staticData = [], deps = []) {
  const [data, setData]       = useState(staticData)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)
  const [isLive, setIsLive]   = useState(false)   // true = came from backend

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await apiFn()
      // DRF returns paginated { results: [] } or plain arrays
      const list = Array.isArray(result) ? result : (result.results ?? result)
      setData(list)
      setIsLive(true)
    } catch (err) {
      // Backend unavailable — silently fall back to static data
      setData(staticData)
      setIsLive(false)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  useEffect(() => { fetch() }, [fetch])

  return { data, loading, error, isLive, refetch: fetch }
}
