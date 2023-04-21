import request from '../request'

export const getStatistics = (data: { type: string }) => {
  return request.get('/statistics', data)
}
export const getStatisticsTotalProfit = () => {
  return request.get(`/statistics/totalProfit`)
}
