<script setup lang="ts">
import type { TableColumn } from '~/components/base/Table.vue'
import { theme } from '~/constans'
import { useProjectGet } from '~/features/project/composables/useProjectGet'
import { useProjectStore } from '~/features/project/stores/project-store'
import type { Project, ProjectFilter } from '~/features/project/types/project'

const columns: TableColumn<Project>[] = [
  {
    key: 'projectName',
    label: 'Project',
  },
  {
    key: 'description',
    label: 'Description',
  },
  {
    key: 'demoUrl',
    label: 'Demo URL',
  },
  {
    key: 'createdAt',
    label: 'Created At',
  },
  {
    key: 'action',
    label: 'Action'
  }
]

const { getProjects } = useProjectGet()
const store = useProjectStore()

const projects = computed(() => store.projects)
const meta = computed(() => store.meta)

const filter = reactive<ProjectFilter>({
  page: 1,
  limit: 10,
  projectName: '',
})

const fetchData = async () => {
  await getProjects({
    ...filter,
  })
}

const handleSearch = async () => {
  filter.page = 1

  await fetchData()
}

const handlePageChange = async (page: number) => {
  filter.page = page

  await fetchData()
}

const handleLimitChange = async (limit: number) => {
  filter.limit = limit
  filter.page = 1

  await fetchData()
}

onMounted(async () => {
  await fetchData()
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-4 md:flex-row items-center">
      <BaseInput
        v-model="filter.projectName"
        size="sm"
        placeholder="Cari project..."
        class="flex-1"
        @keyup.enter="handleSearch"
      />

      <BaseButton size="sm" @click="handleSearch">
        <Icon name="lucide:search" class="h-4 w-4" />
      </BaseButton>
    </div>

    <BaseTable
      :items="projects"
      :columns="columns"
      row-key="id"
      :loading="false"
      empty-text="Project tidak ditemukan."
    >
      <template #cell-demoUrl="{ value }">
        <a :href="String(value)" target="_blank" class="text-primary hover:underline"> Demo </a>
      </template>

      <template #cell-createdAt="{ value }">
        {{ new Date(String(value)).toLocaleDateString('id-ID') }}
      </template>
    </BaseTable>

    <BasePagination
      :meta="meta"
      :hide-if-single-page="false"
      :show-info="true"
      class="w-full"
      @change-page="handlePageChange"
      @change-limit="handleLimitChange"
    />
  </div>
</template>
