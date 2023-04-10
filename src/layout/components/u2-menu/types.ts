import React from 'react'
import { MenuProps } from 'antd'

export interface IMenuItem {
  name: string
  icon: React.ReactNode
  path: string
  routes?: IMenuItem[]
}

export interface IProps extends MenuProps {
  menus: IMenuItem[]
}
