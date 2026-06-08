<script setup lang="ts">
import type { CreateProjectData } from '../schemas/createSchema'

const store = useAuthStore()
const submittedProjects = ref<string[]>([])

const handleProjectSubmit = (project: CreateProjectData): void => {
  submittedProjects.value = [project.name, ...submittedProjects.value].slice(0, 3)
}
</script>

<template>
  <section class="space-y-6">
    <div class="rounded-xl border bg-white p-6">
      <p class="text-sm font-medium uppercase tracking-wide text-gray-500">
        Project dashboard
      </p>
      <h2 class="mt-2 text-2xl font-semibold text-gray-900">
        Welcome back, {{ store.user?.name ?? 'Developer' }}
      </h2>
      <p class="mt-2 text-gray-600">
        Track project drafts, keep links tidy, and prepare updates before publishing.
      </p>
    </div>

    <div class="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <ProjectForm @submit="handleProjectSubmit" />

      <aside class="space-y-4 rounded-xl border bg-white p-6">
        <div>
          <h3 class="text-lg font-semibold text-gray-900">Recent drafts</h3>
          <p class="text-sm text-gray-500">
            These are the latest project names you saved in this session.
          </p>
        </div>

        <ul
          v-if="submittedProjects.length"
          class="space-y-2"
        >
          <li
            v-for="projectName in submittedProjects"
            :key="projectName"
            class="rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-700"
          >
            {{ projectName }}
          </li>
        </ul>

        <p
          v-else
          class="text-sm text-gray-500"
        >
          No project drafts yet. Add one with the form beside this panel.
        </p>
      </aside>
    </div>
  </section>
</template>
