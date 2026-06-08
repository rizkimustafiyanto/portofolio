import { ref } from 'vue'
import type { Ref } from 'vue'
import type { ZodType } from 'zod'

export function useZodForm<T extends Record<string, unknown>>(
  schema: ZodType<T>,
): {
  errors: Ref<Record<string, string>>
  validate: (data: T) => boolean
  clearErrors: () => void
} {
  const errors = ref<Record<string, string>>({})

  const clearErrors = (): void => {
    errors.value = {}
  }

  const validate = (data: T): boolean => {
    clearErrors()

    const result = schema.safeParse(data)

    if (result.success) {
      return true
    }

    const fieldErrors = result.error.flatten().fieldErrors

    const nextErrors: Record<string, string> = {}

    Object.entries(fieldErrors).forEach(([key, value]) => {
      nextErrors[key] = value?.[0] ?? ''
    })

    errors.value = nextErrors

    return false
  }

  return {
    errors,
    validate,
    clearErrors,
  }
}
