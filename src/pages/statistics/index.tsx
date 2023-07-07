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
import { getBusiness, getInventory, getStatistics } from '@/api/statistics'
import { useRequest } from '@/hooks'
import { useThemeStore } from '@/store'
import './style.less'

const Home: React.FC<any> = () => {
  const theme = useThemeStore((state) => state.theme)
  const plotRef = useRef<DualAxes | null>(null)
  const plotElementRef = useRef<HTMLDivElement | null>(null)

  const pieRef = useRef<Pie | null>(null)
  const pieElementRef = useRef<HTMLDivElement | null>(null)
  const [type, setType] = useState('day')
  const { data: total } = useRequest(getStatistics, {
    defaultData: { totalProfit: '0', totalInventory: '0' }
  })

  const {
    loading,
    data: { buyList, sellList, profitList },
    run: fetchProfit
  } = useRequest(getBusiness, {
    params: { type },
    defaultData: {
      buyList: [],
      sellList: [],
      profitList: []
    }
  })

  const { loading: inventoryLoading, data: inventory } = useRequest(
    getInventory,
    {
      defaultData: []
    }
  )
  const initBusiness = () => {
    if (plotRef.current) return
    if (plotElementRef.current) {
      plotRef.current = new DualAxes(plotElementRef.current, {
        data: [[], []],
        xField: 'date',
        yField: ['value', 'value', 'percantage'],
        legend: {
          itemHeight: 14
        },
        geometryOptions: [
          {
            geometry: 'line',
            seriesField: 'name',
            smooth: true,
            color: ({ name }) => {
              return name === '买入' ? '#FF0000' : '#00FF00'
            }
          },
          {
            geometry: 'column',
            seriesField: 'name',
            smooth: true,
            isStack: true,
            columnWidthRatio: 0.4
          }
        ],
        tooltip: {
          fields: ['date', 'name', 'value', 'percantage'],
          position: 'left',
          customItems: (originalItems: any[]) => {
            // 防止显示过长
            if (originalItems.length > 24) {
              const buyAndSell = originalItems.filter((item) =>
                ['买入', '卖出'].includes(item.name)
              )
              const sliceItems = originalItems
                .filter((item) => !['买入', '卖出'].includes(item.name))
                .sort((a, b) => b.data.value - a.data.value)
                .slice(0, 24)
              return [...sliceItems, ...buyAndSell]
            }
            return originalItems
          },
          formatter: (data: any) => {
            const { name, value, percantage } = data
            return {
              name: name,
              value: value + ' 万 ' + (percantage ? percantage + '%' : '')
            }
          }
        }
      })
      plotRef.current.render()
    }
  }
  const initInventory = () => {
    if (pieRef.current) return
    if (pieElementRef.current) {
      pieRef.current = new Pie(pieElementRef.current, {
        theme,
        appendPadding: 10,
        data: [],
        angleField: 'totalInventory',
        colorField: 'goodsName',
        radius: 0.75,
        label: {
          type: 'outer',
          content: (data) => {
            if (data.totalInventory > 100) {
              return data.goodsName + `${data.totalInventory} 万`
            }
            return ''
          }
        },
        tooltip: {
          formatter: (data: any) => {
            return {
              name: data.goodsName,
              value: data.totalInventory + ' 万'
            }
          }
        },
        interactions: [{ type: 'element-selected' }, { type: 'element-active' }]
      })
      pieRef.current.render()
    }
  }
  useEffect(() => {
    initBusiness()
    initInventory()
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
  useEffect(() => {
    if (pieRef.current) {
      pieRef.current.update({ data: inventory })
    }
  }, [inventory])
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
        <Row gutter={8}>
          <Col span={6}>
            <Card title={null}>
              <Statistic title='总利润（万）' value={total.totalProfit} />
            </Card>
          </Col>
          <Col span={6}>
            <Card title={null}>
              <Statistic title='库存（万）' value={total.totalInventory} />
            </Card>
          </Col>
        </Row>
        <div className='charts'>
          <Row gutter={8}>
            <Col span={14}>
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
            <Col span={10}>
              <Spin spinning={inventoryLoading}>
                <Card title='库存占比'>
                  <div ref={pieElementRef}></div>
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
