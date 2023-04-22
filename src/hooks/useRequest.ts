import { useCallback, useEffect, useState } from 'react'

export type TUseRequest = (
  api: (params: any) => Promise<any>,
  options?: {
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
  const [params, setParams] = useState(options?.params)
  const [data, setData] = useState(
    typeof options?.formatData === 'function'
      ? options?.formatData(options?.defaultData)
      : options?.defaultData
  )
  const run = useCallback(
    (nparams?: any) => {
      const nextParams = {
        ...options?.params,
        ...params,
        ...nparams
      }
      setParams(nextParams)
      setLoading(true)
      return api(nextParams)
        .then((res) => {
          if (typeof options?.formatData === 'function') {
            setData(options?.formatData(res))
          } else {
            setData(res)
          }
          return res
        })
        .catch((err) => {
          return Promise.reject(err)
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [params]
  )
  useEffect(() => {
    if (!options?.manual) {
      run()
    }
  }, [options?.manual])
  return {
    loading,
    params,
    data,
    run
  }
}
export default useRequest
