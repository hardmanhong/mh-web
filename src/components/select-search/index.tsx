import React, { useEffect, useState } from 'react'
import { Select } from 'antd'
import clsx from 'clsx'
import { useDebounceValue } from '@/hooks'
import { SelectSearchProps } from './interface'
import './style.less'

const { Option } = Select

const SelectSearch: React.FC<SelectSearchProps> = ({
  showValue = false,
  value,
  onChange,
  formatter,
  formatData,
  api,
  params,
  paramsKey,
  defaultParams,
  className,
  children,
  ...props
}) => {
  const [data, setData] = useState<any[]>([])
  const [_value, setValue] = useState<string>(value)
  const [searchValue, setSearchValue] = useState<string>('')
  const debouncedValue = useDebounceValue<string>(searchValue, 500)
  useEffect(() => {
    setValue(value)
  }, [value])
  useEffect(() => {
    if (defaultParams) {
      api({ ...defaultParams }).then((res) => {
        if (typeof formatData === 'function') {
          setData(formatData(res))
        } else {
          setData(res.list)
        }
      })
    }
  }, [defaultParams])
  useEffect(() => {
    const payload = { ...params }
    if (paramsKey) {
      payload[paramsKey] = debouncedValue
      api(payload).then((res) => {
        if (typeof formatData === 'function') {
          setData(formatData(res))
        } else {
          setData(res.list)
        }
      })
    }
  }, [debouncedValue])
  const onSearch = (newValue: string) => {
    if (newValue) {
      setSearchValue(newValue)
    } else {
      setData([])
    }
  }

  const handleChange = (value: string) => {
    const item = data.find((item) => item.value === value)
    setValue(value)
    onChange?.(value, item)
  }
  return (
    <Select
      className={clsx('c-select-search', className)}
      allowClear
      showSearch
      value={_value}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={onSearch}
      onChange={handleChange}
      notFoundContent={null}
      {...props}
    >
      {children
        ? children
        : data.map((item) => (
            <Option key={item.value} value={item.value}>
              {formatter ? formatter(item) : item.label}
            </Option>
          ))}
    </Select>
  )
}

export default SelectSearch
