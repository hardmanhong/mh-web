import React from 'react'
import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Select
} from 'antd'
import { ZForm } from '@/components'
import { category } from '../data'
import { IProps } from './types'

const ModalEdit: React.FC<IProps> = ({ open, data, onCancel, onOk }) => {
  const [form] = Form.useForm()
  const handleOk = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    form.validateFields().then((values) => {
      if (values.date) {
        values.date = values.date.format('YYYY-MM-DD')
      }
      onOk?.(values)
    })
  }
  return (
    <Modal
      title={data.id ? '编辑收支' : '创建收支'}
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
    >
      <ZForm
        form={form}
        initialValues={data}
        colProps={{ span: 12 }}
        list={[
          {
            props: {
              name: 'type',
              label: '类型',
              rules: [
                {
                  required: true,
                  message: '请选择类型'
                }
              ]
            },
            component: (
              <Radio.Group>
                <Radio value={1}>收入</Radio>
                <Radio value={2}>支出</Radio>
              </Radio.Group>
            )
          },
          {
            props: {
              name: 'category',
              label: '分类',
              rules: [
                {
                  required: true,
                  message: '请选择分类'
                }
              ]
            },
            component: <Select options={category} />
          },
          {
            props: {
              name: 'amount',
              label: '金额',
              rules: [
                {
                  required: true,
                  message: '请输入金额'
                }
              ]
            },
            component: <InputNumber min={0} />
          },
          {
            props: {
              name: 'date',
              label: '日期',
              rules: [
                {
                  required: true,
                  message: '请选择日期'
                }
              ]
            },
            component: <DatePicker />
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
