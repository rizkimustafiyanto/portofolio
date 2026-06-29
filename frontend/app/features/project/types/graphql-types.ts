import type { Project, ProjectPagination } from './project-get'

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
