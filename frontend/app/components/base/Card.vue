<script setup lang="ts">
import { animation } from '~/constans/animation'
import { theme } from '~/constans/theme'

interface Props {
  hoverable?: boolean
}

withDefaults(defineProps<Props>(), {
  hoverable: true,
})
</script>

<template>
  <div
    :class="[
      'rounded-3xl border backdrop-blur-sm',
      theme.colors.surface,
      'border-black/5 dark:border-white/10',
      'transition-all',
      animation.duration.slow,

      hoverable && 'hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5',
    ]"
  >
    <slot />
  </div>
</template>
