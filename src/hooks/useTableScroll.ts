import { useCallback, useEffect, useRef, useState } from 'react'
import { useTabsStore } from '@/store'

type TusePaginatedScroll = () => [number | string, () => void]
const usePaginatedScroll: TusePaginatedScroll = () => {
  const activeTab = useTabsStore((state) => state.activeTab)
  const [height, setHeight] = useState<string | number>(0)
  const timer = useRef<ReturnType<typeof window.setTimeout>>()
  const computedHeight = useCallback(() => {
    timer.current = setTimeout(() => {
      const tableThead = document.querySelector(
        `[id='${activeTab}'] .ant-table-header`
      )
      const { bottom } = tableThead?.getBoundingClientRect() || { bottom: 0 }
      const pagination = document.querySelector(
        `[id='${activeTab}'] .c-page-pagination`
      ) as HTMLElement
      const paginationHeight = pagination?.offsetHeight || 0
      const scrollHeight = `calc(100vh - ${bottom + paginationHeight + 16}px)`
      setHeight(scrollHeight)
    })
  }, [])
  useEffect(() => {
    computedHeight()
    return () => {
      clearTimeout(timer.current)
    }
  }, [])
  return [height, computedHeight]
}

export default usePaginatedScroll
