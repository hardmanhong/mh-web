import React from 'react'
import { Button, Form, Space } from 'antd'
import {
  CreateGoodsDto,
  goodsCreate,
  goodsFindAll,
  goodsRemove,
  goodsUpdate
} from '@/api'
import { PageList, ZForm, ZPagination, ZTable } from '@/components'
import { useModalProps, usePaginated } from '@/hooks'
import { useMessage } from '@/provider'
import ModalEdit from './ModalEdit'
import { formPropsFn, tableStaticPropsFn } from './data'
import { IProps } from './types'

const Goods: React.FC<IProps> = () => {
  const message = useMessage()
  const [form] = Form.useForm()
  const { tableProps, paginationProps, onSearch } = usePaginated(goodsFindAll)
  const [modalEditProps, openModalEdit, closeModalEdit] = useModalProps<
    CreateGoodsDto & { id?: number }
  >({
    name: '',
    minPrice: 0,
    maxPrice: 0
  })
  const onAdd = () => {
    openModalEdit({
      name: '',
      minPrice: 0,
      maxPrice: 0
    })
  }
  const onEdit = (record: any) => {
    openModalEdit({
      ...record
    })
  }
  const onDelete = (record: any) => {
    if (!record.id) return
    goodsRemove(record.id).then(() => {
      message.success('删除成功')
      onSearch()
    })
  }
  const onOk = (values: CreateGoodsDto) => {
    const id = modalEditProps.data?.id
    if (id) {
      goodsUpdate(id, values).then(() => {
        closeModalEdit()
        message.success('操作成功')
        onSearch()
      })
    } else {
      goodsCreate(values).then(() => {
        closeModalEdit()
        message.success('操作成功')
        onSearch()
      })
    }
  }
  const handleSearch = () => {
    const params = form.getFieldsValue()
    onSearch(params)
  }
  const tableStaticProps = tableStaticPropsFn({ onEdit, onDelete })
  const formProps = formPropsFn()
  return (
    <PageList
      className='page-goods'
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
          name='商品'
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
      <ModalEdit
        {...modalEditProps}
        key={modalEditProps.data?.id}
        onCancel={closeModalEdit}
        onOk={(values: any) => onOk(values)}
      />
    </PageList>
  )
}

export default Goods
