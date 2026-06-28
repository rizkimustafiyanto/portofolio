import { toast } from 'vue-sonner'

import { createProjectSchema, type FormProjectData } from '../schemas/create-schema'
import { useProjectStore } from '../stores/project-store'
import { useProjectService } from '../services/project-service'
import type { ActionProject } from '../types/project'

type UseProjectFormReturn = {
  form: FormProjectData
  errors: Ref<Record<string, string>>
  validate: (data: FormProjectData) => boolean
  resetForm: () => void
  save: (payload: ActionProject, id?: string) => Promise<void>
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

  const save = async (payload: ActionProject, id?: string): Promise<void> => {
    try {
      if (id) {
        const res = await projectService.update(id, payload)

        store.upsertProject(res.updateProject)
        store.fillForm(res.updateProject)
      } else {
        const res = await projectService.create(payload)

        store.upsertProject(res.createProject)
        store.fillForm(res.createProject)
      }
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
