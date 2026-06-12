<script setup lang="ts">
import { useThemeClasses } from '~/features/welcome/composables/useThemeClasses'

const { page } = useThemeClasses()
</script>

<template>
  <div :class="['min-h-screen transition-colors duration-300', page]">
    <slot />
  </div>
</template>
