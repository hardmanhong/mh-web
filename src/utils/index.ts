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
