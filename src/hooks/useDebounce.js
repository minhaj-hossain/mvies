import { useEffect, useState } from 'react'

/** Debounce a fast-changing value (e.g. search input) to limit API calls. */
export default function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])

  return debounced
}
