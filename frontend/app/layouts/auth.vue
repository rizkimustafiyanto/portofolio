<script setup lang="ts">
import { useAuthThemeClasses } from '~/features/auth/composables/useAuthThemeClasses'

const { page } = useAuthThemeClasses()
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
