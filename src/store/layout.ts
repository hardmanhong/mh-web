import { create } from 'zustand'

const LAYOUT_KEY = '__U2_LAYOUT__'
const defaultValue = window.localStorage.getItem(LAYOUT_KEY) || 'tabs'

type Layout = 'tabs' | 'normal'

type State = {
  layout: Layout
}
type Action = {
  setLayout: (layout: Layout) => void
}

const useLayoutStore = create<State & Action>((set) => ({
  layout: defaultValue as Layout,
  setLayout: (layout: Layout) =>
    set(() => {
      window.localStorage.setItem(LAYOUT_KEY, layout)
      return { layout }
    })
}))

export default useLayoutStore
