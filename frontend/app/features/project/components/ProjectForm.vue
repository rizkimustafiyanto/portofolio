<script setup lang="ts">
import { theme } from '~/constans/theme'
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
    :class="[
      'space-y-4 rounded-xl border p-6',
      theme.colors.surface,
      'border-black/5 dark:border-white/10',
    ]"
    @submit.prevent="onSubmit"
  >
    <div>
      <h3 :class="['text-lg font-semibold', theme.colors.text.primary]">Create project</h3>
      <p :class="['text-sm', theme.colors.text.muted]">
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
      <BaseButton variant="text" type="button" @click="resetForm"> Reset </BaseButton>

      <BaseButton type="submit" variant="filled"> Save project </BaseButton>
    </div>
  </form>
</template>
