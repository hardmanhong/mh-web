import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import {
  BreadcrumbProvider,
  MessgaeProvider,
  useGetTheme,
  useInitTheme
} from './provider'
import { DARK_THEME, LIGHT_THEME } from './provider/theme'
import routes from './router'

function App() {
  const theme = useGetTheme()
  const toggle = useInitTheme('#custom-theme', '/antd.dark.min.css')
  useEffect(() => {
    toggle(theme)
  }, [theme])
  const themeToken = theme === 'light' ? LIGHT_THEME : DARK_THEME
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: themeToken
      }}
    >
      <MessgaeProvider>
        <BreadcrumbProvider>
          <RouterProvider router={routes}></RouterProvider>
        </BreadcrumbProvider>
      </MessgaeProvider>
    </ConfigProvider>
  )
}

export default App
