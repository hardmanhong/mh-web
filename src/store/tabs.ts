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
  element: React.ReactNode
}

type State = {
  tabs: ITab[]
  activeTab: string
}
type Action = {
  removeTab: (key: string) => void
  setActiveTab: (key: string) => void
  setTabs: (tabs: ITab[]) => void
}

const useTabsStore = create<State & Action>((set) => ({
  tabs: [
    {
      key: '/',
      path: '/',
      label: '看板',
      closable: false,
      element: LazyLoad(Statistics, 'statistics')
    }
  ],
  activeTab: '/',
  setActiveTab: (key: string) => set({ activeTab: key }),
  removeTab: (key: string) =>
    set((state) => {
      const nTabs = state.tabs.filter((item) => item.key !== key)
      const index = state.tabs.findIndex((item) => item.key === key)
      if (key === state.activeTab) {
        const nextPath = nTabs[index - 1].key
        state.setActiveTab(nextPath)
      }
      return { tabs: state.tabs.filter((item) => item.key !== key) }
    }),
  setTabs: (tabs: ITab[]) => set({ tabs })
}))

export default useTabsStore
