import type { Project } from '~/features/project/types/project'

export type PaginationMeta = {
  page: number
  limit: number
  totalData: number
  totalPage: number
  hasNext: boolean
  hasPrevious: boolean
}

export type ProjectPagination = {
  items: Project[]
  meta: PaginationMeta
}
