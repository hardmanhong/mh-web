import React from 'react'
import { Tabs } from 'antd'
import { Account, Character } from './components'
import './style.less'
import { IProps } from './types'

const items = [
  {
    key: 'character',
    label: '角色',
    children: (
      <div className='content'>
        <Character />
      </div>
    )
  },
  {
    key: 'account',
    label: '账号',
    children: (
      <div className='content'>
        <Account />
      </div>
    )
  }
]
const Info: React.FC<IProps> = () => {
  return (
    <div className='page-info'>
      <Tabs size='small' tabPosition='left' items={items} />
    </div>
  )
}

export default Info
