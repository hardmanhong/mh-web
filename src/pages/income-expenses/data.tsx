import { Popconfirm, Select, Space, Tag, Typography } from 'antd'
import { SelectFilter } from '@/components'
import { useTableScroll } from '@/hooks'
import { computedScroll, formatDate } from '@/utils'

export const type = [
  {
    value: 1,
    label: '收入'
  },
  {
    value: 2,
    label: '支出'
  }
]
export const category = [
  {
    value: 1,
    label: '点卡'
  },
  {
    value: 2,
    label: '金币'
  },
  {
    value: 3,
    label: '装备'
  },
  {
    value: 4,
    label: '宝宝'
  },
  {
    value: 5,
    label: '其他'
  }
]
export const formPropsFn = () => {
  const list = [
    {
      props: {
        name: 'type',
        label: '类型'
      },
      component: <Select options={type} allowClear />
    },
    {
      props: {
        name: 'category',
        label: '分类'
      },
      component: <SelectFilter mode='multiple' options={category} allowClear />
    }
  ]
  return {
    colProps: {
      span: 6
    },
    list
  }
}

export const tableStaticPropsFn = ({
  loading,
  onEdit,
  onDelete
}: {
  loading: boolean
  onEdit: (record: any) => void
  onDelete: (record: any) => void
}) => {
  const [height] = useTableScroll(loading)
  const columns: any[] = [
    {
      title: '类型',
      dataIndex: 'type',
      width: 100,
      render: (value: number) => (
        <Tag color={value === 1 ? 'success' : 'error'} bordered={false}>
          {type.find((item) => item.value === value)?.label}
        </Tag>
      )
    },
    {
      title: '日期',
      dataIndex: 'date',
      render: (value: string) => formatDate(value, 'YYYY-MM-DD')
    },
    {
      title: '分类',
      dataIndex: 'category',
      render: (value: number) =>
        category.find((item) => item.value === value)?.label
    },
    {
      title: '金额',
      dataIndex: 'amount'
    },
    {
      title: '备注',
      dataIndex: 'remark'
    },
    {
      width: 120,
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
          <Popconfirm
            title={`你确定要删除吗？`}
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
