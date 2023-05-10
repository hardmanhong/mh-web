import React from 'react'
import { Form, Input, Modal } from 'antd'
import { ZForm } from '@/components'
import { IProps } from './types'

const ModalEdit: React.FC<IProps> = ({ open, data, onCancel, onOk }) => {
  const [form] = Form.useForm()
  const handleOk = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    form.validateFields().then((values) => {
      onOk?.(values)
    })
  }
  const isCreate = !data.id
  return (
    <Modal
      title={isCreate ? '创建账号' : '编辑账号'}
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
    >
      <ZForm
        form={form}
        initialValues={{ ...data }}
        list={[
          {
            colProps: {
              span: 24
            },
            props: {
              name: 'name',
              label: '账号',
              rules: [
                {
                  required: true,
                  message: '请输入账号'
                }
              ]
            },
            component: <Input />
          },
          {
            colProps: {
              span: 24
            },
            props: {
              name: 'server',
              label: '服务器',
              rules: [
                {
                  required: true,
                  message: '请输入服务器'
                }
              ]
            },
            component: <Input />
          }
        ]}
      ></ZForm>
    </Modal>
  )
}

export default ModalEdit
