import { Descriptions, Space } from 'antd'

export const Info = (props: { [key: string]: any }) => {
  const items = [
    {
      label: '服务器',
      field: 'server'
    },
    {
      label: '造型',
      field: 'molding'
    },
    {
      label: '门派',
      field: 'sect'
    },
    {
      label: '等级',
      field: 'level'
    },
    {
      label: '备注',
      field: 'remark',
      span: 2
    }
  ]
  return (
    <Descriptions bordered size='small' column={2}>
      {items.map((item) => (
        <Descriptions.Item key={item.field} label={item.label}>
          {props[item.field] || ''}
        </Descriptions.Item>
      ))}
    </Descriptions>
  )
}

export const Equipment = (props: { [key: string]: any }) => {
  const items = [
    {
      label: '武器',
      field: 'arms'
    },
    {
      label: '头盔',
      field: 'helmet'
    },
    {
      label: '项链',
      field: 'necklace'
    },
    {
      label: '衣服',
      field: 'clothes'
    },
    {
      label: '腰带',
      field: 'belt'
    },
    {
      label: '鞋子',
      field: 'shoe'
    },
    {
      label: '戒指',
      field: 'ring'
    },
    {
      label: '手镯',
      field: 'bracelet'
    },
    {
      label: '耳饰',
      field: 'earring'
    },
    {
      label: '佩饰',
      field: 'trimming'
    },
    {
      label: '备注',
      field: 'remark',
      span: 2
    }
  ]
  return (
    <Descriptions bordered column={2} size='small'>
      {items.map((item) => (
        <Descriptions.Item key={item.field} label={item.label}>
          {props[item.field] || ''}
        </Descriptions.Item>
      ))}
    </Descriptions>
  )
}
export const Pet = ({ pets }: { pets: any[] }) => {
  const items = [
    {
      label: '名称',
      field: 'name'
    },
    {
      label: '价格',
      field: 'price'
    },
    {
      label: '等级',
      field: 'level'
    },
    {
      label: '备注',
      field: 'remark',
      span: 2
    }
  ]
  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      {pets.map((pet) => (
        <Descriptions key={pet.id} bordered size='small' column={2}>
          {items.map((item) => (
            <Descriptions.Item
              key={item.field}
              label={item.label}
              labelStyle={{ width: 100 }}
              contentStyle={{ width: 100 }}
            >
              {pet[item.field] || ''}
            </Descriptions.Item>
          ))}
        </Descriptions>
      ))}
    </Space>
  )
}
