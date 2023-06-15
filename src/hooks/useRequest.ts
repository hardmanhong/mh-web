import { useCallback, useEffect, useState } from 'react'
import { message } from 'antd'

type FormatResult<Data, Res> = (res: Data) => Res

export type Options<Params, Data> = {
  params?: Params
  defaultData?: Data
  manual?: boolean
  isShowError?: boolean
  formatData?: FormatResult<Data, any>
  onSuccess?: (res: Data) => void
}

export type ReturnResult<Params, Data> = {
  loading: boolean
  params: Params
  data: Data
  run(params?: Params): Promise<Data>
  setData: React.Dispatch<React.SetStateAction<Data>>
}

export type ReturnResultFormat<Params, Data, Res> = Omit<
  ReturnResult<Params, Data>,
  'data' | 'setData'
> & {
  data: Res
  setData: React.Dispatch<React.SetStateAction<Res>>
}
type FnReturn<Params, Data, T> = T extends {
  formatData: (data: Data) => infer Res
}
  ? ReturnResultFormat<Params, Data, Res>
  : ReturnResult<Params, Data>

function useRequest<Params, Data, T extends Options<Params, Data>>(
  api: (params: Params) => Promise<Data>,
  options: T
): FnReturn<Params, Data, T> {
  const {
    params: initialParams = {},
    defaultData,
    manual = false,
    isShowError = true,
    formatData,
    onSuccess
  } = options

  const [loading, setLoading] = useState(false)
  const [params, setParams] = useState(initialParams)
  const [data, setData] = useState<Data>(defaultData as Data)

  const request = useCallback(
    (queryParams?: Params) => {
      setLoading(true)
      setParams((prevParams) => ({ ...prevParams, ...queryParams }))

      return api({ ...initialParams, ...params, ...queryParams } as Params)
        .then((res) => {
          if (typeof onSuccess === 'function') {
            onSuccess(res)
          }
          return res
        })
        .catch((err) => {
          if (typeof isShowError === 'undefined' || isShowError) {
            message.error(err.errMsg)
          }
          return err
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [initialParams, params, api, formatData, onSuccess, isShowError]
  )

  useEffect(() => {
    if (!manual) {
      request()
    }
  }, [manual, request])

  return {
    loading,
    params,
    data: typeof formatData === 'function' ? formatData(data) : data,
    run: request,
    setData
  } as FnReturn<Params, Data, T>
}

export default useRequest
