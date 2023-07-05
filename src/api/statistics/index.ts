import request from '../request'

export const getStatistics = (): Promise<{
  totalProfit: string
  totalInventory: string
}> => {
  return request.get('/statistics')
}

export const getBusiness = (data: { type: string }) => {
  return request.get('/statistics/business', data)
}

export const getInventory = () => {
  return request.get('/statistics/inventory')
}
