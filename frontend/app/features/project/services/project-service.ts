import { useGraphqlClient } from '~/services/graphql'
import type { ActionProject, ProjectFilter } from '../types/project'
import type { ActionResponse, ProjectResponse, ProjectsResponse } from '../types/graphql-types'
import { CREATE_MUTATION, PROJECT_ID_QUERY, PROJECTS_QUERY } from '../graphql'
import { UPDATE_MUTATION } from '../graphql/mutation/update'

export const useProjectService = () => {
  const client = useGraphqlClient()

  return {
    create(payload: ActionProject) {
      return client.request<ActionResponse>(CREATE_MUTATION, {
        input: payload,
      })
    },

    udpate(id: string, payload: ActionProject) {
      return client.request<ActionResponse>(UPDATE_MUTATION, {
        id: id,
        input: payload,
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
