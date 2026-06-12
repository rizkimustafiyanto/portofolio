<script setup lang="ts">
import { animation } from '~/constans/animation'
import { theme } from '~/constans/theme'

interface Props {
  modelValue: boolean

  label?: string
  error?: string
}

defineProps<Props>()

defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<template>
  <BaseFormField :error="error">
    <label :class="['flex items-center gap-2', animation.duration.normal]">
      <input
        type="checkbox"
        :checked="modelValue"
        :class="theme.colors.surface"
        @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      >

      <span>
        {{ label }}
      </span>
    </label>
  </BaseFormField>
</template>
