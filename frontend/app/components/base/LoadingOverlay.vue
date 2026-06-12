<script setup lang="ts">
import { animation } from '~/constans/animation'
import { theme } from '~/constans/theme'
import { useUiStore } from '~/stores/ui.store'

const ui = useUiStore()
</script>

<template>
  <div
    v-if="ui.loading"
    class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40"
  >
    <div
      :class="[
        'flex items-center gap-3 rounded-lg px-6 py-4',
        theme.colors.surface,
        animation.duration.normal,
      ]"
    >
      <svg :class="['h-5 w-5 animate-spin', animation.duration.instant]" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" opacity="0.2" />
        <path d="M4 12a8 8 0 018-8" fill="currentColor" />
      </svg>

      <span :class="['text-sm', theme.colors.text.primary]">
        {{ ui.loadingText || 'Loading...' }}
      </span>
    </div>
  </div>
</template>
