import { projects } from '../constants/projects'

export const useProjects = () => {
  const allProjects = computed(() => projects)

  const getProjectBySlug = (slug: string) => {
    return projects.find((p) => p.slug === slug)
  }

  const getProjectById = (id: string) => {
    return projects.find((p) => p.id === id)
  }

  return {
    allProjects,
    getProjectBySlug,
    getProjectById,
  }
}
