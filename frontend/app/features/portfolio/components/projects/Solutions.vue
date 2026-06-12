<script setup lang="ts">
defineProps<{
  solution: string
}>()
</script>

<template>
  <BaseSection override="mx-auto max-w-5xl px-6 py-16">
    <h2 class="text-sm tracking-[0.3em] text-muted-foreground">SOLUTION</h2>

    <p class="mt-6 text-lg leading-relaxed text-foreground">
      {{ solution }}
    </p>
  </BaseSection>
</template>
