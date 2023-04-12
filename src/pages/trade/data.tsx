import { DatePicker, Popconfirm, Space, Typography } from 'antd'
import { SelectFilter } from '@/components'
import { useTableScroll } from '@/hooks'
import { computedScroll, formatDate } from '@/utils'

const { RangePicker } = DatePicker
export const formPropsFn = (goodsList: any[]) => {
  const list = [
    {
      props: {
        name: 'goodsIds',
        label: '商品'
      },
      component: (
        <SelectFilter
          mode='multiple'
          options={goodsList.map((item: any) => ({
            value: item.id,
            label: item.name
          }))}
        />
      )
    },
    {
      props: {
        name: 'createdAt',
        label: '创建时间'
      },
      component: <RangePicker />
    }
  ]
  return {
    colProps: {
      span: 8
    },
    list
  }
}

export const tableStaticPropsFn = ({
  onEdit,
  onSell,
  onDelete
}: {
  onEdit: (record: any) => void
  onSell: (record: any) => void
  onDelete: (record: any) => void
}) => {
  const [height, computedHeight] = useTableScroll()
  const columns: any[] = [
    {
      title: '名称',
      dataIndex: 'name',
      render: (_: any, record: any) => (
        <Space direction='vertical'>
          <div>名称：{record?.goods?.name}</div>
          <div>
            参考价：{record?.goods?.minPrice}~{record?.goods?.maxPrice}(万)
          </div>
        </Space>
      )
    },
    {
      title: '买卖',
      dataIndex: 'in',
      render: (_: any, record: any) => (
        <Space direction='vertical'>
          <div>
            买入：{record.buyPrice}万/{record.buyQuantity}个
          </div>
          <div>库存：{record.stock}个</div>
        </Space>
      )
    },
    {
      title: '备注',
      dataIndex: 'remark'
    },
    {
      width: 160,
      title: '创建时间',
      dataIndex: 'createdAt',
      render: (value: string) => formatDate(value)
    },
    {
      width: 160,
      title: '更新时间',
      dataIndex: 'updatedAt',
      render: (value: string) => formatDate(value)
    },
    {
      width: 140,
      title: '操作',
      key: 'operation',
      dataIndex: 'operation',
      fixed: 'right',
      render: (_: string, record: any) => (
        <Space>
          <Typography.Link
            onClick={() => {
              onEdit(record)
            }}
          >
            编辑
          </Typography.Link>
          <Typography.Link
            onClick={() => {
              onSell(record)
            }}
          >
            卖出
          </Typography.Link>
          <Popconfirm
            title={`你确定要删除${record.name}吗？`}
            onConfirm={() => {
              onDelete(record)
            }}
          >
            <Typography.Link type='danger'>删除</Typography.Link>
          </Popconfirm>
        </Space>
      )
    }
  ]

  return {
    rowKey: 'id',
    columns,
    scroll: computedScroll(columns, 200, height)
  }
}
