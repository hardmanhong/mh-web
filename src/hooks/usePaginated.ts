import { useCallback } from 'react'
import useRequest from './useRequest'

type TUsePaginated = (
  api: (params: any) => Promise<any>,
  options?: {
    params: any
    manual?: boolean
    formatData?: (data: any) => any
  }
) => {
  loading: boolean
  params: any
  data: any
  tableProps: {
    loading: boolean
    dataSource: any[]
  }
  paginationProps: {
    current: number
    pageSize: number
    total: number
    pageSizeOptions: string[]
    onChange(page: number, pageSize?: number): void
    onShowSizeChange(current: number, pageSize: number): void
  }
  run: (params: any) => Promise<any>
  onSearch(values?: { [key: string]: any }): void
}

const usePaginated: TUsePaginated = (api, options) => {
  const { loading, params, data, run } = useRequest(api, {
    ...options,
    params: {
      ...options?.params,
      page: 1,
      pageSize: 50
    }
  })

  const onChange = useCallback(
    (page: number, pageSize: number) => {
      run({
        page,
        pageSize: pageSize
      })
    },
    [run]
  )
  const onShowSizeChange = useCallback(
    (current: number, pageSize: number) => {
      run({
        page: 1,
        pageSize: pageSize
      })
    },
    [run]
  )
  const onSearch = useCallback(
    (values?: { [key: string]: any }) => {
      run({
        page: 1,
        ...values
      })
    },
    [run]
  )
  const tableProps = {
    loading,
    dataSource: data?.list
  }
  const paginationProps = {
    current: params.page,
    pageSize: params.pageSize,
    total: data?.total,
    pageSizeOptions: ['50', '100', '200', '500'],
    onChange,
    onShowSizeChange
  }
  return {
    loading,
    params,
    data,
    tableProps,
    paginationProps,
    run,
    onSearch
  }
}
export default usePaginated
