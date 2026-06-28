<script setup lang="ts">
import { theme } from '~/constans/theme'
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

const { getProjectDetail } = useProjectGet()

onMounted(async () => {
  if (props.id) {
    await getProjectDetail(props.id)
  }
})
</script>

<template>
  <BaseSection id="project-form" override="px-2 py-2 md:px-4 md:py-4">
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <BaseHeading :title="pageTitle" :description="pageDescription" />

        <BaseButton to="/management/projects" variant="filled">
          <span aria-hidden="true" class="mr-2">&larr;</span>
          Back to projects
        </BaseButton>
      </div>
    </div>

    <BaseTabs v-model="activeTab" :items="tabs">
      <template #default>
        <div :class="['p-6', theme.card.base]">
          <ProjectFormBasic v-if="activeTab === 'basic'" :id="props.id" />

          <ProjectFormCaseStudy v-else-if="activeTab === 'case-study'" :id="id" />

          <ProjectFormSettings v-else-if="activeTab === 'settings'" :id="id" />
        </div>
      </template>
    </BaseTabs>
  </BaseSection>
</template>
