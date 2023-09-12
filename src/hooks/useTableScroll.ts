import { useCallback, useEffect, useRef, useState } from 'react'

type TUseTableScroll = (loading: boolean) => [number | string, () => void]
const useTableScroll: TUseTableScroll = (loading) => {
  // const { pathname, search } = useLocation()
  // const activeTab = useTabsStore((state) => state.activeTab)
  // const activeTab = pathname + search
  const activeTab = undefined
  const [height, setHeight] = useState<string | number>(500)
  const timer = useRef<ReturnType<typeof window.setTimeout>>()
  const computedHeight = useCallback(() => {
    timer.current = setTimeout(() => {
      if (!activeTab) return
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
  }, [activeTab])
  useEffect(() => {
    computedHeight()
    return () => {
      clearTimeout(timer.current)
    }
  }, [loading])
  return [height, computedHeight]
}

export default useTableScroll
