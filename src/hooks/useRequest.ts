import { useCallback, useEffect, useState } from 'react'
import useResponse from './useResponse'

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
  run: (params?: any) => Promise<any>
}

const useRequest: TUseRequest = (api, options) => {
  const [loading, setLoading] = useState(false)
  const [params, setParams] = useState(options.params)
  const [data, setData] = useState(
    typeof options?.formatData === 'function'
      ? options.formatData(options.defaultData)
      : options.defaultData
  )
  const [handleSuccess, handleError] = useResponse()
  const run = useCallback(
    (nParams?: any) => {
      const nextParams = {
        ...options.params,
        ...params,
        ...nParams
      }
      setParams(nextParams)
      setLoading(true)
      return api(nextParams)
        .then((res) => handleSuccess(res))
        .catch((err) => handleError(err))
        .then((res) => {
          if (typeof options?.formatData === 'function') {
            setData(options.formatData(res))
          } else {
            setData(res)
          }
          return res
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
