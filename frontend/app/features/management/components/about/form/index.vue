<script setup lang="ts">
import { theme } from '~/constans'

const project = reactive({
  title: 'AMMS Dashboard',
  slug: 'amms-dashboard',
  role: 'Fullstack Developer',
  duration: '2023 - 2024',
  status: 'Published',
})
</script>

<template>
  <BaseContainer>
    <div class="space-y-2">
      <h2 :class="['text-2xl font-normal leading-tight md:text-4xl', theme.colors.text.primary]">
        Overview
      </h2>

      <p class="max-w-2xl text-sm leading-normal text-slate-600 dark:text-slate-300">
        Basic information displayed on portofolio and case study papges.
      </p>
    </div>

    <BaseFormField label="Title">
      <BaseInput v-model="project.title" />
    </BaseFormField>

    <BaseFormField label="Slug">
      <BaseInput v-model="project.slug" />
    </BaseFormField>

    <BaseFormField label="Role">
      <BaseInput v-model="project.role" />
    </BaseFormField>

    <BaseFormField label="Duration">
      <BaseInput v-model="project.duration" />
    </BaseFormField>
  </BaseContainer>
</template>
