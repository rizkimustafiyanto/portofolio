<script setup lang="ts">
import { animation } from '~/constans/animation'
import { theme } from '~/constans/theme'

interface Props {
  modelValue: string | number

  type?: 'text' | 'email' | 'password' | 'number' | 'tel'

  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  error?: string
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  readonly: false,
  placeholder: '',
  error: '',
})

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <input
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :class="[
      'w-full rounded-lg border px-3 py-2 outline-none transition',
      animation.duration.normal,
      error
        ? 'border-red-500'
        : `${theme.colors.surface} border-black/10 focus:border-slate-400 dark:focus:border-slate-500`,
    ]"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
