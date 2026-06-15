<script setup lang="ts">
import { useProjects } from '~/features/portfolio/composables/useProjects'

const route = useRoute()
const { getProjectBySlug } = useProjects()

const project = getProjectBySlug(route.params.slug as string)

if (!project) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Project not found',
  })
}
</script>

<template>
  <main class="space-y-0">
    <PortfolioProjectsGallery v-if="project.gallery" :gallery="project.gallery" />
    <PortfolioProjectsCaseStudy v-if="project" :project="project" />
    <PortfolioProjectsProblem v-if="project.case.problem" :problem="project.case.problem" />

    <PortfolioProjectsResponsibilities
      v-if="project.case.responsibilities"
      :responsibilities="project.case.responsibilities"
    />

    <PortfolioProjectsSolutions :solution="project.case.solution" />

    <PortfolioProjectsTech :tags="project.tags" />

    <PortfolioProjectsResult :results="project.case.results" />
  </main>
</template>
