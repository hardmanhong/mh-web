import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import { useLayoutStore } from '@/store'
import U2Tabs from '../u2-tabs'
import './style.less'
import { IProps } from './types'

const U2Content: React.FC<IProps> = () => {
  const layout = useLayoutStore((state) => state.layout)
  return (
    <Layout.Content className='u2-content'>
      {layout === 'tabs' ? <U2Tabs /> : <Outlet />}
    </Layout.Content>
  )
}

export default U2Content
