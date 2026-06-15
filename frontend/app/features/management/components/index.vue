<script setup lang="ts">
const stats = [
  {
    title: 'Projects',
    value: 3,
  },
  {
    title: 'Case Studies',
    value: 2,
  },
  {
    title: 'Experience',
    value: 4,
  },
  {
    title: 'Tech Stack',
    value: 12,
  },
]
</script>

<template>
  <BaseSection id="management-dashboard" override="px-4 py-4 md:px-4 md:py-4">
    <div class="space-y-10">
      <div class="mx-auto mb-10">
        <BaseHeading title="Dashboard" description="Manage yout portfolio content" />
      </div>

      <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <ManagementStatCard
          v-for="item in stats"
          :key="item.title"
          :title="item.title"
          :value="item.value"
        />
      </div>

      <div class="mt-10 rounded-3xl border border-border p-6">
        <h3 class="text-lg font-medium">Recent Activity</h3>

        <div class="mt-6 space-y-4">
          <div>Updated Laboratory Revamp</div>

          <div>Added new project screenshots</div>

          <div>Updated resume file</div>
        </div>
      </div>
    </div>
  </BaseSection>
</template>
