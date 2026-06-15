<script setup lang="ts">
import { theme } from '~/constans/theme'
import { useProjectForm } from '../../composables/useProjectForm'

const { form, errors, validate, resetForm, create } = useProjectForm()
const { loading, wrap } = useSubmitGuard()

const onSubmit = async (): Promise<void> => {
  if (!validate(form)) {
    return
  }

  await wrap(async () => {
    await create(form)
    resetForm()
  })
}
</script>

<template>
  <BaseSection id="project-create" override="px-6 py-6 md:px-8 md:py-8">
    <div class="mb-10">
      <div class="space-y-2">
        <div>
          <h3 :class="['text-lg font-semibold', theme.colors.text.primary]">Create project</h3>
          <p :class="['text-sm', theme.colors.text.muted]">
            Keep your portfolio projects organized with a single reusable form.
          </p>
        </div>
      </div>
    </div>

    <div class="grid gap-8 xl:grid-cols-12">
      <div class="space-y-6 xl:col-span-8">
        <BaseContainer>
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
              <BaseInput
                v-model="form.demoUrl"
                placeholder="myawesomeapp.com"
                :error="errors.demoUrl"
              />
            </BaseFormField>

            <div class="flex items-center justify-end gap-3">
              <BaseButton variant="text" type="button" @click="resetForm"> Reset </BaseButton>

              <BaseButton type="submit" variant="filled"> Save project </BaseButton>
            </div>
          </BaseForm>
        </BaseContainer>

        <!-- berikutnya -->
        <!-- Case Study -->
        <!-- Gallery -->
        <!-- SEO -->
        <div class="bg-red-50">s</div>
      </div>

      <!-- <div class="xl:col-span-4">
        <ManagementProjectPreview :title="project.title" :description="project.description" />
      </div> -->
    </div>
  </BaseSection>
</template>
