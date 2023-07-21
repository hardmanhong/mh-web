import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Card,
  Col,
  Empty,
  Popconfirm,
  Row,
  Space,
  Spin,
  Typography
} from 'antd'
import { CharacterDto, characterFindAll, characterRemove } from '@/api'
import { useRequest } from '@/hooks'
import { useMessage } from '@/provider'
import { Equipment, Info, Pet } from './data'
import { IProps } from './types'

const tabList = [
  {
    key: 'info',
    tab: '信息'
  },
  {
    key: 'equipment',
    tab: '装备'
  },
  {
    key: 'pet',
    tab: '宠物'
  }
]
const CardItem = ({
  data,
  onEdit,
  onDelete
}: {
  data: any
  onEdit: () => void
  onDelete: () => void
}) => {
  const [activeTabKey, setActiveTabKey] = useState<string>(tabList[0].key)
  const onTabChange = (key: string) => {
    setActiveTabKey(key)
  }

  const content: Record<string, React.ReactNode> = {
    info: (
      <Info
        server={data?.account?.server}
        molding={data.molding}
        sect={data.sect}
        level={data.level}
        remark={data.remark}
      />
    ),
    equipment: <Equipment {...data?.equipment} />,
    pet: <Pet pets={data?.pets || []} />
  }
  return (
    <Card
      size='small'
      style={{ width: '100%' }}
      title={
        <Space>
          <span>{data?.name}</span>
          <span>{data?.account?.name}</span>
        </Space>
      }
      extra={
        <Space>
          <Typography.Link onClick={onEdit}>编辑</Typography.Link>
          <Popconfirm
            title='提示'
            description={`你确定要删除角色【${data?.name}】吗？`}
            onConfirm={onDelete}
          >
            <Typography.Link type='danger'>删除</Typography.Link>
          </Popconfirm>
        </Space>
      }
      tabList={tabList}
      activeTabKey={activeTabKey}
      onTabChange={onTabChange}
    >
      {content[activeTabKey]}
    </Card>
  )
}
const Character: React.FC<IProps> = () => {
  const navigate = useNavigate()
  const message = useMessage()
  const { loading, data, run } = useRequest(characterFindAll, {
    defaultData: []
  })

  const onAdd = () => {
    navigate('/info/character')
  }
  const onEdit = (record: any) => {
    navigate(`/info/character/${record.id}`)
  }
  const onDelete = (record: any) => {
    characterRemove(record.id).then(() => {
      message.success('删除成功')
      run()
    })
  }

  return (
    <Spin spinning={loading}>
      <Card
        title='角色'
        extra={
          <Button type='primary' onClick={onAdd}>
            添加
          </Button>
        }
      >
        {data.length > 0 ? (
          <Row gutter={[16, 16]}>
            {((data || []) as CharacterDto[]).map((item) => (
              <Col key={item.id} span={12}>
                <CardItem
                  data={item}
                  onEdit={() => {
                    onEdit(item)
                  }}
                  onDelete={() => {
                    onDelete(item)
                  }}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <Empty />
        )}
      </Card>
    </Spin>
  )
}

export default Character
