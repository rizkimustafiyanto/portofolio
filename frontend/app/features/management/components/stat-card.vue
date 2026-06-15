<script setup lang="ts">
defineProps<{
  title: string
  value: string | number
}>()
</script>

<template>
  <div class="rounded-3xl border border-border bg-card p-6">
    <p class="text-sm text-muted-foreground">
      {{ title }}
    </p>

    <h3 class="mt-3 text-3xl font-light">
      {{ value }}
    </h3>
  </div>
</template>
