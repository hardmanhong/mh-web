type PaginationParams = {
  page: number
  pageSize: number
}

type PaginationData<T> = {
  count: number
  list: T[]
}

export type GetList<Item = any, Params = {}, ExtraData = {}> = (
  params: PaginationParams & Params
) => Promise<PaginationData<Item> & ExtraData>
