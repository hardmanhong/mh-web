import React from 'react'
import { LabeledValue, SelectProps } from 'antd/lib/select'

export interface SelectSearchProps extends SelectProps<any> {
  value?: any
  showValue?: boolean
  params?: { [key: string]: any }
  paramsKey?: string
  defaultParams?: { [key: string]: any }
  api(params?: any): Promise<any>
  onChange?: (value: any, item: any) => void
  formatter?: (item: LabeledValue) => React.ReactNode
  formatData?: (data: any) => any
}
