<script setup lang="ts">
import { animation } from '~/constans/animation'
import { theme } from '~/constans/theme'

interface Props {
  size?: 'sm' | 'md'
}

withDefaults(defineProps<Props>(), {
  size: 'md',
})

const sizeClass = {
  sm: 'h-9 w-9',
  md: 'h-11 w-11',
}

const baseClass = [
  'flex items-center justify-center rounded-full border backdrop-blur-sm transition-all',
  animation.duration.normal,
  animation.easing.smooth,
  theme.colors.surface,
  'border-black/10 dark:border-white/10',
]
</script>

<template>
  <button :class="[sizeClass[size], baseClass, 'hover:-translate-y-1', 'hover:shadow-lg']">
    <slot />
  </button>
</template>
