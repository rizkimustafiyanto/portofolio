<script setup lang="ts">
import { theme } from '~/constans/theme'

interface Props {
  variant?: 'default' | 'success'
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
})
</script>

<template>
  <span
    :class="[
      'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',

      variant === 'default'
        ? `${theme.colors.surface} ${theme.colors.text.secondary}`
        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
    ]"
  >
    <slot />
  </span>
</template>
