import React from 'react'
import { Form, Input, InputNumber, Modal, Radio, Space } from 'antd'
import { SelectFilter, ZForm } from '@/components'
import { IZFormItemProps } from '@/components/z-form/types'
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
  const isCreate = !data.id
  const commonItems = [
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
            name='price'
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
            name='quantity'
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
  ]
  const createItems: IZFormItemProps[] = [
    {
      colProps: {
        span: 24
      },
      props: {
        name: '_goodsType',
        label: '商品方式',
        style: { marginBottom: 0 }
      },
      component: (
        <Radio.Group>
          <Radio value={1}>已有商品</Radio>
          <Radio value={2}>创建商品</Radio>
        </Radio.Group>
      )
    },
    {
      colProps: {
        span: 24
      },
      props: {
        name: 'goodsId',
        label: '商品',
        rules: [
          {
            required: true,
            message: '请选择商品'
          }
        ],
        shouldUpdate: (prev: any, cur: any) =>
          prev._goodsType !== cur._goodsType
      },
      hidden: (form) => form.getFieldValue('_goodsType') === 2,
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
        name: 'name',
        label: '商品名称',
        rules: [
          {
            required: true,
            message: '请输入商品名称'
          }
        ],
        shouldUpdate: (prev: any, cur: any) =>
          prev._goodsType !== cur._goodsType
      },
      hidden: (form) => form.getFieldValue('_goodsType') === 1,
      component: <Input />
    },
    {
      props: {
        label: '参考价格',
        required: true,
        style: { marginBottom: 0 },
        shouldUpdate: (prev: any, cur: any) =>
          prev._goodsType !== cur._goodsType
      },
      hidden: (form) => form.getFieldValue('_goodsType') === 1,
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
            <InputNumber min={0} placeholder='低价' addonAfter='万' />
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
            <InputNumber min={0} placeholder='高价' addonAfter='万' />
          </Form.Item>
        </Space>
      )
    },
    ...commonItems
  ]
  const editItems = [
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
    ...commonItems
  ]
  return (
    <Modal
      title={isCreate ? '创建买入记录' : '编辑买入记录'}
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
    >
      <ZForm
        form={form}
        initialValues={{ ...data, _goodsType: 1 }}
        list={isCreate ? createItems : editItems}
      ></ZForm>
    </Modal>
  )
}

export default ModalEdit
