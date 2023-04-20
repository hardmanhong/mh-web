import { useEffect, useRef, useState } from 'react'
import { Line } from '@antv/g2plot'
import {
  Card,
  Col,
  Radio,
  RadioChangeEvent,
  Row,
  Space,
  Spin,
  Statistic
} from 'antd'
import { getProfit, getTotalProfit } from '@/api/trade'
import { useRequest } from '@/hooks'
import { useGetTheme } from '@/provider'

const Home: React.FC<any> = () => {
  const theme = useGetTheme()
  const lineElementRef = useRef<HTMLDivElement | null>(null)
  const lineRef = useRef<Line | null>(null)
  const [type, setType] = useState('day')
  const { data: totalProfit } = useRequest(getTotalProfit, {
    defaultData: 0
  })
  const {
    loading,
    data: profit,
    run: fetchProfit
  } = useRequest(getProfit, {
    params: { type },
    defaultData: []
  })
  console.log('theme', profit)
  useEffect(() => {
    if (lineElementRef.current) {
      lineRef.current = new Line(lineElementRef.current, {
        theme,
        data: [],
        xField: 'label',
        yField: 'value',
        seriesField: 'field'
      })
      lineRef.current.render()
    }
  }, [])
  useEffect(() => {
    if (lineRef.current) {
      lineRef.current.update({ theme })
    }
  }, [theme])
  useEffect(() => {
    if (lineRef.current) {
      lineRef.current.update({
        data: profit.map((item: any) => ({
          ...item,
          field: '利润'
        }))
      })
    }
  }, [profit])
  const onDateTypeChange = (e: RadioChangeEvent) => {
    console.log(`radio checked:${e.target.value}`)
    const value = e.target.value as 'day' | 'week' | 'month' | 'year'
    setType(value)
    fetchProfit({
      type: value
    })
  }
  return (
    <div className='page-home'>
      <Space size='large' direction='vertical' style={{ width: '100%' }}>
        <Row>
          <Col span={12}>
            <Card title={null}>
              <Statistic title='总利润（万）' value={totalProfit} />
            </Card>
          </Col>
        </Row>
        <div className='charts'>
          <Spin spinning={loading}>
            <Card
              title='利润'
              extra={
                <Radio.Group value={type} onChange={onDateTypeChange}>
                  <Radio.Button value='day'>日</Radio.Button>
                  <Radio.Button value='week'>周</Radio.Button>
                  <Radio.Button value='month'>月</Radio.Button>
                  <Radio.Button value='year'>年</Radio.Button>
                </Radio.Group>
              }
            >
              <div ref={lineElementRef}></div>
            </Card>
          </Spin>
        </div>
      </Space>
    </div>
  )
}

export default Home
