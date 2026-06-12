<script setup lang="ts">
import type { Project } from '../../types/projects'

defineProps<{
  project: Project
}>()
</script>

<template>
  <BaseSection override="mx-auto max-w-5xl px-6 py-24">
    <div class="text-sm tracking-[0.3em] text-muted-foreground">CASE STUDY</div>

    <h1 class="mt-6 text-5xl font-light md:text-7xl">
      {{ project.title }}
    </h1>

    <p class="mt-6 text-xl leading-relaxed text-muted-foreground">
      {{ project.description }}
    </p>

    <div class="mt-10 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
      <span class="text-foreground">{{ project.role }}</span>
      <span aria-hidden="true">•</span>
      <span>{{ project.duration }}</span>
    </div>
  </BaseSection>
</template>
