import { useNavigate } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import {
  Avatar,
  Dropdown,
  Form,
  Input,
  Layout,
  Modal,
  Space,
  message
} from 'antd'
import { changePassword } from '@/api/user'
import { ZForm } from '@/components'
import { useBoolean } from '@/hooks'
import LayoutSwitch from './LayoutSwitch'
import ThemeSwitch from './ThemeSwitch'
import logo from './logo.png'
import './style.less'

const { Header } = Layout

const U2Header: React.FC = () => {
  const username = window.sessionStorage.getItem('username')
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [open, setOpen] = useBoolean()
  const onLogout = () => {
    window.sessionStorage.clear()
    navigate('/login')
  }
  const onChangePsw = () => {
    form.validateFields().then((values) => {
      changePassword(values).then(() => {
        setOpen(false)
        message.success('修改成功')
      })
    })
  }
  return (
    <>
      <div className='u2-header-placeholder'></div>
      <Modal
        title='修改密码'
        open={open}
        onCancel={() => setOpen(false)}
        onOk={onChangePsw}
      >
        <ZForm
          form={form}
          colProps={{ span: 24 }}
          initialValues={{
            name: username
          }}
          list={[
            {
              props: {
                label: '账号',
                name: 'name'
              },
              component: <Input disabled />
            },
            {
              props: {
                label: '密码',
                name: 'password',
                rules: [
                  {
                    required: true,
                    message: '请输入密码'
                  }
                ]
              },
              component: <Input.Password />
            },
            {
              props: {
                label: '新密码',
                name: 'newPassword',
                rules: [
                  {
                    required: true,
                    message: '请输入新密码'
                  },
                  {
                    pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
                    message: '密码要求6-16位,必须包含数字和字母'
                  }
                ]
              },
              component: <Input.Password />
            }
          ]}
        />
      </Modal>
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
                    key: 'changepsw',
                    onClick: () => {
                      setOpen(true)
                    }
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
