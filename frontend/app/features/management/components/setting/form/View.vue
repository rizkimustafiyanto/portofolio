<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div class="sticky top-24 rounded-3xl border border-border p-6">
    <div class="aspect-video rounded-2xl bg-muted" />

    <h3 class="mt-6 text-2xl font-light">
      {{ title || 'Project Title' }}
    </h3>

    <p class="mt-3 text-muted-foreground">
      {{ description || 'Project description preview' }}
    </p>
  </div>
</template>
