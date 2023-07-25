import { useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { MessageProvider } from './provider'
import { routerConfig } from './router'
import { useThemeStore } from './store'
import { DARK_THEME, LIGHT_THEME } from './store/theme'

function App() {
  const { theme, setTheme } = useThemeStore()
  const element = useRoutes(routerConfig)
  useEffect(() => {
    const themeMedia = window.matchMedia('(prefers-color-scheme: dark)')
    themeMedia.onchange = (e) => {
      const isDark = e.matches
      setTheme(isDark ? 'dark' : 'light')
    }
    setTheme(theme)
  }, [])
  const themeToken = theme === 'light' ? LIGHT_THEME : DARK_THEME
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: themeToken
      }}
    >
      <MessageProvider>{element}</MessageProvider>
    </ConfigProvider>
  )
}

export default App
