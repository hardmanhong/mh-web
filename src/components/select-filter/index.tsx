import React from 'react'
import { Select } from 'antd'
import clsx from 'clsx'
import { SelectFilterProps } from './interface'
import './style.less'

const { Option } = Select

const SelectFilter: React.FC<SelectFilterProps> = ({
  showValue = false,
  options = [],
  formatter,
  className,
  children,
  ...props
}) => {
  return (
    <Select
      className={clsx('c-select-filter', className)}
      allowClear
      maxTagCount={1}
      showSearch
      filterOption={(input, option) =>
        (option!.children as unknown as string)
          .toLowerCase()
          .includes(input.toLowerCase())
      }
      {...props}
    >
      {children
        ? children
        : options.map((item) => (
            <Option key={item.value} value={item.value}>
              {formatter ? formatter(item) : item.label}
            </Option>
          ))}
    </Select>
  )
}

export default SelectFilter
