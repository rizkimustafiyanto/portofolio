<script setup lang="ts">
import { theme } from '~/constans/theme'

interface Props {
  label?: string
  required?: boolean
  error?: string
  helperText?: string
}

defineProps<Props>()
</script>

<template>
  <div class="relative space-y-1">
    <label v-if="label" :class="['block text-sm font-medium', theme.colors.text.secondary]">
      {{ label }}

      <span v-if="required" class="text-red-500"> * </span>
    </label>

    <slot />

    <p v-if="helperText && !error" :class="['text-xs', theme.colors.text.muted]">
      {{ helperText }}
    </p>

    <p v-if="error" class="text-xs text-red-500">
      {{ error }}
    </p>
  </div>
</template>
