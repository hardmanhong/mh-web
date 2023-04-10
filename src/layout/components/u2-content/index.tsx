import React from 'react'
import { Outlet } from 'react-router-dom'
import { IProps } from './types'
import { Layout } from 'antd'
import './style.less'

const U2Breadcrumb: React.FC<IProps> = () => {
  return (
    <Layout.Content className='u2-content'>
      <Outlet />
    </Layout.Content>
  )
}

export default U2Breadcrumb
