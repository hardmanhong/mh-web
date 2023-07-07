import React from 'react'
import { LabeledValue, SelectProps } from 'antd/lib/select'

export interface LabeledValuei18nkey extends LabeledValue {
  i18n_key?: string
  label: string
}
export interface SelectFilterProps extends SelectProps<any> {
  value?: any
  onChange?: (value: any) => void
  showValue?: boolean
  options?: LabeledValuei18nkey[]
  formatter?: (item: LabeledValuei18nkey) => React.ReactNode
  children?: React.ReactNode
}
