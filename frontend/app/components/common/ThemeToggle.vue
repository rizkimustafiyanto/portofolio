<script setup lang="ts">
import { animation } from '~/constans/animation'
import { useTheme } from '~/composables/useTheme'

const { colorMode, toggleTheme } = useTheme()

const isDark = computed(() => colorMode.value === 'dark')
</script>

<template>
  <button
    :class="[
      'inline-flex h-10 items-center gap-2 rounded-full border border-border/70 px-3 text-sm transition hover:bg-background/80 hover:-translate-y-0.5 hover:shadow-lg md:px-4',
      isDark
        ? 'bg-slate-900/85 text-white dark:bg-slate-900/85'
        : 'bg-white/85 text-slate-900 dark:bg-white/5',
      animation.duration.normal,
    ]"
    aria-label="Toggle theme"
    :aria-pressed="isDark"
    :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggleTheme"
  >
    <svg class="h-4 w-4 md:h-5 md:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        v-if="isDark"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364-1.414-1.414M7.05 7.05 5.636 5.636m12.728 0L16.95 7.05M7.05 16.95l-1.414 1.414"
      />
      <path
        v-else
        fill="currentColor"
        stroke="none"
        d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
      />
    </svg>

    <span class="text-xs font-medium uppercase tracking-[0.24em]">
      {{ isDark ? 'Dark' : 'Light' }}
    </span>
  </button>
</template>
