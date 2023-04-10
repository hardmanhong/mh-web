import { TableProps } from 'antd/lib/table'

export interface ZTableProps<T> extends TableProps<T> {
  name?: React.ReactNode
  options?: React.ReactNode
}
