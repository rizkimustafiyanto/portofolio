<script setup lang="ts">
defineProps<{
  tags: string[]
}>()
</script>

<template>
  <BaseSection override="mx-auto max-w-5xl px-6 py-16">
    <h2 class="text-sm tracking-[0.3em] text-muted-foreground">TECHNICAL HIGHLIGHTS</h2>

    <div class="mt-6 flex flex-wrap gap-3">
      <BaseBadge v-for="tag in tags" :key="tag" class="rounded-full px-4 py-2 text-sm">
        {{ tag }}
      </BaseBadge>
    </div>
  </BaseSection>
</template>
