import React from 'react'
import { Form, Input, InputNumber, Modal, Space } from 'antd'
import { SelectFilter, ZForm } from '@/components'
import { IProps } from './types'

const ModalEdit: React.FC<IProps> = ({
  open,
  data,
  goodsList,
  onCancel,
  onOk
}) => {
  const [form] = Form.useForm()
  const handleOk = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    form.validateFields().then((values) => {
      onOk?.(values)
    })
  }
  return (
    <Modal
      title={data.id ? '创建买入记录' : '编辑买入记录'}
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
              span: 12
            },
            props: {
              name: 'goodsId',
              label: '商品',
              rules: [
                {
                  required: true,
                  message: '请选择商品'
                }
              ]
            },
            component: (
              <SelectFilter
                options={goodsList.map((item: any) => ({
                  value: item.id,
                  label: item.name
                }))}
              />
            )
          },

          {
            colProps: {
              span: 24
            },
            props: {
              label: '买入',
              required: true,
              style: { marginBottom: 0 }
            },
            component: (
              <Space align='baseline'>
                <Form.Item
                  name='buyPrice'
                  rules={[
                    {
                      required: true,
                      message: '请填写买入价格'
                    }
                  ]}
                >
                  <InputNumber min={0} placeholder='价格' addonAfter='万' />
                </Form.Item>
                <Form.Item
                  name='buyQuantity'
                  rules={[
                    {
                      required: true,
                      message: '请填写买入数量'
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

export default ModalEdit
