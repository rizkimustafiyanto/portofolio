<script setup lang="ts">
import { useProjectForm } from '../composables/useProjectForm'
import type { CreateProjectData } from '../schemas/createSchema'

const emit = defineEmits<{
  submit: [payload: CreateProjectData]
}>()

const { form, errors, validate, resetForm, getPayload } = useProjectForm()

const onSubmit = (): void => {
  if (!validate(form)) {
    return
  }

  emit('submit', getPayload())
  resetForm()
}
</script>

<template>
  <form
    class="space-y-4 rounded-xl border bg-white p-6"
    @submit.prevent="onSubmit"
  >
    <div>
      <h3 class="text-lg font-semibold text-gray-900">Create project</h3>
      <p class="text-sm text-gray-500">
        Keep your portfolio projects organized with a single reusable form.
      </p>
    </div>

    <BaseInput
      v-model="form.name"
      label="Project name"
      placeholder="My Awesome App"
      required
      :error="errors.name"
    />

    <BaseTextArea
      v-model="form.description"
      label="Description"
      placeholder="Describe what the project does..."
      required
      :error="errors.description"
    />

    <BaseInput
      v-model="form.link"
      label="Project link"
      placeholder="myawesomeapp.com"
      required
      :error="errors.link"
      helper-text="You can paste a full URL or just a domain."
    />

    <div class="flex items-center justify-end gap-3">
      <button
        type="button"
        class="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700"
        @click="resetForm"
      >
        Reset
      </button>

      <button
        type="submit"
        class="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white"
      >
        Save project
      </button>
    </div>
  </form>
</template>
