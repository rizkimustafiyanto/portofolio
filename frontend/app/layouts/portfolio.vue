<script setup lang="ts">
import { theme } from '~/constans'

const route = useRoute()
const isProjectDetailPage = computed(() => route.path.startsWith('/portfolio/projects/'))

const page = computed(() => [theme.colors.background])
</script>

<template>
  <div :class="['min-h-screen transition-colors duration-300', page]">
    <UiPortfolio />
    <slot />

    <CommonScrollIndicator v-if="!isProjectDetailPage" mode="next" target-selector="section[id]" />
    <CommonScrollIndicator mode="top" label="Top" />
  </div>
</template>
