import request from '../request'

export const getBusinessList = (params: any) => {
  return request.get('/business')
}
