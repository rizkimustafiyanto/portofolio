<script setup lang="ts">
import { useProjects } from '~/features/portfolio/composables/useProjects'

const route = useRoute()
const router = useRouter()
const { getProjectBySlug } = useProjects()

const project = getProjectBySlug(route.params.slug as string)

const handleBack = async () => {
  if (window.history.length > 1) {
    router.back()
    return
  }

  await navigateTo('/portfolio#projects')
}

if (!project) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Project not found',
  })
}
</script>

<template>
  <main>
    <BaseSection override="mx-auto max-w-5xl px-6 pt-8">
      <BaseButton variant="text" @click="handleBack">
        <span aria-hidden="true">&larr;</span>
        Back to projects
      </BaseButton>
    </BaseSection>

    <PortfolioProjectsCaseStudy :project="project" />

    <PortfolioProjectsProblem :problem="project.case.problem" />

    <PortfolioProjectsResponsibilities :responsibilities="project.case.responsibilities" />

    <PortfolioProjectsSolutions :solution="project.case.solution" />

    <PortfolioProjectsTech :tags="project.tags" />

    <PortfolioProjectsResult :results="project.case.results" />
  </main>
</template>
