import { useNavigate } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Layout, Space } from 'antd'
import LayoutSwitch from './LayoutSwitch'
import ThemeSwitch from './ThemeSwitch'
import logo from './logo.png'
import './style.less'

const { Header } = Layout

const U2Header: React.FC = () => {
  const username = window.sessionStorage.getItem('username')
  const navigate = useNavigate()
  const onLogout = () => {
    window.sessionStorage.clear()
    navigate('/login')
  }
  return (
    <>
      <div className='u2-header-placeholder'></div>
      <Header className='u2-header'>
        <div className='logo'>
          <a>
            <img src={logo} alt='logo' />
            <h1>聚宝盆</h1>
          </a>
        </div>
        <div className='right'>
          <Space>
            <LayoutSwitch />
            <ThemeSwitch />
            <Dropdown
              menu={{
                items: [
                  {
                    label: '修改密码',
                    key: 'changepsw'
                  },
                  {
                    type: 'divider'
                  },
                  {
                    label: '退出登录',
                    key: 'logout',
                    onClick: onLogout
                  }
                ]
              }}
            >
              <div className='user'>
                <Avatar size={24} icon={<UserOutlined />}>
                  {username}
                </Avatar>
                <div className='dropdown-link'>
                  <span className='name'>{username}</span>
                </div>
              </div>
            </Dropdown>
          </Space>
        </div>
      </Header>
    </>
  )
}

export default U2Header
