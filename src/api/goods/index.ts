import request from '../request'

export type TGoods = {
  id?: number
  name: string
  price: number
}
export const getGoodsList = () => {
  return request.get('/goods')
}

export const getGoods = (id: string) => {
  return request.get(`/goods/${id}`)
}

export const createGoods = (data: TGoods) => {
  return request.post('/goods', data)
}

export const updateGoods = (id: number, data: TGoods) => {
  return request.put(`/goods/${id}`, data)
}

export const deleteGoods = (id: number) => {
  return request.delete(`/goods/${id}`)
}
