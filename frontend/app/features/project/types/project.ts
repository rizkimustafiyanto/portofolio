import type { PaginationMeta } from '~/types/pagination'

export type Project = {
  id: string
  projectName: string
  description: string
  demoUrl: string
  createdAt: string
  updatedAt: string
}

export type ActionProject = {
  projectName: string
  description: string
  demoUrl: string
}

export type GetProjects = {
  items: Project[]
  meta: PaginationMeta
}
export type ProjectFilter = {
  page: number
  limit: number
  projectName: string
}
