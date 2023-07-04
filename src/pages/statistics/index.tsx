import { useEffect, useRef, useState } from 'react'
import { DualAxes, Pie } from '@antv/g2plot'
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
  const plotRef = useRef<DualAxes | null>(null)
  const plotElementRef = useRef<HTMLDivElement | null>(null)

  const pieRef = useRef<Pie | null>(null)
  const pieElementRef = useRef<HTMLDivElement | null>(null)
  const [type, setType] = useState('day')
  const { data: totalProfit } = useRequest(getStatisticsTotalProfit, {
    defaultData: 0
  })
  const {
    loading,
    data: { buyList, sellList, profitList },
    run: fetchProfit
  } = useRequest(getStatistics, {
    params: { type },
    defaultData: {
      buyList: [],
      sellList: [],
      profitList: []
    }
  })
  useEffect(() => {
    if (plotElementRef.current) {
      plotRef.current = new DualAxes(plotElementRef.current, {
        data: [[], []],
        xField: 'date',
        yField: ['value', 'value'],
        geometryOptions: [
          {
            geometry: 'line',
            seriesField: 'name',
            smooth: true,
            color: ({ name }) => {
              return name === '买入' ? '#4D96FF' : '#FF6B6B'
            }
          },
          {
            geometry: 'column',
            seriesField: 'name',
            smooth: true,
            color: '#6BCB77'
          }
        ]
      })
      plotRef.current.render()
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
    if (plotRef.current) {
      plotRef.current.update({ theme })
    }
    if (pieRef.current) {
      pieRef.current.update({ theme })
    }
  }, [theme])
  useEffect(() => {
    if (plotRef.current) {
      plotRef.current.update({
        data: [[...buyList, ...sellList], profitList]
      })
    }
  }, [buyList, sellList, profitList])
  const onDateTypeChange = (e: RadioChangeEvent) => {
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
                  <div ref={plotElementRef}></div>
                </Card>
              </Spin>
            </Col>
          </Row>
        </div>
      </Space>
    </div>
  )
}

export default Home
