import type { PaginationMeta } from './pagination'

export type ApiResponse<T> = {
  data: T
  message: string
  success: boolean
  meta: PaginationMeta
}

export type ApiErrorResponse = {
  message: string
  success: boolean
  statusCode: number
}
