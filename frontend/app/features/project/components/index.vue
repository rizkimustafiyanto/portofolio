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
  <BaseSection id="management-project-create" override="px-6 py-6 md:px-8 md:py-8">
    <div class="mb-10">
      <BaseHeading title="Create project" description="Add a new portfolio project" />
    </div>

    <div class="grid gap-8 xl:grid-cols-12">
      <div class="space-y-6 xl:col-span-8">
        <BaseContainer>
          <div class="space-y-2">
            <h2
              :class="['text-4xl font-normal leading-tight md:text-6xl', theme.colors.text.primary]"
            >
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

        <!-- berikutnya -->
        <!-- Case Study -->
        <!-- Gallery -->
        <!-- SEO -->
      </div>

      <!-- <div class="xl:col-span-4">
        <ManagementProjectPreview :title="project.title" :description="project.description" />
      </div> -->
    </div>
  </BaseSection>
</template>
