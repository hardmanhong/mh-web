import React from 'react'
import { Button, Form, Space } from 'antd'
import dayjs from 'dayjs'
import type { TIncomeExpenses } from '@/api/income-expenses'
import {
  createIncomeExpenses,
  deleteIncomeExpenses,
  getIncomeExpensesList,
  updateIncomeExpenses
} from '@/api/income-expenses'
import { PageList, ZForm, ZPagination, ZTable } from '@/components'
import { useModalPrpos, usePaginated } from '@/hooks'
import { useMessage } from '@/provider'
import ModalEdit from './ModalEdit'
import { formPropsFn, tableStaticPropsFn } from './data'
import { IProps } from './types'

const IncomeExpenses: React.FC<IProps> = () => {
  const message = useMessage()
  const [form] = Form.useForm()
  const { loading, tableProps, paginationProps, onSearch } = usePaginated(
    getIncomeExpensesList
  )
  const [modalEditProps, openModalEdit, closeModalEdit] =
    useModalPrpos<TIncomeExpenses>({
      type: 1,
      category: 1,
      amount: 0,
      date: dayjs()
    })

  const onAdd = () => {
    openModalEdit()
  }
  const onEdit = (record: any) => {
    openModalEdit({
      ...record,
      date: dayjs(record.date)
    })
  }
  const onDelete = (record: any) => {
    if (!record.id) return
    deleteIncomeExpenses(record.id).then(() => {
      message.success('删除成功')
      onSearch()
    })
  }
  const onOk = (values: TIncomeExpenses) => {
    const id = modalEditProps.data?.id
    if (id) {
      updateIncomeExpenses(id, values).then(() => {
        closeModalEdit()
        message.success('操作成功')
        onSearch()
      })
    } else {
      createIncomeExpenses(values).then(() => {
        closeModalEdit()
        message.success('操作成功')
        onSearch()
      })
    }
  }
  const handleSearch = () => {
    const params = form.getFieldsValue()
    if (params.date) {
      params.date = params.date.format('YYYY-MM-DD')
    }
    onSearch(params)
  }
  const tableStaticProps = tableStaticPropsFn({ loading, onEdit, onDelete })
  const formProps = formPropsFn()
  return (
    <PageList
      className='page-income-expenses'
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
          name='收支'
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

export default IncomeExpenses
