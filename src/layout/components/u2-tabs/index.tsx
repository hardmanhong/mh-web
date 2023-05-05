import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { SyncOutlined } from '@ant-design/icons'
import { Spin, Tabs, TabsProps } from 'antd'
import { useBoolean } from '@/hooks'
import { useLayoutStore, useTabsStore } from '@/store'
import './style.less'
import { getRouteByPath } from './utils'

const U2Tabs: React.FC<{}> = () => {
  const { tabs, activeTab, setActiveTab, removeTab, setTabs } = useTabsStore()
  const layout = useLayoutStore((state) => state.layout)
  const navigate = useNavigate()
  const { pathname, search } = useLocation()
  const [isReload, toggleIsReload] = useBoolean()
  useEffect(() => {
    if (layout === 'tabs') {
      const fullPath = pathname + search
      const route = getRouteByPath(pathname)
      if (!tabs.map((item) => item.key).includes(fullPath)) {
        const nTabs = [
          ...tabs,
          {
            key: fullPath,
            path: pathname,
            search,
            closable: true,
            label: route.name,
            element: route.element
          }
        ]
        setTabs(nTabs)
      }
      setActiveTab(fullPath)
    }
  }, [pathname, search])
  const onRefresh = () => {
    toggleIsReload(true)
    setTimeout(() => {
      toggleIsReload(false)
    }, 500)
  }
  const onEdit: TabsProps['onEdit'] = (targetKey, action) => {
    if (action === 'remove') {
      if (targetKey === activeTab) {
        const nTabs = tabs.filter((item) => item.key !== targetKey)
        const index = tabs.findIndex((item) => item.key === targetKey)
        const nextPath = nTabs[index - 1].key
        navigate(nextPath)
      }
      removeTab(targetKey as string)
    }
  }

  const onChange = (key: string) => {
    navigate(key)
  }
  const onTabClick = (targetKey: string) => {
    const item = tabs.find((item) => item.key === targetKey)
    if (item) {
      navigate(item.path)
    }
  }
  const fullPath = pathname + search

  return (
    <Tabs
      hideAdd
      size='small'
      className='u2-tabs'
      type='editable-card'
      activeKey={activeTab}
      onEdit={onEdit}
      onChange={onChange}
      onTabClick={onTabClick}
      items={tabs.map((item) => ({
        forceRender: true,
        key: item.key,
        label: (
          <>
            {item.key === fullPath && item.key !== '/404' && (
              <SyncOutlined onClick={onRefresh} title='刷新' spin={isReload} />
            )}
            {item.label}
          </>
        ),
        closable: item.closable,
        children:
          isReload && item.key === fullPath && item.key !== '/404' ? (
            <Spin tip='刷新中...' className='loading' />
          ) : (
            <div id={item.key}>{item.element}</div>
          )
      }))}
    />
  )
}

export default U2Tabs
