import { useGraphqlClient } from '~/services/graphql'
import type { ProjectFilter } from '../types/project-get'
import type {
  CreateResponse,
  ProjectResponse,
  ProjectsResponse,
  UpdateResponse,
} from '../types/graphql-types'
import { CREATE_MUTATION, DELETE_MUTATION, PROJECT_ID_QUERY, PROJECTS_QUERY } from '../graphql'
import { UPDATE_MUTATION } from '../graphql/mutation/update'
import type { ActionProject } from '../types/project-action'

export const useProjectService = () => {
  const client = useGraphqlClient()

  return {
    create(payload: ActionProject) {
      return client.request<CreateResponse>(CREATE_MUTATION, {
        input: payload,
      })
    },

    update(id: string, payload: ActionProject) {
      return client.request<UpdateResponse>(UPDATE_MUTATION, {
        id: id,
        input: payload,
      })
    },

    delete(id: string) {
      return client.request<boolean>(DELETE_MUTATION, {
        id: id,
      })
    },

    getProjects(filter: ProjectFilter) {
      return client.request<ProjectsResponse>(PROJECTS_QUERY, {
        filter: filter,
      })
    },

    getDetail(id: string) {
      return client.request<ProjectResponse>(PROJECT_ID_QUERY, {
        id: id,
      })
    },
  }
}
