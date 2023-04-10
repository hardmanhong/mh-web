import { message } from 'antd'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const request = axios.create({
  baseURL: 'http://127.0.0.1:9000/api',
  timeout: 30000
})
const pending: { [key: string]: any } = {}
const CancelToken = axios.CancelToken
const addToken = (config: AxiosRequestConfig<any>) => {
  //token
  const token = window.sessionStorage.getItem('token')
  if (token && config.headers) {
    config.headers.token = token
  }
}
const addPending = (config: AxiosRequestConfig<any>) => {
  const { url, method, data } = config
  const completeUrl = [url, method, JSON.stringify(data)].join('-')
  config.cancelToken = new CancelToken((cancel) => {
    if (!pending[completeUrl]) {
      pending[completeUrl] = cancel
    }
  })
}
const removePending = (config: AxiosRequestConfig<any>) => {
  const { url, method, data } = config
  const completeUrl = [url, method, JSON.stringify(data)].join('-')
  if (pending[completeUrl]) {
    pending[completeUrl]('取消请求')
    delete pending[completeUrl]
  }
}
const handleRequest = (config: AxiosRequestConfig<any>) => {
  addToken(config)
  if (config.headers) {
    removePending(config)
    addPending(config)
  }
}
const handleResponse = (response: AxiosResponse<any, any>) => {
  const { status, data, config } = response
  const { code, message } = data
  if (status === 200) {
    if (code === 200) {
      return Promise.resolve(data?.data)
    } else {
      if (config.headers && config.headers.catchCode) {
        return Promise.resolve(data)
      } else {
        message.error(message || '操作失败')
        return Promise.reject(data)
      }
    }
  } else {
    message.error('网络不佳，稍后再试')
    return Promise.reject()
  }
}
const handleResponseError = (error: any) => {
  if (axios.isCancel(error)) {
    // message.warning("网络请求中，请勿重复操作");
  } else if (error.response) {
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
    console.dir(error)
    if (error.message.includes('timeout')) {
      message.error('请求超时，稍后再试')
    } else {
      message.error('网络连接异常')
    }
  }
}
// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    handleRequest(config)
    return config
  },
  function (error) {
    // 对请求错误做些什么
    console.log('请求错误', error)
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return handleResponse(response)
  },
  (error) => {
    // 对响应错误做点什么
    console.dir('响应错误', error)
    handleResponseError(error)
    return Promise.reject(error)
  }
)
export const cancelRequest = () => {
  Object.keys(pending).forEach((item) => pending[item]())
}
const enhancedGet = (url: string, params?: { [key: string]: any }) =>
  request.get(url, { params })

export default {
  get: enhancedGet,
  post: request.post,
  put: request.put,
  delete: request.delete
}
