<script setup lang="ts">
import { animation } from '~/constans/animation'
import { theme } from '~/constans/theme'

interface Props {
  modelValue: boolean

  label?: string

  disabled?: boolean
  readonly?: boolean

  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'filled'
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  readonly: false,
  label: '',
  size: 'md',
  variant: 'default',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

function updateValue(event: Event) {
  if (props.disabled || props.readonly) return

  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
}

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return {
        checkbox: 'h-4 w-4',
        label: 'text-sm',
      }

    case 'lg':
      return {
        checkbox: 'h-6 w-6',
        label: 'text-base',
      }

    default:
      return {
        checkbox: 'h-5 w-5',
        label: 'text-sm',
      }
  }
})

const variantClass = computed(() => {
  switch (props.variant) {
    case 'filled':
      return `
        bg-muted
        border-transparent
      `

    default:
      return `
        ${theme.colors.surface}
        border-black/10
      `
  }
})

const checkboxClass = computed(() => [
  'rounded border outline-none cursor-pointer',

  animation.duration.normal,
  'transition-all',

  sizeClass.value.checkbox,
  variantClass.value,

  props.disabled && 'cursor-not-allowed opacity-50',
])

const labelClass = computed(() => [
  'flex items-center gap-2 select-none',

  animation.duration.normal,
  'transition-all',

  sizeClass.value.label,

  props.disabled && 'cursor-not-allowed opacity-50',

  theme.colors.text?.primary ?? 'text-slate-800 dark:text-slate-200',
])
</script>

<template>
  <label :class="labelClass">
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      :class="checkboxClass"
      :aria-disabled="disabled"
      @change="updateValue"
    />

    <span v-if="label">
      {{ label }}
    </span>
  </label>
</template>
