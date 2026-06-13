import { reactive } from 'vue'
import type { Ref } from 'vue'
import { createProjectSchema, type CreateProjectData } from '../schemas/create-schema'

type UseProjectFormReturn = {
  form: CreateProjectData
  errors: Ref<Record<string, string>>
  validate: (data: CreateProjectData) => boolean
  resetForm: () => void
  getPayload: () => CreateProjectData
}

export function useProjectForm(): UseProjectFormReturn {
  const form = reactive<CreateProjectData>({
    name: '',
    description: '',
    link: '',
  })

  const { errors, validate, clearErrors } = useZodForm(createProjectSchema)

  const resetForm = (): void => {
    form.name = ''
    form.description = ''
    form.link = ''
    clearErrors()
  }

  const getPayload = (): CreateProjectData => ({
    name: form.name.trim(),
    description: form.description.trim(),
    link: ensureHttpProtocol(form.link),
  })

  return {
    form,
    errors,
    validate,
    resetForm,
    getPayload,
  }
}
