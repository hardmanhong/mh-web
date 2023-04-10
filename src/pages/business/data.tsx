import { Button, Input } from 'antd'
import { useTableScroll } from '@/hooks'
import { computedScroll } from '@/utils'

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
  onEdit
}: {
  onEdit: (record: any) => void
}) => {
  const [height, computedHeight] = useTableScroll()
  const columns: any[] = [
    {
      title: '名称',
      dataIndex: 'name',
      fixed: 'left'
    },
    {
      title: '买入',
      dataIndex: 'in',
      fixed: 'left'
    },
    {
      title: '卖出',
      dataIndex: 'out',
      fixed: 'left'
    },
    {
      width: 120,
      title: '操作',
      key: 'operation',
      dataIndex: 'operation',
      fixed: 'right',
      render: (_: string, record: any) => (
        <Button
          type='link'
          onClick={() => {
            onEdit(record)
          }}
        >
          编辑
        </Button>
      )
    }
  ]

  return {
    rowKey: 'id',
    columns,
    scroll: computedScroll(columns, 200, height)
  }
}
