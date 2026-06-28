import type { ProjectPagination } from '~/types/pagination'
import type { Project } from './project'

export interface CreateResponse {
  createProject: Project
}

export interface UpdateResponse {
  updateProject: Project
}

export interface ProjectsResponse {
  projects: ProjectPagination
}

export interface ProjectResponse {
  project: Project
}
