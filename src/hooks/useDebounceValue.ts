import { useEffect, useRef, useState } from 'react'

function useDebounceValue<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  const timer = useRef<NodeJS.Timeout | null>(null)
  useEffect(() => {
    timer.current = setTimeout(() => setDebouncedValue(value), delay)

    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounceValue
