<script setup lang="ts">
import { useUiStore } from '~/stores/ui.store';

const ui = useUiStore()
</script>

<template>
  <div
    v-if="ui.loading"
    class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40"
  >
    <div class="bg-white px-6 py-4 rounded-lg flex items-center gap-3">
      <svg
        class="w-5 h-5 animate-spin"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" stroke="black" opacity="0.2" />
        <path d="M4 12a8 8 0 018-8" fill="black" />
      </svg>

      <span class="text-sm">
        {{ ui.loadingText || 'Loading...' }}
      </span>
    </div>
  </div>
</template>