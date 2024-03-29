import { Space, Typography } from 'antd'

export const tableStaticPropsFn = ({
  onEdit
}: {
  onEdit: (record: any) => void
}) => {
  const columns: any[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 100
    },
    {
      title: '账号',
      dataIndex: 'name'
    },
    {
      title: '服务器',
      dataIndex: 'server'
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
        </Space>
      )
    }
  ]

  return {
    rowKey: 'id',
    columns
  }
}
