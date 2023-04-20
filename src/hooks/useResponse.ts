import { useCallback } from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import { useMessage } from '@/provider'

const useResponse = (): [
  (response: AxiosResponse<any, any>) => Promise<any>,
  (response: AxiosError<any, any>) => void
] => {
  const message = useMessage()

  const handleSuccess = useCallback((response: AxiosResponse<any, any>) => {
    const { status, data } = response
    if (status === 200) {
      // 200 OK：表示请求已成功，服务器已成功返回所请求的数据。
      // 201 Created：表示请求已成功，服务器已创建一个新的资源。
      // 204 No Content：表示请求已成功，但服务器没有返回任何内容。
      // 206 Partial Content：表示请求已成功，但只返回了部分内容。
      const { code, message: apiMessage } = data
      if (code === 200) {
        return Promise.resolve(data?.data)
      } else {
        message.error(apiMessage || '操作失败')
        return Promise.reject(data)
      }
    } else {
      return Promise.reject()
    }
  }, [])

  const handleError = useCallback((error: AxiosError<any, any>) => {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          message.error('接口地址有误')
          break
        case 500:
          message.error('服务器出错，稍后再试')
          break
        default:
          message.warning('网络不佳，稍后再试')
          break
      }
    } else {
      if (error.message.includes('timeout')) {
        message.error('请求超时，稍后再试')
      } else {
        message.error('网络连接异常')
      }
    }
  }, [])
  return [handleSuccess, handleError]
}

export default useResponse
