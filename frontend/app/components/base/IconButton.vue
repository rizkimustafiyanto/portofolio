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
  'hover:bg-slate-50 hover:shadow-[0_12px_16px_-32px_rgba(15,23,42,0.25)] dark:hover:bg-slate-50/20',
  'border-black/10 dark:border-white/10',
]
</script>

<template>
  <button :class="[sizeClass[size], baseClass]">
    <slot />
  </button>
</template>
