import request from '../request'

export type TTradeBuy = {
  id?: number
  buyPrice?: number
  buyQuantity?: number
  goods?: {
    id: number
  }
}
export type TTradeSell = {
  id?: number
  goodsId?: number
  tradeBuyId?: number
  sellPrice?: number
  sellQuantity?: number
}
export const getTradeBuyList = (data: any) => {
  return request.get('/trade/buy', data)
}

export const getTradeBuy = (id: string) => {
  return request.get(`/trade/buy/${id}`)
}

export const createTradeBuy = (data: TTradeBuy) => {
  return request.post('/trade/buy', data)
}

export const updateTradeBuy = (id: number, data: TTradeBuy) => {
  return request.put(`/trade/buy/${id}`, data)
}

export const deleteTradeBuy = (id: number) => {
  return request.delete(`/trade/buy/${id}`)
}

export const createTradeSell = (data: TTradeSell) => {
  return request.post('/trade/sell', data)
}

export const updateTradeSell = (id: number, data: TTradeSell) => {
  return request.put(`/trade/sell/${id}`, data)
}

export const deleteTradeSell = (id: number) => {
  return request.delete(`/trade/sell/${id}`)
}
