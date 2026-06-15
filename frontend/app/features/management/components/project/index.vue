<template>
  <BaseSection id="management-projects" override="px-6 py-6 md:px-8 md:py-8">
    <div>
      <div class="mb-8 flex items-center justify-between">
        <BaseHeading title="Project" description="Manage your portfolio content" />

        <NuxtLink
          to="/management/projects/create"
          class="rounded-2xl border border-border px-5 py-3"
        >
          + New Project
        </NuxtLink>
      </div>

      <!-- <ManagementProjectTable
        :projects="projects"
      /> -->
    </div>
  </BaseSection>
</template>
