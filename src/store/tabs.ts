import { lazy } from 'react'
import { create } from 'zustand'
import { LazyLoad } from '@/components'

const Statistics = lazy(() => import('@/pages/statistics'))

interface ITab {
  key: string
  label: string
  path: string
  search?: string
  closable: boolean
  element?: React.ReactNode
}

type State = {
  tabs: ITab[]
  activeTab: string
  needReload: boolean
}
type Action = {
  removeTab: (key: string) => void
  setActiveTab: (key: string) => void
  setTabs: (tabs: ITab[]) => void
  setNeedReload: (needReload: boolean) => void
}

const TABS_KEYS = 'U2_TABS_KEYS'

const initTabs = (): ITab[] => {
  const storeTabs = window.localStorage.getItem(TABS_KEYS)
  return storeTabs
    ? JSON.parse(storeTabs)
    : [
        {
          key: '/',
          path: '/',
          label: '看板',
          closable: false,
          element: LazyLoad(Statistics, 'statistics')
        }
      ]
}
const setTabsStore = (tabs: ITab[]) => {
  const storeTabs = JSON.stringify(
    tabs.map(({ element, ...item }) => ({ ...item }))
  )
  window.localStorage.setItem(TABS_KEYS, storeTabs)
}

const useTabsStore = create<State & Action>((set) => ({
  tabs: initTabs(),
  needReload: false,
  activeTab: '/',
  setActiveTab: (key: string) => set({ activeTab: key }),
  setNeedReload: (needReload: boolean) => set({ needReload }),
  removeTab: (key: string) =>
    set((state) => {
      const nTabs = state.tabs.filter((item) => item.key !== key)
      const index = state.tabs.findIndex((item) => item.key === key)
      if (key === state.activeTab) {
        const nextPath = nTabs[index - 1].key
        state.setActiveTab(nextPath)
      }
      const tabs = state.tabs.filter((item) => item.key !== key)
      setTabsStore(tabs)
      return { tabs }
    }),
  setTabs: (tabs: ITab[]) => {
    setTabsStore(tabs)
    return set({ tabs })
  }
}))

export default useTabsStore
