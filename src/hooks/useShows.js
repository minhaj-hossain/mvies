import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchAllShows, searchShows } from '../services/tvmazeApi.js'
import useDebounce from './useDebounce.js'

/**
 * Central state for the Movie Listing page.
 * - Empty query  -> GET /shows?page=:page (paginated, "Load More")
 * - Query present -> GET /search/shows?q=:query (single result set)
 */
export default function useShows() {
  const [shows, setShows] = useState([])
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState(null)

  const debouncedQuery = useDebounce(query, 500)
  const abortRef = useRef(null)

  const load = useCallback(
    async ({ reset = false, pageToLoad = 0, searchTerm = '' } = {}) => {
      // Cancel in-flight request when user keeps typing
      if (abortRef.current) abortRef.current.abort()
      const controller = new AbortController()
      abortRef.current = controller

      const isSearch = searchTerm.trim().length > 0
      if (reset) {
        setLoading(true)
      } else {
        setLoadingMore(true)
      }
      setError(null)

      try {
        if (isSearch) {
          const results = await searchShows(searchTerm, {
            signal: controller.signal,
          })
          setShows(results)
          setHasMore(false)
        } else {
          const results = await fetchAllShows(pageToLoad, {
            signal: controller.signal,
          })
          setShows((prev) => (reset ? results : [...prev, ...results]))
          setHasMore(results.length >= 240) // TVMaze pages hold ~250 items
          setPage(pageToLoad)
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Failed to load shows. Please check your connection and retry.')
        }
      } finally {
        setLoading(false)
        setLoadingMore(false)
      }
    },
    [],
  )

  // Refetch whenever debounced search term changes
  useEffect(() => {
    load({ reset: true, pageToLoad: 0, searchTerm: debouncedQuery })
  }, [debouncedQuery, load])

  const loadMore = useCallback(() => {
    if (loadingMore || loading || !hasMore) return
    load({ reset: false, pageToLoad: page + 1, searchTerm: '' })
  }, [loadingMore, loading, hasMore, load, page])

  const retry = useCallback(() => {
    load({ reset: true, pageToLoad: 0, searchTerm: debouncedQuery })
  }, [load, debouncedQuery])

  const isSearching = debouncedQuery.trim().length > 0

  return {
    shows,
    query,
    setQuery,
    loading,
    loadingMore,
    error,
    hasMore,
    isSearching,
    loadMore,
    retry,
  }
}
