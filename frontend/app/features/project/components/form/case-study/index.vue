<script setup lang="ts">
import type { useProjectForm } from '~/features/project/composables/useProjectForm'

interface Props {
  projectForm: ReturnType<typeof useProjectForm>
}

const props = defineProps<Props>()

const { projectForm } = toRefs(props)

const addResponsibility = () => {
  projectForm.value.form.detail.responsibilities.push({
    responsibility: '',
    sortOrder: 0,
  })
}

const removeResponsibility = (index: number) => {
  projectForm.value.form.detail.responsibilities.splice(index, 1)
}

const addResult = () => {
  projectForm.value.form.detail.results.push({
    result: '',
    sortOrder: 0,
  })
}

const removeResult = (index: number) => {
  projectForm.value.form.detail.results.splice(index, 1)
}
</script>

<template>
  <div class="space-y-8">
    <BaseFormField label="Problem" :error="projectForm.errors.value['detail.problem']">
      <BaseTextArea
        v-model="projectForm.form.detail.problem"
        placeholder="Describe the problem this project solves..."
      />
    </BaseFormField>

    <BaseFormField label="Solution" :error="projectForm.errors.value['detail.solution']">
      <BaseTextArea
        v-model="projectForm.form.detail.solution"
        placeholder="Explain your solution..."
      />
    </BaseFormField>

    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <BaseText>Responsibilities</BaseText>

        <BaseButton type="button" size="sm" variant="text" @click="addResponsibility">
          + Add
        </BaseButton>
      </div>

      <div
        v-for="(item, index) in projectForm.form.detail.responsibilities"
        :key="index"
        class="flex gap-2"
      >
        <BaseInput v-model="item.responsibility" placeholder="Frontend Development" />

        <BaseButton type="button" tone="danger" variant="text" @click="removeResponsibility(index)">
          Remove
        </BaseButton>
      </div>
    </div>

    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <BaseText>Results</BaseText>

        <BaseButton type="button" size="sm" variant="text" @click="addResult"> + Add </BaseButton>
      </div>

      <div v-for="(item, index) in projectForm.form.detail.results" :key="index" class="flex gap-2">
        <BaseInput v-model="item.result" placeholder="Reduced loading time by 40%" />

        <BaseButton type="button" tone="danger" variant="text" @click="removeResult(index)">
          Remove
        </BaseButton>
      </div>
    </div>
  </div>
</template>
