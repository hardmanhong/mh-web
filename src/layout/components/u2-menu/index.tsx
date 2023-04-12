import { Menu } from 'antd'
import './style.less'
import { IProps } from './types'

const U2Menu: React.FC<IProps> = (props) => {
  return (
    <Menu
      className='u2-menu'
      theme='light'
      mode='inline'
      inlineIndent={32}
      {...props}
    ></Menu>
  )
}

export default U2Menu
