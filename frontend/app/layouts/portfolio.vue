<script setup lang="ts">
import { useThemeClasses } from '~/features/welcome/composables/useThemeClasses'

const { page } = useThemeClasses()
const route = useRoute()
const isProjectDetailPage = computed(() => route.path.startsWith('/portfolio/projects/'))
</script>

<template>
  <div :class="['min-h-screen transition-colors duration-300', page]">
    <UiPortfolio />
    <slot />

    <CommonScrollIndicator v-if="!isProjectDetailPage" mode="next" target-selector="section[id]" />
    <CommonScrollIndicator mode="top" label="Top" />
  </div>
</template>
