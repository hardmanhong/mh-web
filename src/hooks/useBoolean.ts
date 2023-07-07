import { useCallback, useState } from 'react'

function useBoolean(
  initialValue?: boolean
): [boolean, (value?: boolean) => void] {
  const [state, setState] = useState<boolean>(initialValue || false)

  const toggle = useCallback((nextValue?: boolean): void => {
    if (typeof nextValue === 'boolean') {
      setState(nextValue)
    } else {
      setState((s) => !s)
    }
  }, [])
  return [state, toggle]
}

export default useBoolean
