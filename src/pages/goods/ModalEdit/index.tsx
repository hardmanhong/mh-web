import React from 'react'
import { Form, Input, InputNumber, Modal, Space } from 'antd'
import { ZForm } from '@/components'
import { IProps } from './types'

const ModalEdit: React.FC<IProps> = ({ open, data, onCancel, onOk }) => {
  const [form] = Form.useForm()
  const handleOk = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    form.validateFields().then((values) => {
      onOk?.(values)
    })
  }
  return (
    <Modal
      title={data.id ? '编辑商品' : '创建商品'}
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
    >
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
          },
          {
            props: {
              label: '参考价格',
              required: true
            },
            component: (
              <Space align='baseline'>
                <Form.Item
                  name='minPrice'
                  rules={[
                    {
                      required: true,
                      message: '请填写价格'
                    }
                  ]}
                >
                  <InputNumber placeholder='低价' />
                </Form.Item>
                <span>~</span>
                <Form.Item
                  name='maxPrice'
                  rules={[
                    {
                      required: true,
                      message: '请填写价格'
                    }
                  ]}
                >
                  <InputNumber placeholder='高价' />
                </Form.Item>
              </Space>
            )
          }
        ]}
      ></ZForm>
    </Modal>
  )
}

export default ModalEdit
