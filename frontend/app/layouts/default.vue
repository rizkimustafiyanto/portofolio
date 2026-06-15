<script setup lang="ts">
import { theme } from '~/constans'

const page = computed(() => [theme.colors.background])
</script>

<template>
  <div :class="['min-h-screen transition-colors duration-300', page]">
    <slot />
  </div>
</template>
