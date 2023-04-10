import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import { BreadcrumbProvider, useGetTheme, useInitTheme } from './provider'
import routes from './router'

function App() {
  const theme = useGetTheme()
  const toggle = useInitTheme('#custom-theme', '/antd.dark.min.css')
  useEffect(() => {
    toggle(theme)
  }, [theme])
  return (
    <ConfigProvider locale={zh_CN}>
      <BreadcrumbProvider>
        <RouterProvider router={routes}></RouterProvider>
      </BreadcrumbProvider>
    </ConfigProvider>
  )
}

export default App
