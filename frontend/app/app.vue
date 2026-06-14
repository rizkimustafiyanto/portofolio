<script setup lang="ts">
import { useTheme } from './features/welcome/composables/useTheme'

useHead({
  htmlAttrs: {
    lang: 'en',
  },
})

const { colorMode, initTheme } = useTheme()

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

  <ClientOnly>
    <Toaster position="top-right" rich-colors close-button expand />
    <BaseLoadingOverlay />
  </ClientOnly>
</template>
