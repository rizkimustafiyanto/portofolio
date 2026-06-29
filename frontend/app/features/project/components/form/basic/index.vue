<script setup lang="ts">
import type { useProjectForm } from '~/features/project/composables/useProjectForm'

interface Props {
  projectForm: ReturnType<typeof useProjectForm>
}

const props = defineProps<Props>()

const { projectForm } = toRefs(props)
</script>

<template>
  <div class="space-y-6">
    <BaseFormField
      label="Slug"
      required
      :error="projectForm.errors.value.slug"
      helper-text="Used as the project URL. Example: my-awesome-app"
    >
      <BaseInput
        v-model="projectForm.form.slug"
        placeholder="my-awesome-app"
        :error="projectForm.errors.value.slug"
      />
    </BaseFormField>

    <BaseFormField label="Project Title" required :error="projectForm.errors.value.title">
      <BaseInput
        v-model="projectForm.form.title"
        placeholder="My Awesome App"
        :error="projectForm.errors.value.title"
      />
    </BaseFormField>

    <BaseFormField label="Description" :error="projectForm.errors.value.description">
      <BaseTextArea
        v-model="projectForm.form.description"
        placeholder="Describe what the project does..."
        :error="projectForm.errors.value.description"
      />
    </BaseFormField>
  </div>
</template>
