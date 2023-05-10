import React from 'react'
import { Tabs } from 'antd'
import { Gem } from './compoments'
import './style.less'
import { IProps } from './types'

const Tools: React.FC<IProps> = () => {
  const items = [
    {
      key: 'gem',
      label: '宝石计算',
      children: <Gem />
    }
  ]
  return (
    <div className='page-tools'>
      <Tabs size='small' tabPosition='left' items={items} />
    </div>
  )
}

export default Tools
