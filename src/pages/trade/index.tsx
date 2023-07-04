import React from 'react'
import { CalendarOutlined, PushpinOutlined } from '@ant-design/icons'
import { Button, Col, Form, List, Row, Space, Tag, Typography } from 'antd'
import {
  FilterValue,
  SorterResult,
  TablePaginationConfig
} from 'antd/lib/table/interface'
import { createGoods, getGoodsList } from '@/api/goods'
import {
  TTradeBuy,
  TTradeSell,
  createTradeBuy,
  createTradeSell,
  deleteTradeBuy,
  getTradeBuyList,
  updateTradeBuy,
  updateTradeSell
} from '@/api/trade'
import { PageList, ZForm, ZPagination, ZTable } from '@/components'
import { useModalPrpos, usePaginated, useRequest } from '@/hooks'
import { useMessage } from '@/provider'
import { formatDate } from '@/utils'
import ModalEdit from './ModalEdit'
import ModalSell from './ModalSell'
import { formPropsFn, tableStaticPropsFn } from './data'
import { IProps } from './types'

type TEditBuy = {
  _goodsType?: 1 | 2
  goodsId?: number
  name?: string
  minPrice?: number
  maxPrice?: number
  id?: number
  price?: number
  quantity?: number
}
const Trade: React.FC<IProps> = () => {
  const message = useMessage()
  const [form] = Form.useForm()
  const { loading, data, tableProps, paginationProps, onSearch } =
    usePaginated(getTradeBuyList)
  const {
    data: { list: goodsList = [] },
    run: fetchGoodsList
  } = useRequest(getGoodsList, {
    params: {
      page: 1,
      pageSize: 1000
    },
    defaultData: { list: [], total: 0 }
  })
  const [modalEditProps, openModalEdit, closeModalEdit] =
    useModalPrpos<TTradeBuy>({})
  const [modalSellProps, openModalSell, closeModalSell] =
    useModalPrpos<TTradeSell>({})
  const onAdd = () => {
    openModalEdit({})
  }
  const onEdit = (record: any) => {
    openModalEdit({
      ...record
    })
  }
  const onSell = (record: any) => {
    openModalSell({
      goods: record?.goods,
      buyPrice: record.price,
      inventory: record.inventory,
      goodsId: record?.goods?.id,
      buyId: record.id
    })
  }
  const onDelete = (record: any) => {
    if (!record.id) return
    deleteTradeBuy(record.id).then(() => {
      message.success('删除成功')
      onSearch()
    })
  }
  const onEditOk = async (values: TEditBuy) => {
    try {
      const isCreateGoods = values?._goodsType === 2
      if (isCreateGoods) {
        const goodsId = await createGoods({
          name: values.name as string,
          minPrice: values.minPrice as number,
          maxPrice: values.maxPrice as number
        }).then((goods) => {
          return goods.id
        })
        values.goodsId = goodsId
        fetchGoodsList()
      }
      const id = modalEditProps.data?.id
      if (id) {
        updateTradeBuy(id, values).then(() => {
          closeModalEdit()
          message.success('操作成功')
          onSearch()
        })
      } else {
        createTradeBuy(values).then(() => {
          closeModalEdit()
          message.success('操作成功')
          onSearch()
        })
      }
    } catch (error) {
      console.log('error', error)
    }
  }
  const onSellOk = (values: TTradeSell) => {
    const id = modalSellProps.data?.id
    if (id) {
      updateTradeSell(id, {
        ...values,
        buyId: modalSellProps.data?.buyId
      }).then(() => {
        closeModalSell()
        message.success('操作成功')
        onSearch()
      })
    } else {
      createTradeSell({
        ...values,
        ...modalSellProps.data
      }).then(() => {
        closeModalSell()
        message.success('操作成功')
        onSearch()
      })
    }
  }
  const onEditSell = (buy: any, sell: any) => {
    openModalSell({
      goods: buy?.goods,
      buyPrice: buy.price,
      inventory: buy.inventory,
      goodsId: buy?.goods?.id,
      buyId: buy.id,
      ...sell
    })
  }
  const handleSearch = () => {
    onSearch(form.getFieldsValue())
  }
  const onTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[]
  ) => {
    const order: { [key: string]: 'asc' | 'desc' | null } = {}
    if ((sorter as SorterResult<any>).field) {
      sorter = sorter as SorterResult<any>
      if (sorter.field === 'in') {
        order.inventory = sorter.order === 'ascend' ? 'asc' : 'desc'
      } else if (sorter.field === 'name') {
        order.hasSold = sorter.order === 'ascend' ? 'asc' : 'desc'
      }
    } else if ((sorter as SorterResult<any>[]).length) {
      sorter = sorter as SorterResult<any>[]
      sorter.forEach((item) => {
        if (item.field === 'in') {
          order.inventory = item.order
            ? item.order === 'ascend'
              ? 'asc'
              : 'desc'
            : null
        }
        if (item.field === 'name') {
          order.hasSold = item.order
            ? item.order === 'ascend'
              ? 'asc'
              : 'desc'
            : null
        }
      })
    }
    onSearch({ order })
  }
  const tableStaticProps = tableStaticPropsFn({
    loading,
    onEdit,
    onSell,
    onDelete
  })
  const formProps = formPropsFn(goodsList)
  return (
    <PageList
      className='page-trade'
      search={
        <PageList.Search
          left={
            <PageList.Search.Left>
              <ZForm {...formProps} form={form}></ZForm>
            </PageList.Search.Left>
          }
          right={
            <PageList.Search.Right>
              <Button onClick={handleSearch} type='primary'>
                搜索
              </Button>
            </PageList.Search.Right>
          }
        />
      }
      table={
        <ZTable
          name='买卖'
          options={
            <Space>
              <Button onClick={onAdd} type='primary'>
                添加
              </Button>
            </Space>
          }
          expandable={{
            rowExpandable: (record) => record?.sales?.length > 0,
            expandedRowRender: (record) => (
              <List
                size='small'
                itemLayout='horizontal'
                dataSource={record.sales}
                renderItem={(item: any, index) => (
                  <>
                    <List.Item
                      actions={[
                        <Typography.Link
                          onClick={() => {
                            onEditSell(record, item)
                          }}
                        >
                          编辑
                        </Typography.Link>
                      ]}
                    >
                      <Row style={{ width: '100%' }}>
                        <Col span={8}>
                          <Space>
                            <Tag color='success'>利润</Tag>
                            <div>
                              {[
                                '每个盈利',
                                item.profit,
                                '万，利润',
                                item.profit * item.quantity,
                                '万'
                              ].join(' ')}
                            </div>
                          </Space>
                        </Col>
                        <Col span={5}>
                          <Space>
                            <Tag color='warning'>卖</Tag>
                            <div>
                              {item.price}万，{item.quantity}个
                            </div>
                          </Space>
                        </Col>
                        <Col span={5}>
                          <Space>
                            <Tag color='processing'>
                              <CalendarOutlined />
                            </Tag>
                            {formatDate(item.createdAt)}
                          </Space>
                        </Col>
                        <Col span={5}>
                          <Space>
                            <Tag color='default'>
                              <PushpinOutlined />
                            </Tag>
                            <div>{item.remark}</div>
                          </Space>
                        </Col>
                      </Row>
                    </List.Item>
                    {index === record?.sales?.length - 1 && (
                      <List.Item>
                        <Row style={{ width: '100%' }}>
                          <Col span={8}>
                            <Space>
                              <Tag color='success'>总计</Tag>
                              <div>{record.totalProfit} 万</div>
                            </Space>
                          </Col>
                        </Row>
                      </List.Item>
                    )}
                  </>
                )}
              />
            )
          }}
          onChange={onTableChange}
          {...tableStaticProps}
          {...tableProps}
        />
      }
      pagination={
        <ZPagination
          left={
            <Space>
              <Tag color='processing'>花费</Tag>
              <div>{data?.totalAmount} 万</div>
              <Tag color='success'>利润</Tag>
              <div>{data?.totalProfit} 万</div>
              <Tag color='error'>库存</Tag>
              <div>{data?.totalInventory} 万</div>
            </Space>
          }
          {...paginationProps}
        />
      }
    >
      <ModalEdit
        {...modalEditProps}
        goodsList={goodsList}
        key={modalEditProps.data?.id}
        onCancel={closeModalEdit}
        onOk={(values: any) => onEditOk(values)}
      />
      <ModalSell
        {...modalSellProps}
        key={modalSellProps.data?.buyId}
        onCancel={closeModalSell}
        onOk={(values: any) => onSellOk(values)}
      />
    </PageList>
  )
}

export default Trade
