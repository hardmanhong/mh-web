import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { EVENT, eventEmitter } from '@/utils'
import router from '../router'

const request = axios.create({
  baseURL: 'http://127.0.0.1:9000/api',
  timeout: 30000
})
const addToken = (config: AxiosRequestConfig<any>) => {
  //token
  const token = window.sessionStorage.getItem('token')
  if (token && config.headers) {
    config.headers.token = token
  }
}
const handleRequest = (config: AxiosRequestConfig<any>) => {
  addToken(config)
}
const handleResponse = (response: AxiosResponse<any, any>) => {
  const { status, data, config } = response
  const { code, message: apiMessage } = data
  if (status === 200) {
    // 200 OK：表示请求已成功，服务器已成功返回所请求的数据。
    // 201 Created：表示请求已成功，服务器已创建一个新的资源。
    // 204 No Content：表示请求已成功，但服务器没有返回任何内容。
    // 206 Partial Content：表示请求已成功，但只返回了部分内容。
    if (code === 200) {
      return Promise.resolve(data?.data)
    } else {
      eventEmitter.emit(EVENT.REQUEST_ERROR, apiMessage || '操作失败')
      if (code === 401) {
        router.navigate('/login')
        window.sessionStorage.clear()
      }
      return Promise.reject(data)
    }
  } else {
    eventEmitter.emit(EVENT.REQUEST_ERROR, '网络不佳，稍后再试')
    return Promise.reject()
  }
}
const handleResponseError = (error: any) => {
  if (axios.isCancel(error)) {
    // message.warning("网络请求中，请勿重复操作");
  } else if (error.response) {
    switch (error.response.status) {
      case 404:
        eventEmitter.emit(EVENT.REQUEST_ERROR, '接口地址有误')
        break
      case 500:
        eventEmitter.emit(EVENT.REQUEST_ERROR, '服务器出错，稍后再试')
        break
      default:
        eventEmitter.emit(EVENT.REQUEST_ERROR, '网络不佳，稍后再试')
        break
    }
  } else {
    console.dir(error)
    if (error.message.includes('timeout')) {
      eventEmitter.emit(EVENT.REQUEST_ERROR, '请求超时，稍后再试')
    } else {
      eventEmitter.emit(EVENT.REQUEST_ERROR, '网络连接异常')
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

type EnhancedGet = <T = any>(
  url: string,
  params?: T,
  config?: AxiosRequestConfig
) => Promise<any>

const enhancedGet: EnhancedGet = (url, params, config) => {
  return axios.get(url, { params, ...config })
}
export default {
  get: enhancedGet,
  post: request.post,
  put: request.put,
  delete: request.delete
}
