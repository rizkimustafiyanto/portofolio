<script setup lang="ts">
import { theme } from '~/constans/theme'
import { useProjectForm } from '../../composables/useProjectForm'
import { useProjectGet } from '../../composables/useProjectGet'

interface Props {
  mode?: 'create' | 'edit'
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'create',
  id: undefined,
})

const activeTab = ref('basic')

const tabs = [
  {
    value: 'basic',
    label: 'Basic',
  },
  {
    value: 'case-study',
    label: 'Case Study',
  },
  {
    value: 'settings',
    label: 'Settings',
  },
]

const pageTitle = computed(() => (props.mode === 'edit' ? 'Edit project' : 'Create project'))

const pageDescription = computed(() =>
  props.mode === 'edit'
    ? 'Update and manage your portfolio project.'
    : 'Keep your portfolio projects organized with a single reusable form.',
)

const projectForm = useProjectForm()

const { loading, wrap } = useSubmitGuard()

const { getProjectDetail } = useProjectGet()

const onSubmit = async () => {
  if (!projectForm.validate(projectForm.form)) {
    return
  }

  await wrap(async () => {
    if (props.id) {
      await projectForm.save(props.id)
      return
    }

    await projectForm.save()
    projectForm.resetForm()
  })
}

onMounted(async () => {
  if (!props.id) {
    return
  }

  await getProjectDetail(props.id)
})
</script>

<template>
  <BaseSection id="project-form" override="px-2 py-2 md:px-4 md:py-4">
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <BaseHeading :title="pageTitle" :description="pageDescription" />

        <BaseButton to="/management/projects" variant="filled">
          <span class="mr-2">&larr;</span>
          Back to projects
        </BaseButton>
      </div>
    </div>

    <BaseForm as="form" :loading="loading" @submit="onSubmit">
      <BaseTabs v-model="activeTab" :items="tabs">
        <template #default>
          <div :class="['space-y-6 p-6', theme.card.base]">
            <ProjectFormBasic v-if="activeTab === 'basic'" :project-form="projectForm" />

            <ProjectFormCaseStudy
              v-else-if="activeTab === 'case-study'"
              :project-form="projectForm"
            />

            <ProjectFormSettings v-else-if="activeTab === 'settings'" :project-form="projectForm" />
          </div>
        </template>
      </BaseTabs>

      <div class="mt-6 flex justify-end gap-3">
        <BaseButton variant="text" type="button" @click="projectForm.resetForm"> Reset </BaseButton>

        <BaseButton variant="filled" type="submit">
          {{ props.mode === 'edit' ? 'Update Project' : 'Save Project' }}
        </BaseButton>
      </div>
    </BaseForm>
  </BaseSection>
</template>
