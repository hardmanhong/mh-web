import { useMemo } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout } from 'antd'
import './style.less'
import { IProps } from './types'

const width = 208
const collapsedWidth = 48

const generateStyle = (w: number) => ({
  width: w,
  overflow: 'hidden',
  flex: `0 0 ${w}px`,
  maxWidth: w,
  minWidth: w,
  transition:
    'backgroundColor 0.5s ease 0s, min-width 0.3s ease 0s, max-width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) 0s'
})
const U2Silder: React.FC<IProps> = ({ collapsed, setCollapsed, children }) => {
  const style = useMemo(
    () => generateStyle(collapsed ? collapsedWidth : width),
    [collapsed]
  )
  return (
    <>
      <div style={style}></div>
      <div className='u2-sider'>
        <Layout.Sider
          theme='light'
          collapsible
          breakpoint='xl'
          collapsed={collapsed}
          onCollapse={setCollapsed}
          width={width}
          collapsedWidth={collapsedWidth}
          trigger={
            <div className='u2-sider-trigger'>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
          }
        >
          {children}
        </Layout.Sider>
      </div>
    </>
  )
}

export default U2Silder
