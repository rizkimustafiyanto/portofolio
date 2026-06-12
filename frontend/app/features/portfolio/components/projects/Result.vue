<script setup lang="ts">
defineProps<{
  results: string[]
}>()
</script>

<template>
  <BaseSection override="mx-auto max-w-5xl px-6 py-16">
    <h2 class="text-sm tracking-[0.3em] text-muted-foreground">RESULT</h2>

    <ul class="mt-6 space-y-3">
      <li v-for="item in results" :key="item" class="flex gap-3 text-foreground">
        <span aria-hidden="true">•</span>
        <span>{{ item }}</span>
      </li>
    </ul>
  </BaseSection>
</template>
