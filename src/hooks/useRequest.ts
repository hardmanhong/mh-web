import { useCallback, useEffect, useState } from 'react'
import { message } from 'antd'

export type TUseRequest = (
  api: (params: any) => Promise<any>,
  options: {
    params?: any
    manual?: boolean
    defaultData?: any
    formatData?: (data: any) => any
  }
) => {
  loading: boolean
  params: any
  data: any
  run: (params: any) => Promise<any>
}

const useRequest: TUseRequest = (api, options) => {
  const [loading, setLoading] = useState(false)
  const [params, setParams] = useState(options.params)
  const [data, setData] = useState(
    typeof options?.formatData === 'function'
      ? options.formatData(options.defaultData)
      : options.defaultData
  )
  const run = useCallback(
    (params?: any) => {
      const nextParams = {
        ...options.params,
        ...params
      }
      setParams(nextParams)
      setLoading(true)
      return api(nextParams)
        .then((res) => {
          if (typeof options?.formatData === 'function') {
            setData(options.formatData(res))
          } else {
            setData(res)
          }
          return res
        })
        .catch((err) => {
          if (typeof err.code === 'number' && err.message) {
            message.error(err.message)
          }
          return err
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [params]
  )
  useEffect(() => {
    if (!options.manual) {
      run()
    }
  }, [options.manual])
  return {
    loading,
    params,
    data,
    run
  }
}
export default useRequest
