<script setup lang="ts">
import { animation } from '~/constans/animation'
import { theme } from '~/constans/theme'

interface Option {
  label: string
  value: string | number
}

interface Props {
  modelValue: string | number

  options: Option[]

  disabled?: boolean

  label?: string
  error?: string
  helperText?: string
  required?: boolean
}

defineProps<Props>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <BaseFormField :label="label" :error="error" :required="required" :helper-text="helperText">
    <select
      :value="modelValue"
      :disabled="disabled"
      :class="[
        'w-full rounded-lg border px-3 py-2 outline-none',
        animation.duration.normal,
        error
          ? 'border-red-500'
          : `${theme.colors.surface} border-black/10 focus:border-slate-400 dark:focus:border-slate-500`,
      ]"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </BaseFormField>
</template>
