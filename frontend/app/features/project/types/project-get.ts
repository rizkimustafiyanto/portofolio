import type { PaginationMeta } from '~/types/pagination'

export type Responsibility = {
  id: string
  responsibility: string
  sortOrder: number
}

export type Result = {
  id: string
  result: string
  sortOrder: number
}

export type ProjectDetail = {
  problem?: string
  solution?: string
  responsibilities?: Responsibility[]
  results?: Result[]
}

export type Project = {
  id: string
  slug: string
  title: string

  description?: string
  role?: string
  duration?: string
  demoURL?: string

  detail?: ProjectDetail

  createdAt: string
  updatedAt: string
}

export type GetProjects = {
  items: Project[]
  meta: PaginationMeta
}

export type ProjectFilter = {
  page: number
  limit: number
  search: string
}

export type ProjectPagination = {
  items: Project[]
  meta: PaginationMeta
}
