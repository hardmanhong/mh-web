import React from 'react'
import { Button } from 'antd'
import { AccountDto, accountCreate, accountFindAll, accountUpdate } from '@/api'
import { PageList, ZTable } from '@/components'
import { useModalProps, useRequest } from '@/hooks'
import { useMessage } from '@/provider'
import ModalEdit from './ModalEdit'
import { tableStaticPropsFn } from './data'
import { IProps } from './types'

const Account: React.FC<IProps> = () => {
  const message = useMessage()
  const { loading, data, run } = useRequest(accountFindAll, {
    defaultData: []
  })
  const [modalEditProps, openModalEdit, closeModalEdit] = useModalProps<
    Partial<AccountDto> & { userName: string }
  >({
    userName: '',
    server: ''
  })

  const onAdd = () => {
    openModalEdit({
      userName: '',
      server: ''
    })
  }
  const onEdit = (record: any) => {
    openModalEdit({
      ...record
    })
  }
  const onEditOk = (values: any) => {
    const id = modalEditProps.data?.id
    if (id) {
      accountUpdate(id, values).then(() => {
        closeModalEdit()
        message.success('操作成功')
        run()
      })
    } else {
      accountCreate(values).then(() => {
        closeModalEdit()
        message.success('操作成功')
        run()
      })
    }
  }
  const tableStaticProps = tableStaticPropsFn({ loading, onEdit })
  return (
    <PageList
      table={
        <ZTable
          name='账号'
          options={
            <Button onClick={onAdd} type='primary'>
              添加
            </Button>
          }
          {...tableStaticProps}
          loading={loading}
          dataSource={data || []}
        />
      }
    >
      <ModalEdit
        {...modalEditProps}
        key={modalEditProps.data?.id}
        onCancel={closeModalEdit}
        onOk={(values: any) => onEditOk(values)}
      />
    </PageList>
  )
}

export default Account
