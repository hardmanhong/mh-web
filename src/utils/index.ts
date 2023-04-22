import dayjs from 'dayjs'

export const computedScroll = (
  columns: {
    [key: string]: any
    width: number | string
  }[] = [],
  x = 300,
  y?: number | string
) => {
  const scroll = {
    x:
      (
        columns.filter((i) => !isNaN(i.width as number)) as {
          [key: string]: any
          width: number
        }[]
      )
        .map((i) => i.width)
        .reduce((acc, cur) => acc + cur, 0) + x,
    y
  }
  return scroll
}

export const exportExcel = (name: string, data: Blob) => {
  const blob = data
  let link = document.createElement('a')
  link.href = URL.createObjectURL(
    new Blob([blob], { type: 'application/vnd.ms-excel' })
  )
  link.download = name
  document.body.appendChild(link)
  link.click()
  URL.revokeObjectURL(link.href)
}

export const formatDate = (date: string, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (!date) return date
  return dayjs(date).format(format)
}
interface IFormatField {
  field: string
  fields: [string, string]
  format?: string
}
interface IHandleDateField {
  (data: { [key: string]: any }, fields: IFormatField[]): { [key: string]: any }
}
export const formatDateFieldsQuery: IHandleDateField = (data, fields) => {
  const values = { ...data }
  fields.forEach((item) => {
    const { field, fields, format = 'YYYY-MM-DD' } = item
    const [startField, endField] = fields

    if (
      Array.isArray(values[field]) &&
      typeof values[field][0].format === 'function'
    ) {
      const [startValue, endValue] = values[field]
      values[startField] = startValue.format(format)
      values[endField] = endValue.format(format)
      delete values[field]
    } else {
      values[startField] = ''
      values[endField] = ''
    }
  })
  return values
}

export { EVENT, default as eventEmitter } from './EventEmitter'
