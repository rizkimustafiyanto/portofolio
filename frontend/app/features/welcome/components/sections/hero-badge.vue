<script setup lang="ts">
import { animation } from '~/constans/animation'
import { theme } from '~/constans'
</script>

<template>
  <div
    :class="[
      'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm shadow-sm backdrop-blur-xl',
      theme.badge.neutral,
      animation.duration.normal,
    ]"
  >
    <span class="h-2 w-2 rounded-full bg-emerald-500" />

    Available for freelance work
  </div>
</template>
