<script setup lang="ts">
import { animation } from '~/constans/animation'
import { theme } from '~/constans/theme'
import { useMouseParallax } from '../../composables/useMouseParallax'

const { x, y } = useMouseParallax()
</script>

<template>
  <div class="pointer-events-none absolute inset-0 overflow-hidden">
    <div
      :class="[
        'absolute left-20 top-20 h-72 w-72 rounded-full blur-3xl transition-transform motion-reduce:transition-none will-change-transform mix-blend-multiply dark:mix-blend-normal',
        'opacity-40 dark:opacity-100',
        theme.colors.accentSurface,
        animation.duration.slow,
      ]"
      :style="{
        transform: `translate3d(${x}px, ${y}px, 0)`,
      }"
    />

    <div
      :class="[
        'absolute bottom-20 right-20 h-96 w-96 rounded-full blur-3xl transition-transform motion-reduce:transition-none will-change-transform mix-blend-multiply dark:mix-blend-normal',
        'bg-slate-200/10 opacity-30 dark:bg-sky-500/10 dark:opacity-100',
        animation.duration.slower,
      ]"
      :style="{
        transform: `translate3d(${-x}px, ${-y}px, 0)`,
      }"
    />

    <div class="noise absolute inset-0 opacity-[0.01]" />
  </div>
</template>
