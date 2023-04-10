import { ColProps } from 'antd/lib/col'
import { FormInstance, FormItemProps, FormProps } from 'antd/lib/form'
import { RowProps } from 'antd/lib/grid'

export interface IZFormItemProps {
  hidden?: (form: FormInstance) => boolean
  colProps?: ColProps
  props?: FormItemProps
  component: React.ReactNode | ((form: FormInstance) => React.ReactNode)
}
export interface IZFormProps extends FormProps {
  rowProps?: RowProps
  colProps?: ColProps
  type?: 'detail' | 'list'
  list: IZFormItemProps[]
  children?: React.ReactNode
}
