import { useThemeStore } from '@/store'

function useListenTheme() {
  const { setTheme } = useThemeStore()
  const themeMedia = window.matchMedia('(prefers-color-scheme: dark)')
  themeMedia.onchange = (e) => {
    console.log('onchange', e)
  }
}

export default useListenTheme
