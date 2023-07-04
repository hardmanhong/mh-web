import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Button,
  Card,
  Col,
  Form,
  FormInstance,
  Row,
  Space,
  Spin,
  Typography
} from 'antd'
import { uniqueId } from 'lodash-es'
import { getAccountList } from '@/api/account'
import { createCharacter, getCharacter, updateCharacter } from '@/api/character'
import { SelectFilter, ZForm } from '@/components'
import { useRequest } from '@/hooks'
import { useMessage } from '@/provider'
import { useTabsStore } from '@/store'
import { formPropsEquipmentFn, formPropsInfoFn, formPropsPetFn } from './data'
import { IPet, IProps } from './types'

const Pet = ({ form, index }: { form: FormInstance; index: number }) => {
  const formPropsPet = formPropsPetFn(index)
  return <ZForm {...formPropsPet} form={form} />
}

const CharacterDetail: React.FC<IProps> = () => {
  const message = useMessage()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const params = useParams()
  const isEdit = Number(params.id) > 0

  const { loading, data, run } = useRequest(getCharacter, {
    manual: true,
    params: {
      id: params.id as string
    }
  })
  const { data: accountList } = useRequest(getAccountList, {
    defaultData: []
  })
  const { setNeedReload } = useTabsStore()
  const [pets, setPets] = useState<IPet[]>([])

  useEffect(() => {
    if (isEdit && params.id) {
      run({ id: params.id }).then((res) => {
        if (Array.isArray(res.pets)) {
          setPets(res.pets.map(() => ({ uid: uniqueId() })))
        }
        form.setFieldsValue(res)
      })
    }
  }, [params])
  const onSave = () => {
    form.validateFields().then(() => {
      const values = form.getFieldsValue(true)
      if (isEdit) {
        updateCharacter(params.id as string, values).then(() => {
          message.success('编辑成功')
          navigate('/info')
          setNeedReload(true)
        })
      } else {
        createCharacter(values).then(() => {
          message.success('创建成功')
          navigate('/info')
          setNeedReload(true)
        })
      }
    })
  }
  const onAddPet = () => {
    const fPets = form.getFieldValue('pets') || []
    fPets.push({})
    form.setFieldsValue({
      data: [...fPets]
    })
    const pet = { _uid: uniqueId() }
    setPets((l) => [...l, pet])
  }
  const onDeletePet = (record: IPet, index: number) => {
    const nList = pets.filter((item) => item._uid !== record._uid)
    const fPets = form.getFieldValue('pets')
    form.setFieldsValue({
      pets: (fPets || []).filter((_: any, i: number) => i !== index)
    })
    setPets(nList)
  }
  const formPropsInfo = formPropsInfoFn()
  const formPropsEquipment = formPropsEquipmentFn()

  return (
    <div className='page-character-detail'>
      <Spin spinning={loading}>
        <Card
          title={isEdit ? '编辑角色' : '创建角色'}
          extra={
            <Button type='primary' onClick={onSave}>
              保存
            </Button>
          }
        >
          <Space direction='vertical'>
            {isEdit ? (
              <>
                <Form.Item style={{ margin: 0 }} label='账号'>
                  {data?.account?.name}
                </Form.Item>
                <Form.Item style={{ margin: 0 }} label='服务器'>
                  {data?.account?.server}
                </Form.Item>
              </>
            ) : (
              <ZForm
                form={form}
                type='detail'
                list={[
                  {
                    colProps: { span: 8 },
                    props: {
                      name: 'accountId',
                      label: '账号',
                      rules: [
                        {
                          required: true,
                          message: '请选择账号'
                        }
                      ]
                    },
                    component: (
                      <SelectFilter
                        options={(accountList || []).map((item: any) => ({
                          value: item.id,
                          label: [item.name, item.server].join(' ')
                        }))}
                      />
                    )
                  }
                ]}
              />
            )}
            <Card title='信息' type='inner' size='small'>
              <ZForm {...formPropsInfo} form={form} />
            </Card>
            <Card title='装备' type='inner' size='small'>
              <ZForm {...formPropsEquipment} form={form} />
            </Card>
            <Card
              title='宠物'
              type='inner'
              size='small'
              extra={
                <a target='#' onClick={onAddPet}>
                  添加
                </a>
              }
            >
              <Row gutter={[16, 16]}>
                {pets.map((pet, index) => (
                  <Col key={pet._uid} span={12}>
                    <Card
                      type='inner'
                      size='small'
                      extra={
                        <Typography.Link
                          type='danger'
                          onClick={() => {
                            onDeletePet(pet, index)
                          }}
                        >
                          删除
                        </Typography.Link>
                      }
                    >
                      <Pet form={form} index={index} />
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
          </Space>
        </Card>
      </Spin>
    </div>
  )
}

export default CharacterDetail
