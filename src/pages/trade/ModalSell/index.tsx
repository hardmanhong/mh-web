import React from 'react'
import { Form, Input, InputNumber, Modal, Space } from 'antd'
import { ZForm } from '@/components'
import { IProps } from './types'

const ModalSell: React.FC<IProps> = ({ open, data, onCancel, onOk }) => {
  const [form] = Form.useForm()
  const handleOk = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    form.validateFields().then((values) => {
      onOk?.(values)
    })
  }
  return (
    <Modal
      title={data.id ? '编辑卖出记录' : '创建卖出记录'}
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
    >
      <ZForm
        form={form}
        initialValues={data}
        list={[
          {
            colProps: {
              span: 24
            },
            props: {
              label: '商品',
              style: { marginBottom: 0 }
            },
            component: (
              <Space>
                <span>{data?.goods?.name}</span>
                <span>
                  {data?.goods?.minPrice + '~' + data?.goods?.maxPrice + '万'}
                </span>
              </Space>
            )
          },
          {
            colProps: {
              span: 24
            },
            props: {
              label: '买入',
              style: { marginBottom: 0 }
            },
            component: (
              <span>
                {data?.buyPrice}万/{data?.buyQuantity}个
              </span>
            )
          },
          {
            colProps: {
              span: 24
            },
            props: {
              label: '卖出',
              required: true,
              style: { marginBottom: 0 }
            },
            component: (
              <Space align='baseline'>
                <Form.Item
                  name='price'
                  rules={[
                    {
                      required: true,
                      message: '请填写卖出价格'
                    }
                  ]}
                >
                  <InputNumber min={0} placeholder='价格' addonAfter='万' />
                </Form.Item>
                <Form.Item
                  name='quantity'
                  rules={[
                    {
                      required: true,
                      message: '请填写卖出数量'
                    }
                  ]}
                >
                  <InputNumber min={0} placeholder='数量' addonAfter='个' />
                </Form.Item>
              </Space>
            )
          },
          {
            colProps: {
              span: 24
            },
            props: {
              name: 'remark',
              label: '备注'
            },
            component: <Input.TextArea placeholder='备注' />
          }
        ]}
      ></ZForm>
    </Modal>
  )
}

export default ModalSell
