import { Input, Popconfirm, Space, Typography } from 'antd'

export const formPropsFn = () => {
  const list = [
    {
      props: {
        name: 'name',
        label: '名称'
      },
      component: <Input allowClear />
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
  onEdit,
  onDelete
}: {
  onEdit: (record: any) => void
  onDelete: (record: any) => void
}) => {
  const columns: any[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 100
    },
    {
      title: '名称',
      dataIndex: 'name'
    },
    {
      title: '参考价(万)',
      dataIndex: 'price',
      render: (_: any, record: any) =>
        [record.minPrice, record.maxPrice].filter(Boolean).join('~')
    },
    {
      width: 100,
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
    columns
  }
}
