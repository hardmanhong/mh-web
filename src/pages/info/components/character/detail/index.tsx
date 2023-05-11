import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, Form, Space, Spin } from 'antd'
import { getAccountList } from '@/api/account'
import { createCharacter, getCharacter, updateCharacter } from '@/api/character'
import { SelectFilter, ZForm } from '@/components'
import { useRequest } from '@/hooks'
import { useMessage } from '@/provider'
import { useTabsStore } from '@/store'
import { formPropsEquipmentFn, formPropsInfoFn, formPropsPetFn } from './data'
import { IProps } from './types'

const CharacterDetail: React.FC<IProps> = () => {
  const message = useMessage()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const params = useParams()
  const isAdd = params.id === 'add'
  const isEdit = Number(params.id) > 0

  const { loading, data, run } = useRequest(getCharacter, {
    manual: true,
    params: {
      id: params.id
    }
  })
  const { data: accountList } = useRequest(getAccountList, {
    defaultData: { list: [] }
  })
  const { setNeedReload } = useTabsStore()

  useEffect(() => {
    if (isEdit) {
      run({ id: params.id }).then((res) => {
        form.setFieldsValue(res)
      })
    }
  }, [params])
  const onSave = () => {
    form.validateFields().then((values) => {
      if (isAdd) {
        createCharacter(values).then(() => {
          message.success('创建成功')
          navigate('/info')
          setNeedReload(true)
        })
      } else if (isEdit) {
        updateCharacter(params.id as string, values).then(() => {
          message.success('编辑成功')
          navigate('/info')
          setNeedReload(true)
        })
      }
    })
  }
  const formPropsInfo = formPropsInfoFn()
  const formPropsEquipment = formPropsEquipmentFn()
  const formPropsPet = formPropsPetFn()

  return (
    <div className='page-character-detail'>
      <Spin spinning={loading}>
        <Card
          title={isAdd ? '创建角色' : '编辑角色'}
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
                        options={(accountList.list || []).map((item: any) => ({
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
            <Card title='宠物' type='inner' size='small'>
              <ZForm {...formPropsPet} form={form} />
            </Card>
          </Space>
        </Card>
      </Spin>
    </div>
  )
}

export default CharacterDetail
