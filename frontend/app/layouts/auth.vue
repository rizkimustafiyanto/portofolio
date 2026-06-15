<script setup lang="ts">
import { theme } from '~/constans'

const page = computed(() => [theme.colors.background])
</script>

<template>
  <div
    :class="[
      'min-h-screen flex items-center justify-center px-6 py-10 transition-colors duration-300',
      page,
    ]"
  >
    <slot />
  </div>
</template>
