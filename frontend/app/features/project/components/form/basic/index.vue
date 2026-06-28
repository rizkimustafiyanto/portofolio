<script setup lang="ts">
import { useProjectForm } from '~/features/project/composables/useProjectForm'

interface Props {
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  id: undefined,
})

const { form, errors, validate, resetForm, save } = useProjectForm()

const { loading, wrap } = useSubmitGuard()

const onSubmit = async (): Promise<void> => {
  if (!validate(form)) {
    return
  }

  await wrap(async () => {
    if (props.id) {
      await save(form, props.id)
      return
    }

    await save(form)
    resetForm()
  })
}
</script>

<template>
  <div class="space-y-6 xl:col-span-8">
    <BaseForm as="form" class="text-left" :loading="loading" @submit="onSubmit">
      <BaseFormField label="Project name" required :error="errors.projectName">
        <BaseInput
          v-model="form.projectName"
          placeholder="My Awesome App"
          :error="errors.projectName"
        />
      </BaseFormField>

      <BaseFormField label="Description" required :error="errors.description">
        <BaseTextArea
          v-model="form.description"
          placeholder="Describe what the project does..."
          :error="errors.description"
        />
      </BaseFormField>

      <BaseFormField
        label="Project link"
        required
        :error="errors.demoUrl"
        helper-text="You can paste a full URL or just a domain."
      >
        <BaseInput v-model="form.demoUrl" placeholder="myawesomeapp.com" :error="errors.demoUrl" />
      </BaseFormField>

      <div class="flex items-center justify-end gap-3">
        <BaseButton variant="text" type="button" @click="resetForm"> Reset </BaseButton>

        <BaseButton type="submit" variant="filled"> Save project </BaseButton>
      </div>
    </BaseForm>
  </div>
</template>
