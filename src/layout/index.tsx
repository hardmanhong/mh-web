import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  AccountBookOutlined,
  AppstoreOutlined,
  HomeOutlined
} from '@ant-design/icons'
import { Layout } from 'antd'
import { useBoolean } from '@/hooks'
import { U2Content, U2Header, U2Menu, U2Silder } from './components'
import './style.less'
import { IProps } from './types'
import { genBreadcrumbMap, getOpenMenuKeys, getSelectedMenuKeys } from './utils'

const menus = [
  {
    name: '看板',
    icon: <HomeOutlined />,
    path: '/home'
  },
  {
    name: '商品',
    icon: <AppstoreOutlined />,
    path: '/goods'
  },
  {
    name: '买卖',
    icon: <AccountBookOutlined />,
    path: '/business'
  }
  // {
  //   name: 'test-list',
  //   icon: <HomeOutlined />,
  //   path: '/test'
  // },
  // {
  //   name: 'test-detail',
  //   icon: <HomeOutlined />,
  //   path: '/test/2'
  // },
  // {
  //   name: 'test-record',
  //   icon: <HomeOutlined />,
  //   path: '/test/record'
  // }
]
const U2Layout: React.FC<IProps> = () => {
  const location = useLocation()
  const [collapsed, setCollapsed] = useBoolean(false)
  const [openKeys, setOpenKeys] = useState<any[]>([])
  const [selectedKeys, setSelectedKeys] = useState<any[]>([])
  useEffect(() => {
    genBreadcrumbMap(menus)
  }, [])
  useEffect(() => {
    const selectedMenuKeys = getSelectedMenuKeys(location.pathname)
    const openMenuKeys = getOpenMenuKeys(selectedMenuKeys)
    console.log('location.pathname', location.pathname)
    console.log('selectedMenuKeys', selectedMenuKeys)
    setOpenKeys(openMenuKeys)
    setSelectedKeys(selectedMenuKeys)
  }, [location])
  const menuProps = {
    menus,
    openKeys,
    selectedKeys,
    setSelectedKeys
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
