import type { ProjectPagination } from '~/types/pagination'
import type { Project } from './project'

export interface ActionResponse {
  create_project: Project
}

export interface ProjectsResponse {
  projects: ProjectPagination
}

export interface ProjectResponse {
  project: Project
}
