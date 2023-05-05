import { useEffect, useRef, useState } from 'react'
import { Line, Pie } from '@antv/g2plot'
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
import { getStatistics, getStatisticsTotalProfit } from '@/api/statistics'
import { useRequest } from '@/hooks'
import { useThemeStore } from '@/store'

const Home: React.FC<any> = () => {
  const theme = useThemeStore((state) => state.theme)
  const lineElementRef = useRef<HTMLDivElement | null>(null)
  const lineRef = useRef<Line | null>(null)
  const pieElementRef = useRef<HTMLDivElement | null>(null)
  const pieRef = useRef<Pie | null>(null)
  const [type, setType] = useState('day')
  const { data: totalProfit } = useRequest(getStatisticsTotalProfit, {
    defaultData: 0
  })
  const {
    loading,
    data: profit,
    run: fetchProfit
  } = useRequest(getStatistics, {
    params: { type },
    defaultData: []
  })
  useEffect(() => {
    if (lineElementRef.current) {
      lineRef.current = new Line(lineElementRef.current, {
        theme,
        data: [],
        xField: 'label',
        yField: 'value',
        seriesField: 'type'
      })
      lineRef.current.render()
    }
    if (pieElementRef.current) {
      const data = [
        { type: '分类一', value: 27 },
        { type: '分类二', value: 25 },
        { type: '分类三', value: 18 },
        { type: '分类四', value: 15 },
        { type: '分类五', value: 10 },
        { type: '其他', value: 5 }
      ]
      pieRef.current = new Pie(pieElementRef.current, {
        theme,
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.75,
        label: {
          type: 'spider',
          labelHeight: 28,
          content: '{name}\n{percentage}'
        },
        interactions: [{ type: 'element-selected' }, { type: 'element-active' }]
      })
      pieRef.current.render()
    }
  }, [])
  useEffect(() => {
    if (lineRef.current) {
      lineRef.current.update({ theme })
    }
    if (pieRef.current) {
      pieRef.current.update({ theme })
    }
  }, [theme])
  useEffect(() => {
    if (lineRef.current) {
      lineRef.current.update({
        data: profit
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
    <div className='page-statistics'>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Row>
          <Col span={8}>
            <Card title={null}>
              <Statistic title='总利润（万）' value={totalProfit} />
            </Card>
          </Col>
        </Row>
        <div className='charts'>
          <Row gutter={8}>
            <Col span={24}>
              <Spin spinning={loading}>
                <Card
                  title='统计'
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
            </Col>
            {/* <Col span={12}>
              <Card title='卖出' extra={<DatePicker.RangePicker />}>
                <div ref={pieElementRef}></div>
              </Card>
            </Col> */}
          </Row>
        </div>
      </Space>
    </div>
  )
}

export default Home
