import { Space, Typography } from 'antd'
import { useTableScroll } from '@/hooks'
import { computedScroll } from '@/utils'

export const tableStaticPropsFn = ({
  loading,
  onEdit
}: {
  loading: boolean
  onEdit: (record: any) => void
}) => {
  const [height] = useTableScroll(loading)
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
    columns,
    scroll: computedScroll(columns, 200, height)
  }
}
