import { Form, FormInstance, FormItemProps, Input } from 'antd'
import { NamePath } from 'antd/es/form/interface'
import dayjs from 'dayjs'

interface RangPickerFormItemProps extends FormItemProps {
  format?: {
    name: NamePath
    getValue: (
      name: NamePath,
      form: FormInstance
    ) => Pick<FormItemProps, 'getValueProps' | 'getValueFromEvent'>
  }
}

const getFormat = (
  name: NamePath,
  format = 'YYYY-MM-DD'
): RangPickerFormItemProps['format'] => ({
  name,
  getValue: (endName, form) => ({
    getValueProps: (value) => ({
      value: value && [dayjs(value), dayjs(form.getFieldValue(endName))]
    }),
    getValueFromEvent: (values) => {
      const [start, end] = values || []
      form.setFields([
        { name: endName, value: end && dayjs(end).format(format) }
      ])
      return start && dayjs(start).format(format)
    }
  })
})

const RangPickerItem = (props: RangPickerFormItemProps) => {
  const { format, ...rest } = props
  if (!format) {
    return <Form.Item {...rest} />
  }
  return (
    <>
      <Form.Item
        noStyle
        shouldUpdate={(prev, next) =>
          prev[format.name as string] !== next[format.name as string]
        }
      >
        {(form) => (
          <Form.Item
            {...format?.getValue?.(format.name || [], form as FormInstance)}
            {...rest}
          />
        )}
      </Form.Item>
      <Form.Item name={format.name} hidden>
        <Input />
      </Form.Item>
    </>
  )
}
RangPickerItem.getFormat = getFormat
export default RangPickerItem
