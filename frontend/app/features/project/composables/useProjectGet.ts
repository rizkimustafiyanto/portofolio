import { useProjectStore } from '../stores/project-store'
import { useProjectService } from '../services/project-service'
import type { ProjectFilter } from '../types/project'
import { toast } from 'vue-sonner'

type UseProjectGetReturn = {
  getProjects: (filter: ProjectFilter) => Promise<void>
  getProjectDetail: (id: string) => Promise<void>
}

export function useProjectGet(): UseProjectGetReturn {
  const projectService = useProjectService()
  const store = useProjectStore()

  const getProjects = async (filter: ProjectFilter) => {
    try {
      const res = await projectService.getProjects(filter)

      store.setProjects({
        projects: res.projects.items,
        meta: res.projects.meta,
      })
    } catch (err) {
      toast.error(extractGraphqlError(err))
      return
    }
  }

  const getProjectDetail = async (id: string) => {
    try {
      const res = await projectService.getDetail(id)

      store.setProjectDetail(res.project)
    } catch (err) {
      toast.error(extractGraphqlError(err))
      return
    }
  }

  return {
    getProjects,
    getProjectDetail,
  }
}
