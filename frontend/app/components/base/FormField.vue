<script setup lang="ts">
interface Props {
  label?: string
  required?: boolean
  error?: string
  helperText?: string
}

defineProps<Props>()
</script>

<template>
  <div class="space-y-1">
    <label
      v-if="label"
      class="block text-sm font-medium text-gray-700"
    >
      {{ label }}

      <span
        v-if="required"
        class="text-red-500"
      >
        *
      </span>
    </label>

    <slot />

    <p
      v-if="helperText && !error"
      class="text-xs text-gray-500"
    >
      {{ helperText }}
    </p>

    <p
      v-if="error"
      class="text-sm text-red-500"
    >
      {{ error }}
    </p>
  </div>
</template>