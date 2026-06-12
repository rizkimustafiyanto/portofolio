<script setup lang="ts">
import { animation } from '~/constans/animation'
import { theme } from '~/constans/theme'
import type { CreateProjectData } from '../schemas/createSchema'

const store = useAuthStore()
const submittedProjects = ref<string[]>([])

const handleProjectSubmit = (project: CreateProjectData): void => {
  submittedProjects.value = [project.name, ...submittedProjects.value].slice(0, 3)
}
</script>

<template>
  <section class="space-y-6">
    <div
      :class="[
        'rounded-xl border p-6',
        theme.colors.surface,
        'border-black/5 dark:border-white/10',
      ]"
    >
      <p
        :class="[
          'text-sm font-medium uppercase tracking-wide',
          theme.colors.text.muted,
          animation.duration.normal,
        ]"
      >
        Project dashboard
      </p>
      <h2
        :class="[
          'mt-2 text-2xl font-semibold',
          theme.colors.text.primary,
          animation.duration.normal,
        ]"
      >
        Welcome back, {{ store.user?.name ?? 'Developer' }}
      </h2>
      <p :class="['mt-2', theme.colors.text.secondary, animation.duration.normal]">
        Track project drafts, keep links tidy, and prepare updates before publishing.
      </p>
    </div>

    <div class="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <ProjectForm @submit="handleProjectSubmit" />

      <aside
        :class="[
          'space-y-4 rounded-xl border p-6',
          theme.colors.surface,
          'border-black/5 dark:border-white/10',
        ]"
      >
        <div>
          <h3 :class="['text-lg font-semibold', theme.colors.text.primary]">Recent drafts</h3>
          <p :class="['text-sm', theme.colors.text.muted]">
            These are the latest project names you saved in this session.
          </p>
        </div>

        <ul v-if="submittedProjects.length" class="space-y-2">
          <li
            v-for="projectName in submittedProjects"
            :key="projectName"
            :class="[
              'rounded-lg px-3 py-2 text-sm',
              theme.colors.surface,
              theme.colors.text.secondary,
            ]"
          >
            {{ projectName }}
          </li>
        </ul>

        <p v-else :class="['text-sm', theme.colors.text.muted]">
          No project drafts yet. Add one with the form beside this panel.
        </p>
      </aside>
    </div>
  </section>
</template>
