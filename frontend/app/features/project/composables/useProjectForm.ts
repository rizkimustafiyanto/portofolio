import { toast } from 'vue-sonner'

import { createProjectSchema } from '../schemas/create-schema'
import { useProjectStore } from '../stores/project-store'
import { useProjectService } from '../services/project-service'
import type { ActionProject } from '../types/project-action'

type UseProjectFormReturn = {
  form: ActionProject
  errors: Ref<Record<string, string>>
  validate: (data: ActionProject) => boolean
  resetForm: () => void
  save: (id?: string) => Promise<void>
  delete: (id: string) => Promise<void>
}

export function useProjectForm(): UseProjectFormReturn {
  const projectService = useProjectService()
  const store = useProjectStore()

  const form = store.form

  const { errors, validate, clearErrors } = useZodForm(createProjectSchema)

  const resetForm = (): void => {
    store.resetForm()
    clearErrors()
  }

  const save = async (id?: string): Promise<void> => {
    try {
      const project = id
        ? (await projectService.update(id, form)).updateProject
        : (await projectService.create(form)).createProject

      store.upsertProject(project)
      store.fillForm(project)

      toast.success(id ? 'Project Updated' : 'Project Created')
    } catch (err) {
      toast.error(extractGraphqlError(err))
    }
  }

  const deleteProject = async (id: string): Promise<void> => {
    try {
      await projectService.delete(id)

      store.removeProject(id)

      toast.success('Project Deleted')
    } catch (err) {
      toast.error(extractGraphqlError(err))
    }
  }

  return {
    form,
    errors,
    validate,
    resetForm,
    save,
    delete: deleteProject,
  }
}
