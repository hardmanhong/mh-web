import React from 'react'
import { Button } from 'antd'
import {
  TAccount,
  createAccount,
  getAccountList,
  updateAccount
} from '@/api/account'
import { PageList, ZTable } from '@/components'
import { useModalPrpos, useRequest } from '@/hooks'
import { useMessage } from '@/provider'
import ModalEdit from './ModalEdit'
import { tableStaticPropsFn } from './data'
import { IProps } from './types'

const Account: React.FC<IProps> = () => {
  const message = useMessage()
  const { loading, data, run } = useRequest(getAccountList, {
    defaultData: { list: [] }
  })
  const [modalEditProps, openModalEdit, closeModalEdit] =
    useModalPrpos<TAccount>({
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
      updateAccount(id, values).then(() => {
        closeModalEdit()
        message.success('操作成功')
        run()
      })
    } else {
      createAccount(values).then(() => {
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
          dataSource={data.list || []}
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
