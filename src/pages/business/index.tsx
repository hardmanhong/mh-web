import React from 'react'
import { Button, Form, Space } from 'antd'
import { getBusinessList } from '@/api/business'
import { PageList, ZForm, ZPagination, ZTable } from '@/components'
import { useModalPrpos, usePaginated } from '@/hooks'
import ModalEdit from './ModalEdit'
import { formPropsFn, tableStaticPropsFn } from './data'
import { IProps } from './types'

const business: React.FC<IProps> = () => {
  const [form] = Form.useForm()
  const { tableProps, paginationProps, params, run, onSearch } =
    usePaginated(getBusinessList)
  const [modalEditProps, openModalEdit, closeModalEdit] = useModalPrpos<{}>({})

  const onAdd = () => {
    openModalEdit({})
  }
  const onEdit = (record: any) => {
    openModalEdit({
      ...record
    })
  }
  const onOk = () => {
    run({
      ...params?.[0],
      current: 1,
      pageSize: 10
    })
  }
  const handleSearch = () => {
    const params = form.getFieldsValue()
    onSearch(params)
  }
  const tableStaticProps = tableStaticPropsFn({ onEdit })
  const formProps = formPropsFn()
  return (
    <PageList
      className='page-business'
      search={
        <PageList.Search
          left={
            <PageList.Search.Left>
              <ZForm {...formProps} form={form}></ZForm>
            </PageList.Search.Left>
          }
          right={
            <PageList.Search.Right>
              <Button onClick={handleSearch} type='primary'>
                搜索
              </Button>
            </PageList.Search.Right>
          }
        />
      }
      table={
        <ZTable
          name='买卖'
          options={
            <Space>
              <Button onClick={onAdd} type='primary'>
                添加
              </Button>
            </Space>
          }
          {...tableStaticProps}
          {...tableProps}
        />
      }
      pagination={<ZPagination {...paginationProps} />}
    >
      <ModalEdit {...modalEditProps} onCancel={closeModalEdit} onOk={onOk} />
    </PageList>
  )
}

export default business
