import type { Dayjs } from 'dayjs'
import request from '../request'
import { GetList } from '../type'

export type TIncomeExpenses = {
  id?: number
  type: 1 | 2
  category: 1 | 2 | 3 | 4
  amount: number
  date: string | Dayjs
  remark?: string
}

export const getIncomeExpensesList: GetList<
  any,
  any,
  { income: number; expenses: number; surplus: number }
> = (data) => {
  return request.get('/income-expenses', data)
}

export const getIncomeExpenses = (id: string) => {
  return request.get(`/income-expenses/${id}`)
}

export const createIncomeExpenses = (
  data: TIncomeExpenses
): Promise<{ id: number }> => {
  return request.post('/income-expenses', data)
}

export const updateIncomeExpenses = (id: number, data: TIncomeExpenses) => {
  return request.put(`/income-expenses/${id}`, data)
}

export const deleteIncomeExpenses = (id: number) => {
  return request.delete(`/income-expenses/${id}`)
}
