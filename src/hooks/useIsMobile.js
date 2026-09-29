import { useState, useEffect } from 'react'

// Returns true when the screen is phone-sized (<= 768px wide by default).
// Desktop keeps returning false, so every desktop style stays exactly as before.
export default function useIsMobile(breakpoint = 768) {
  const query = `(max-width: ${breakpoint}px)`

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = (e) => setIsMobile(e.matches)
    setIsMobile(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return isMobile
}