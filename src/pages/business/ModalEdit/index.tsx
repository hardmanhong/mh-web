import React from 'react'
import { Form, Input, Modal } from 'antd'
import { ZForm } from '@/components'
import { IProps } from './types'

const ModalEdit: React.FC<IProps> = ({ open, data, onCancel, onOk }) => {
  const [form] = Form.useForm()
  const handleOk = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    form.validateFields().then((values) => {
      onOk?.(e)
    })
  }
  return (
    <Modal title='商品' open={open} onCancel={onCancel} onOk={handleOk}>
      <ZForm
        form={form}
        initialValues={data}
        list={[
          {
            props: {
              name: 'name',
              label: '名称',
              rules: [
                {
                  required: true,
                  message: '请输入名称'
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
