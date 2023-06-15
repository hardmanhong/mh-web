import { useCallback } from 'react'
import { PaginationProps, TableProps } from 'antd'
import useRequest, { Options, ReturnResult } from './useRequest'

type PaginationReturnResult<Params, Data> = ReturnResult<Params, Data> & {
  onSearch(values?: { [key: string]: any }): void
  tableProps: Omit<TableProps<any>, 'pagination'>
  paginationProps: PaginationProps
}

type PaginationOptions<Params, Data> = Options<Params, Data> & {
  defaultPageSize?: number
}

type PaginationData<Data> = Data & {
  list: any[]
  total: number
}

type PaginationParams<Params> = Params & {
  page: number
  pageSize: number
}

function usePaginated<Params, Data>(
  api: (params: PaginationParams<Params>) => Promise<PaginationData<Data>>,
  options?: PaginationOptions<PaginationParams<Params>, PaginationData<Data>>
): PaginationReturnResult<PaginationParams<Params>, PaginationData<Data>> {
  const { defaultPageSize = 100 } = (options = { defaultPageSize: 100 })
  const { loading, data, params, run, ...ret } = useRequest(api, {
    ...options,
    params: {
      page: 1,
      pageSize: defaultPageSize
    } as any
  })
  const onChange = useCallback(
    (page: number, pageSize: number) => {
      run({
        page,
        pageSize: pageSize
      } as PaginationParams<Params>)
    },
    [run]
  )
  const onShowSizeChange = useCallback(
    (current: number, pageSize: number) => {
      run({
        page: 1,
        pageSize: pageSize
      } as PaginationParams<Params>)
    },
    [run]
  )
  const onSearch = useCallback(
    (values?: { [key: string]: any }) => {
      run({
        page: 1,
        ...values
      } as PaginationParams<Params>)
    },
    [run]
  )
  return {
    loading,
    data,
    params,
    run,
    onSearch,
    tableProps: {
      loading,
      dataSource: data?.list
    },
    paginationProps: {
      size: 'small',
      pageSizeOptions: ['50', '100', '200', '500'],
      current: params.page,
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: params.pageSize,
      total: data?.total,
      onChange,
      onShowSizeChange
    },
    ...ret
  }
}

export default usePaginated
