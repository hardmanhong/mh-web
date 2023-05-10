import React, { useMemo, useState } from 'react'
import { Divider, Form, Input, InputNumber, Space } from 'antd'
import style from './style.module.less'

const Gem: React.FC<{}> = () => {
  const [level, setLevel] = useState(0)
  const [price, setPrice] = useState(0)

  const onLevelChange = (value: any) => {
    setLevel(value)
  }
  const onPriceChange = (value: any) => {
    setPrice(value)
  }
  const total = useMemo(() => {
    if (level === 0) return 0
    return Math.pow(2, level - 1)
  }, [level])
  const amount = useMemo(() => {
    if (total === 0 || price === 0) return 0
    return total * price
  }, [total, price])

  const totalForging = useMemo(() => {
    if (level === 0) return 0
    return Math.pow(2, level) - 1
  }, [level])

  const amountForging = useMemo(() => {
    if (price === 0 || amount === 0) return 0
    return price * totalForging
  }, [price, amount])
  return (
    <div className={style.gem}>
      <Form labelCol={{ span: 3 }}>
        <Form.Item label='宝石'>
          <Space>
            <InputNumber
              min={0}
              addonAfter='级'
              value={level}
              onChange={onLevelChange}
            />
            <InputNumber
              min={0}
              addonAfter='万'
              value={price}
              onChange={onPriceChange}
            />
          </Space>
        </Form.Item>
        <Divider />
        <Form.Item label='单颗'>
          <Space>
            <Input readOnly addonAfter='颗' value={total} />
            <Input readOnly addonAfter='万' value={amount} />
          </Space>
        </Form.Item>
        <Form.Item label='锻造'>
          <Space>
            <Input readOnly addonAfter='颗' value={totalForging} />
            <Input readOnly addonAfter='万' value={amountForging} />
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Gem
