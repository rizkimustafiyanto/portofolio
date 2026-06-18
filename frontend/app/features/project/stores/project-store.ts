import type { PaginationMeta } from '~/types/pagination'
import type { Project } from '../types/project'

export const useProjectStore = defineStore('project', {
  state: () => ({
    projects: [] as Project[],
    meta: {
      page: 1,
      limit: 10,
      totalData: 0,
      totalPage: 1,
      hasNext: false,
      hasPrevious: false,
    } as PaginationMeta,
    projectDetail: undefined as Project | undefined,
  }),
  actions: {
    setProjects(data: { projects: Project[]; meta: PaginationMeta }) {
      this.projects = data.projects
      this.meta = data.meta
    },
    setProjectDetail(data: { project: Project }) {
      this.projectDetail = data.project
    },
  },
})
