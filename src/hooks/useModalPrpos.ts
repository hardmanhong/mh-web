import { useState } from 'react'
import { useBoolean } from '@/hooks'

function useModalPrpos<T>(
  defaultData: T
): [{ open: boolean; data: T }, (data?: T) => void, () => void] {
  const [open, toggle] = useBoolean()
  const [data, setData] = useState<T>(defaultData)
  const onOpen = (value?: T) => {
    if (value) {
      setData(value)
    } else {
      setData(defaultData)
    }
    toggle(true)
  }
  const onClose = () => {
    setData(defaultData)
    toggle(false)
  }
  const props = {
    open,
    data
  }
  return [props, onOpen, onClose]
}

export default useModalPrpos
