import React from 'react'
import { CalendarOutlined, PushpinOutlined } from '@ant-design/icons'
import {
  Button,
  Col,
  Form,
  List,
  Row,
  Space,
  Tag,
  Typography,
  message
} from 'antd'
import { getGoodsList } from '@/api/goods'
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
import { formatDate, formatDateFieldsQuery } from '@/utils'
import ModalEdit from './ModalEdit'
import ModalSell from './ModalSell'
import { formPropsFn, tableStaticPropsFn } from './data'
import { IProps } from './types'

const Trade: React.FC<IProps> = () => {
  const [form] = Form.useForm()
  const { data, tableProps, paginationProps, onSearch } =
    usePaginated(getTradeBuyList)
  const {
    data: { list: goodsList = [] }
  } = useRequest(getGoodsList, {
    params: {
      page: 1,
      pageSize: 1000
    },
    defaultData: { list: [] }
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
  const onEditOk = (values: TTradeBuy) => {
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
  }
  const onSellOk = (values: TTradeSell) => {
    const id = modalSellProps.data?.id
    if (id) {
      updateTradeSell(id, values).then(() => {
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
      ...sell
    })
  }
  const handleSearch = () => {
    const params = formatDateFieldsQuery(form.getFieldsValue(), [
      {
        field: 'createdAt',
        fields: ['createdAtFrom', 'createdAtTo']
      }
    ])

    onSearch(params)
  }
  const tableStaticProps = tableStaticPropsFn({ onEdit, onSell, onDelete })
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
                            <Tag color='gold'>利润</Tag>
                            <div>
                              {[
                                '每个盈利',
                                item.profit,
                                '万，利润',
                                item.totalProfit,
                                '万'
                              ].join(' ')}
                            </div>
                          </Space>
                        </Col>
                        <Col span={5}>
                          <Space>
                            <Tag color='success'>卖</Tag>
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
          {...tableStaticProps}
          {...tableProps}
        />
      }
      pagination={
        <ZPagination
          left={
            <Space>
              <Tag color='processing'>总计</Tag>
              <div>{data?.totalAmount} 万</div>
              <Tag color='success'>利润</Tag>
              <div>{data?.totalProfit} 万</div>
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
        key={modalSellProps.data?.id}
        onCancel={closeModalSell}
        onOk={(values: any) => onSellOk(values)}
      />
    </PageList>
  )
}

export default Trade
