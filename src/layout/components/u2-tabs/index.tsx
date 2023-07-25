import React, { useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { SyncOutlined } from '@ant-design/icons'
import { Dropdown, MenuProps, Spin, Tabs, TabsProps } from 'antd'
import { useBoolean } from '@/hooks'
import { useLayoutStore, useTabsStore } from '@/store'
import './style.less'
import { getRouteByPath } from './utils'

enum MenuType {
  All = 'all',
  Left = 'left',
  Right = 'right'
}

type TabLabelProps = {
  path: string
  label: string
  activeTab: string
  isReload: boolean
  disabledLeft?: boolean
  disabledRight?: boolean
  onRefresh: () => void
  onClick: (key: string, path: string) => void
}

const TabLabel = ({
  path = '/',
  label = '',
  activeTab = '/',
  isReload,
  disabledLeft = false,
  disabledRight = false,
  onClick,
  onRefresh
}: TabLabelProps) => {
  const _onClick: MenuProps['onClick'] = ({ key }) => {
    onClick(key, path)
  }
  const items: MenuProps['items'] = [
    {
      key: MenuType.All,
      label: '关闭全部'
    },
    {
      key: MenuType.Left,
      label: '关闭左侧',
      disabled: disabledLeft
    },
    {
      key: MenuType.Right,
      label: '关闭右侧',
      disabled: disabledRight
    }
  ]
  return (
    <Dropdown menu={{ items, onClick: _onClick }} trigger={['contextMenu']}>
      <span>
        {path === activeTab && path !== '/404' && (
          <SyncOutlined onClick={onRefresh} title='刷新' spin={isReload} />
        )}
        {label}
      </span>
    </Dropdown>
  )
}

const U2Tabs: React.FC<{}> = () => {
  const {
    tabs,
    activeTab,
    needReload,
    setActiveTab,
    removeTab,
    setTabs,
    setNeedReload
  } = useTabsStore()
  const layout = useLayoutStore((state) => state.layout)
  const navigate = useNavigate()
  const { pathname, search } = useLocation()
  const [isReload, toggleIsReload] = useBoolean()
  const [searchParams] = useSearchParams()
  useEffect(() => {
    if (layout === 'tabs') {
      const fullPath = pathname + search
      const route = getRouteByPath(pathname)
      const find = tabs.find((item) => item.key === fullPath)
      if (!find) {
        const label = searchParams.get('_nav') || route.name
        const nTabs = [
          ...tabs,
          {
            key: fullPath,
            path: pathname,
            search,
            closable: true,
            label,
            element: route.element
          }
        ]
        setTabs(nTabs)
      } else if (find && !find.element) {
        find.element = route.element
        setTabs(tabs)
      }
      setActiveTab(fullPath)
      if (needReload) {
        onRefresh()
        setNeedReload(false)
      }
    }
  }, [pathname, search, needReload])
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
      navigate(item.key)
    }
  }
  const onMenuClick = (key: string, path: string) => {
    if (key === MenuType.All) {
      setTabs(tabs.filter((item) => item.key === '/'))
      navigate('/')
    } else {
      const currentItem = tabs.find((item) => item.key === path)
      const index = tabs.findIndex((item) => item.key === path)
      if (!currentItem) return
      const activeIndex = tabs.findIndex((page) => page.path === activeTab)
      const isActive = currentItem.path === activeTab
      const nextTabs = [...tabs]

      if (key === MenuType.Left) {
        nextTabs.splice(1, index - 1)
        setTabs(nextTabs)
        if (!isActive && activeIndex < index) {
          navigate(currentItem.key, { replace: true })
        }
      } else if (key === MenuType.Right) {
        nextTabs.splice(index + 1)
        setTabs(nextTabs)
        if (!isActive && activeIndex > index) {
          navigate(currentItem.key, { replace: true })
        }
      }
    }
  }
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
      items={tabs.map((item, index) => ({
        forceRender: true,
        key: item.key,
        label: (
          <TabLabel
            path={item.key}
            label={item.label}
            activeTab={activeTab}
            isReload={isReload}
            disabledLeft={index <= 1}
            disabledRight={index === tabs.length - 1}
            onRefresh={onRefresh}
            onClick={onMenuClick}
          />
        ),
        closable: activeTab === item.key && item.closable,
        children:
          isReload && item.key === activeTab && item.key !== '/404' ? (
            <Spin tip='刷新中...' className='loading' />
          ) : (
            // id 是用来做列表高度
            <div id={item.key} className='content'>
              {item.element}
            </div>
          )
      }))}
    />
  )
}

export default U2Tabs
