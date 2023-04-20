import { TGoods } from '../goods'
import request from '../request'

export type TTradeBuy = {
  id?: number
  price?: number
  quantity?: number
  goods?: {
    id: number
  }
  _goodsType?: 1 | 2
}
export type TTradeSell = {
  id?: number
  goodsId?: number
  goods?: TGoods
  buyId?: number
  price?: number
  quantity?: number
}
export const getTradeBuyList = (data: any) => {
  return request.get('/buy', data)
}

export const getTradeBuy = (id: string) => {
  return request.get(`/buy/${id}`)
}

export const createTradeBuy = (data: TTradeBuy) => {
  return request.post('/buy', data)
}

export const updateTradeBuy = (id: number, data: TTradeBuy) => {
  return request.put(`/buy/${id}`, data)
}

export const deleteTradeBuy = (id: number) => {
  return request.delete(`/buy/${id}`)
}

export const getProfit = (data: { type: string }) => {
  return request.get('/buy/profit', data)
}
export const getTotalProfit = () => {
  return request.get(`/buy/totalProfit`)
}

export const createTradeSell = (data: TTradeSell) => {
  return request.post('/sell', data)
}

export const updateTradeSell = (id: number, data: TTradeSell) => {
  return request.put(`/sell/${id}`, data)
}

export const deleteTradeSell = (id: number) => {
  return request.delete(`/sell/${id}`)
}
