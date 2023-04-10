import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Alert, Button, Form, Input } from 'antd'
import './style.less'

const Login: React.FC<any> = () => {
  const [errMsg, setErrMsg] = useState('')
  const navagate = useNavigate()
  const onLogin = (values: any) => {
    setErrMsg('')
    window.sessionStorage.setItem('username', values.name)
    window.sessionStorage.setItem('token', '1')
    const path = '/'
    navagate(path)
  }

  return (
    <div className='page-login'>
      <div className='content'>
        <div className='header'>u2admin</div>
        <div className='form'>
          {errMsg && (
            <Alert
              message={errMsg}
              type='error'
              showIcon
              style={{ marginBottom: '24px' }}
            />
          )}
          <Form
            wrapperCol={{ span: 24 }}
            requiredMark={false}
            initialValues={{ name: 'admin', password: '123456' }}
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
      </div>
    </div>
  )
}

export default Login
