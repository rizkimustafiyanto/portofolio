<script lang="ts" setup>
import type { ProjectGallery } from '../../types/project'

defineProps<{
  gallery?: ProjectGallery[]
}>()
</script>

<template>
  <BaseSection override="mx-auto max-w-5xl px-6 py-16">
    <div v-for="item in gallery" :key="item.image_url" class="mb-24">
      <img :src="item.image_url" :alt="item.title" class="w-full rounded-3xl border shadow-sm" />

      <h3 class="mt-6 text-2xl font-light">
        {{ item.title }}
      </h3>

      <p class="mt-2 text-muted-foreground">
        {{ item.description }}
      </p>
    </div>
  </BaseSection>
</template>
