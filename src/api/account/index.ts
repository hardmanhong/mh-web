import request from '../request'

export type TAccount = {
  id?: number
  userName: string
  server: string
}
export const getAccountList = (data?: any) => {
  return request.get('/account', data)
}

export const getAccount = (id: string) => {
  return request.get(`/account/${id}`)
}

export const createAccount = (data: TAccount): Promise<{ id: number }> => {
  return request.post('/account', data)
}

export const updateAccount = (id: number, data: TAccount) => {
  return request.put(`/account/${id}`, data)
}

export const deleteAccount = (id: number) => {
  return request.delete(`/account/${id}`)
}
