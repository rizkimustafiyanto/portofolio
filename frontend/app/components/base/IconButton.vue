<script setup lang="ts">
import { animation } from '~/constans/animation'
import { theme } from '~/constans/theme'

interface Props {
  size?: 'sm' | 'md'
  variant?: 'outline' | 'ghost' | 'filled'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  variant: 'outline',
})

const sizeClass = {
  sm: 'h-9 w-9',
  md: 'h-11 w-11',
}

const variantClass = {
  outline: [
    'border',
    theme.colors.surface,
    'border-black/10 dark:border-white/10',
    'hover:bg-slate-50 dark:hover:bg-slate-50/20',
    'hover:shadow-[0_12px_16px_-32px_rgba(15,23,42,0.25)]',
  ],

  ghost: ['border-transparent bg-transparent', 'hover:bg-slate-100 dark:hover:bg-white/10'],

  filled: ['border-transparent', theme.colors.surface, 'shadow-sm', 'hover:brightness-95'],
}

const baseClass = [
  'inline-flex items-center justify-center rounded-full',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  animation.duration.normal,
  animation.easing.smooth,
]
</script>

<template>
  <button :class="[baseClass, sizeClass[props.size], variantClass[props.variant]]">
    <slot />
  </button>
</template>
