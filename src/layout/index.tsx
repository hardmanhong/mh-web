import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Layout } from 'antd'
import { useBoolean } from '@/hooks'
import { routerConfig } from '@/router'
import { U2Content, U2Header, U2Menu, U2Silder } from './components'
import './style.less'
import { IProps } from './types'
import {
  genMenuData,
  generateRoutesMap,
  getOpenMenuKeys,
  getSelectedMenuKeys
} from './utils'

const getMenuItems = (menus: any[]): any[] =>
  menus.map((item) => ({
    key: item.path,
    icon: item.icon,
    label: <Link to={item.path}>{item.name}</Link>,
    children: item.children?.length ? getMenuItems(item.children) : undefined
  }))
const U2Layout: React.FC<IProps> = () => {
  const menus = genMenuData('/', routerConfig[0].children as any[])
  const location = useLocation()
  const [collapsed, setCollapsed] = useBoolean(false)
  const [openKeys, setOpenKeys] = useState<any[]>([])
  const [selectedKeys, setSelectedKeys] = useState<any[]>([])
  useEffect(() => {
    generateRoutesMap('', routerConfig)
  }, [])
  useEffect(() => {
    const selectedMenuKeys = getSelectedMenuKeys(location.pathname)
    const openMenuKeys = getOpenMenuKeys(selectedMenuKeys)
    setOpenKeys(openMenuKeys)
    setSelectedKeys(selectedMenuKeys)
  }, [location])
  const menuProps = {
    items: getMenuItems(menus),
    openKeys,
    selectedKeys,
    onOpenChange: setOpenKeys
  }

  return (
    <div className='u2-layout'>
      <Layout>
        <U2Silder collapsed={collapsed} setCollapsed={setCollapsed}>
          <U2Menu {...menuProps} />
        </U2Silder>
        <Layout>
          <U2Header />
          {/* <U2Breadcrumb /> */}
          <U2Content></U2Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default U2Layout
