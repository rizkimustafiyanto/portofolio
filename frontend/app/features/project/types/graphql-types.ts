import type { PaginationMeta } from '~/types/pagination'
import type { Project } from './project'

export interface ActionResponse {
  create_project: Project
}

export interface ProjectsResponse {
  projects: PaginationMeta
}

export interface ProjectResponse {
  project: Project
}
