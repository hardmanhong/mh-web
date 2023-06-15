import { DatePicker, Popconfirm, Space, Tag, Tooltip, Typography } from 'antd'
import { SelectFilter } from '@/components'
import { usePaginatedScroll } from '@/hooks'
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
  const [height] = usePaginatedScroll()
  const columns: any[] = [
    {
      sorter: true,
      showSorterTooltip: {
        title: '排序已卖出'
      },
      title: '名称',
      dataIndex: 'name',
      render: (_: any, record: any) => (
        <Space direction='vertical'>
          <div>{record?.goods?.name}</div>
          <div>
            {record?.goods?.minPrice}~{record?.goods?.maxPrice}(万)
          </div>
        </Space>
      )
    },
    {
      sorter: true,
      showSorterTooltip: false,
      title: (
        <Space>
          <span>买卖</span>
          <Tag color='success'>正常</Tag>
          <Tooltip title='买入超过10个，存货超过70%'>
            <Tag color='error'>滞销</Tag>
          </Tooltip>
        </Space>
      ),
      dataIndex: 'in',
      render: (_: any, record: any) => (
        <Space direction='vertical'>
          <div>
            买入：{record.price}万/{record.quantity}个
          </div>
          <div>
            库存：
            <Tag
              // 买入超过10个，70%存货时显示红色
              color={
                record.quantity > 10
                  ? record.inventory / record.quantity > 0.7
                    ? 'error'
                    : 'success'
                  : 'success'
              }
            >
              {record.inventory}
            </Tag>
            个
          </div>
        </Space>
      )
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
      title: '备注',
      dataIndex: 'remark'
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
            disabled={record.inventory <= 0}
            onClick={() => {
              onSell(record)
            }}
          >
            卖出
          </Typography.Link>
          <Popconfirm
            title={`你确定要删除${record.name}吗？`}
            disabled={record.hasSold === 1}
            onConfirm={() => {
              onDelete(record)
            }}
          >
            <Typography.Link type='danger' disabled={record.hasSold === 1}>
              删除
            </Typography.Link>
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
