import axios, { AxiosRequestConfig } from 'axios'

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

const enhancedGet = (url: string, params?: { [key: string]: any }) =>
  request.get(url, { params })

export default {
  get: enhancedGet,
  post: request.post,
  put: request.put,
  delete: request.delete
}
