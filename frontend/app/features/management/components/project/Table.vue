<script setup lang="ts">
defineProps<{
  projects: {
    id: string
    title: string
    status: string
    updatedAt: string
  }[]
}>()
</script>

<template>
  <div class="overflow-hidden rounded-3xl border border-border">
    <table class="w-full">
      <thead>
        <tr class="border-b border-border text-left">
          <th class="p-4">ID</th>
          <th class="p-4">Project</th>
          <th class="p-4">Status</th>
          <th class="p-4">Updated</th>
          <th class="p-4">Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="project in projects" :key="project.id" class="border-b border-border">
          <td class="p-4">
            {{ project.id }}
          </td>

          <td class="p-4">
            {{ project.title }}
          </td>

          <td class="p-4">
            {{ project.status }}
          </td>

          <td class="p-4">
            {{ project.updatedAt }}
          </td>

          <td class="p-4">
            <NuxtLink :to="`/management/projects/${project.id}`"> Edit </NuxtLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
