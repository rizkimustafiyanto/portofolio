import { reactive } from 'vue'
import type { Ref } from 'vue'
import { createProjectSchema, type CreateProjectData } from '../schemas/create-schema'
import { useProjectStore } from '../stores/project-store'
import { useProjectService } from '../services/project-service'
import type { ActionProject } from '../types/project'
import { toast } from 'vue-sonner'

type UseProjectFormReturn = {
  form: CreateProjectData
  errors: Ref<Record<string, string>>
  validate: (data: CreateProjectData) => boolean
  resetForm: () => void
  create: (payload: ActionProject) => Promise<void>
}

export function useProjectForm(): UseProjectFormReturn {
  const projectService = useProjectService()
  const store = useProjectStore()

  const form = reactive<CreateProjectData>({
    projectName: '',
    description: '',
    demoUrl: '',
  })

  const { errors, validate, clearErrors } = useZodForm(createProjectSchema)

  const resetForm = (): void => {
    form.projectName = ''
    form.description = ''
    form.demoUrl = ''
    clearErrors()
  }

  const create = async (payload: ActionProject) => {
    try {
      const res = await projectService.create(payload)

      store.projectDetail = res.create_project
      store.getAll({ project: res.create_project })

      toast.success('Project Created')
    } catch (err) {
      toast.error(extractGraphqlError(err))
      return
    }
  }

  return {
    form,
    errors,
    validate,
    resetForm,
    create,
  }
}
