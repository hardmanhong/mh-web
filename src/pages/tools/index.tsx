import React from 'react'
import { Tabs } from 'antd'
import { Gem } from './components'
import './style.less'
import { IProps } from './types'

const Tools: React.FC<IProps> = () => {
  const items = [
    {
      key: 'gem',
      label: '宝石计算',
      children: <Gem />
    },
    {
      key: 'tool',
      label: '工具箱',
      children: (
        <iframe
          width='100%'
          height='600px'
          src='https://xyq.163.com/tools/index.html'
        ></iframe>
      )
    }
  ]
  return (
    <div className='page-tools'>
      <Tabs size='small' tabPosition='left' items={items} />
    </div>
  )
}

export default Tools
