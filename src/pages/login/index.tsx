import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Alert, Button, Form, Input, Tabs } from 'antd'
import { userLogin, userRegister } from '@/api'
import { useMessage } from '@/provider'
import './style.less'

const Login: React.FC<{
  onOk: () => void
  onError: (message: string) => void
}> = ({ onOk, onError }) => {
  const message = useMessage()
  const navagate = useNavigate()
  const onLogin = (values: any) => {
    userLogin(values)
      .then((res: any) => {
        message.success('登录成功')
        onOk()
        window.sessionStorage.setItem('username', values.name)
        window.sessionStorage.setItem('token', res)
        const path = '/'
        navagate(path)
      })
      .catch((err) => {
        onError(err.message)
      })
  }

  return (
    <div className='form'>
      <Form
        wrapperCol={{ span: 24 }}
        requiredMark={false}
        initialValues={{ name: 'admin', password: 'mh123456' }}
        onFinish={onLogin}
      >
        <Form.Item
          name='name'
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input
            size='large'
            placeholder='请输入用户名'
            prefix={<UserOutlined className='icon' />}
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password
            size='large'
            placeholder='请输入密码'
            prefix={<LockOutlined className='icon' />}
          />
        </Form.Item>
        <Form.Item>
          <Button block size='large' type='primary' htmlType='submit'>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
const SignUp: React.FC<{
  onOk: () => void
  onError: (message: string) => void
}> = ({ onOk, onError }) => {
  const message = useMessage()
  const onFinish = (values: any) => {
    userRegister(values)
      .then(() => {
        message.success('注册成功')
        onOk()
      })
      .catch((err) => {
        onError(err.message)
      })
  }

  return (
    <div className='form'>
      <Form wrapperCol={{ span: 24 }} requiredMark={false} onFinish={onFinish}>
        <Form.Item
          name='name'
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input
            size='large'
            placeholder='请输入用户名'
            prefix={<UserOutlined className='icon' />}
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password
            size='large'
            placeholder='请输入密码'
            prefix={<LockOutlined className='icon' />}
          />
        </Form.Item>
        <Form.Item>
          <Button block size='large' type='primary' htmlType='submit'>
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
const LoginSignUp: React.FC<any> = () => {
  const [errMsg, setErrMsg] = useState('')
  const [activeKey, setActiveKey] = useState<string>('login')
  return (
    <div className='page-login'>
      <div className='content'>
        <div className='header'>u2admin</div>
        {errMsg && (
          <Alert
            message={errMsg}
            type='error'
            showIcon
            style={{ marginBottom: '24px' }}
          />
        )}
        <Tabs
          className='login-tabs'
          size='small'
          activeKey={activeKey}
          onChange={(key) => {
            setActiveKey(key)
          }}
          items={[
            {
              label: '登录',
              key: 'login',
              children: (
                <Login
                  onOk={() => {}}
                  onError={(message) => {
                    setErrMsg(message)
                  }}
                />
              )
            },
            {
              label: '注册',
              key: 'signup',
              children: (
                <SignUp
                  onOk={() => {
                    setActiveKey('login')
                  }}
                  onError={(message) => {
                    setErrMsg(message)
                  }}
                />
              )
            }
          ]}
        />
      </div>
    </div>
  )
}

export default LoginSignUp
