<script setup lang="ts">
import { useTheme } from './features/welcome/composables/useTheme'

useHead({
  htmlAttrs: {
    lang: 'en',
  },
})

const { colorMode, initTheme } = useTheme()
const route = useRoute()
const isProjectDetailPage = computed(() => route.path.startsWith('/portfolio/projects/'))

useHead(() => ({
  htmlAttrs: {
    class: colorMode.value,
  },
  meta: [
    {
      name: 'color-scheme',
      content: colorMode.value,
    },
  ],
}))

onMounted(() => {
  initTheme()
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <CommonScrollIndicator v-if="!isProjectDetailPage" mode="next" />
  <CommonScrollIndicator mode="top" label="Top" />

  <ClientOnly>
    <Toaster position="top-right" rich-colors close-button expand />
    <BaseLoadingOverlay />
  </ClientOnly>
</template>
