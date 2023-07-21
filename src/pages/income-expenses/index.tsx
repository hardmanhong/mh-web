import React from 'react'
import { Button, Form, Space, Tag } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import {
  IncomeExpensesDto,
  incomeExpensesCreate,
  incomeExpensesFindAll,
  incomeExpensesRemove,
  incomeExpensesUpdate
} from '@/api'
import { PageList, ZForm, ZPagination, ZTable } from '@/components'
import { useModalPrpos, usePaginated } from '@/hooks'
import { useMessage } from '@/provider'
import ModalEdit from './ModalEdit'
import { formPropsFn, tableStaticPropsFn } from './data'
import { IProps } from './types'

const IncomeExpenses: React.FC<IProps> = () => {
  const message = useMessage()
  const [form] = Form.useForm()
  const { loading, data, tableProps, paginationProps, onSearch } = usePaginated(
    incomeExpensesFindAll
  )
  const [modalEditProps, openModalEdit, closeModalEdit] = useModalPrpos<
    Omit<IncomeExpensesDto, 'id' | 'date' | 'remark'> & {
      id?: number
      date: Dayjs
    }
  >({
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
    incomeExpensesRemove(record.id).then(() => {
      message.success('删除成功')
      onSearch()
    })
  }
  const onOk = (values: IncomeExpensesDto) => {
    const id = modalEditProps.data?.id
    if (id) {
      incomeExpensesUpdate(id, values).then(() => {
        closeModalEdit()
        message.success('操作成功')
        onSearch()
      })
    } else {
      incomeExpensesCreate(values).then(() => {
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
      pagination={
        <ZPagination
          {...paginationProps}
          left={
            <Space>
              <Tag color='success' bordered={false}>
                收入
              </Tag>
              <div>{data?.income || 0}</div>
              <Tag color='error' bordered={false}>
                支出
              </Tag>
              <div>{data?.expenses || 0}</div>
              <Tag color='processing' bordered={false}>
                结余
              </Tag>
              <div>{data?.surplus || 0}</div>
            </Space>
          }
        />
      }
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
