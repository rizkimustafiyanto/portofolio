<script setup lang="ts">
import { theme } from '~/constans';

const route = useRoute()

const pageTitle = computed(() => {
  const currentPage = (route.meta?.title ||
    route.name?.toString()?.replaceAll('-', ' ') ||
    'Dashboard') as string

  return toTitleCase(currentPage)
})
</script>

<template>
  <header :class="['sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur', theme.colors.border]">
    <div class="flex h-16 items-center justify-between px-6">
      <div class="min-w-0">
        <h1 class="truncate text-lg font-semibold">
          {{ pageTitle }}
        </h1>
      </div>

      <div class="flex items-center gap-3">
        <CommonGlobalSearch />

        <BaseIconButton size="sm">
          <Icon name="lucide:bell" class="h-4 w-4" />
        </BaseIconButton>
      </div>
    </div>
  </header>
</template>
