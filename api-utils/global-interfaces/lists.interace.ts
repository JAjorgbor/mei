export interface IList<T> {
  meta: IMeta
  summary: ISummary
  items: T[]
}

export interface IMeta {
  skip: number
  limit: number
  returned: number
  total: number
  hasMore: boolean
}
export interface ISummary {
  totalItems: number
  returnedItems: number
}
