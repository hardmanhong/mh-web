import request from '../request'

export type TGoods = {
  id?: number
  name: string
  minPrice: number
  maxPrice: number
}
export const getGoodsList = (data?: any) => {
  return request.get('/goods', data)
}

export const getGoods = (id: string) => {
  return request.get(`/goods/${id}`)
}

export const createGoods = (data: TGoods): Promise<{ id: number }> => {
  return request.post('/goods', data)
}

export const updateGoods = (id: number, data: TGoods) => {
  return request.put(`/goods/${id}`, data)
}

export const deleteGoods = (id: number) => {
  return request.delete(`/goods/${id}`)
}
