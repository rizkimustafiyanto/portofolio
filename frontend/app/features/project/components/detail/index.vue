<script setup lang="ts">
const activeTab = ref('overview')
</script>

<template>
  <BaseSection id="management-project-detail" override="px-6 py-6 md:px-8 md:py-8">
    <div class="mb-10">
      <h1 class="text-3xl font-light">AMMS Dashboard</h1>

      <p class="mt-2 text-muted-foreground">Manage project content.</p>
    </div>

    <div class="grid gap-6 lg:grid-cols-[260px_1fr]">
      <ManagementProjectTabs :active="activeTab" />

      <div>
        <ManagementProjectOverviewPanel />
      </div>
    </div>
  </BaseSection>
</template>
