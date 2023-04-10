import { useCallback, useEffect, useState } from 'react'
import { message } from 'antd'

export type TUseRequest = (
  api: (params: any) => Promise<any>,
  options: {
    params: any
    manual?: boolean
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
  const [data, setData] = useState()
  const run = useCallback(
    (params?: any) => {
      setParams({
        ...options.params,
        ...params
      })
      setLoading(true)
      return api(params)
        .then((res) => {
          if (typeof options?.formatData === 'function') {
            setData(options.formatData(res))
          } else {
            setData(res)
          }
          return res
        })
        .catch((err) => {
          message.error(err.msg)
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
