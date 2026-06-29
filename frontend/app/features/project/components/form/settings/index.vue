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
      label="Role"
      :error="projectForm.errors.value.role"
      helper-text="Your role in this project."
    >
      <BaseInput
        v-model="projectForm.form.role"
        placeholder="Fullstack Developer"
        :error="projectForm.errors.value.role"
      />
    </BaseFormField>

    <BaseFormField
      label="Duration"
      :error="projectForm.errors.value.duration"
      helper-text="Example: Jan 2025 - Mar 2025"
    >
      <BaseInput
        v-model="projectForm.form.duration"
        placeholder="Jan 2025 - Mar 2025"
        :error="projectForm.errors.value.duration"
      />
    </BaseFormField>

    <BaseFormField
      label="Demo URL"
      :error="projectForm.errors.value.demoURL"
      helper-text="Leave empty if there is no public demo."
    >
      <BaseInput
        v-model="projectForm.form.demoURL"
        placeholder="https://example.com"
        :error="projectForm.errors.value.demoURL"
      />
    </BaseFormField>
  </div>
</template>
