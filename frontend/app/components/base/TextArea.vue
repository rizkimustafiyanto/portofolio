<script setup lang="ts">
import { animation } from '~/constans/animation'
import { theme } from '~/constans/theme'

interface Props {
  modelValue: string

  rows?: number
  placeholder?: string

  disabled?: boolean
  readonly?: boolean

  error?: string

  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'filled' | 'ghost'
}

const props = withDefaults(defineProps<Props>(), {
  rows: 2,
  placeholder: '',

  disabled: false,
  readonly: false,

  error: '',
  withErrorMessage: false,

  size: 'md',
  variant: 'default',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function updateValue(event: Event) {
  emit('update:modelValue', (event.target as HTMLTextAreaElement).value)
}

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'min-h-[80px] text-sm'

    case 'lg':
      return 'min-h-[120px] text-base'

    default:
      return 'min-h-[100px] text-sm'
  }
})

const variantClass = computed(() => {
  switch (props.variant) {
    case 'filled':
      return `
        bg-muted
        border-transparent
        focus:border-primary
      `

    case 'ghost':
      return `
        bg-transparent
        border-transparent
        focus:border-border
      `

    default:
      return `
        ${theme.colors.surface}
        border-black/10
        focus:border-slate-400
        dark:focus:border-slate-500
      `
  }
})
</script>

<template>
  <div class="relative">
    <textarea
      :value="modelValue"
      :rows="rows"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :class="[
        'w-full block rounded-lg border px-3 py-2 outline-none resize-none',

        animation.duration.normal,
        'transition-all',

        sizeClass,
        variantClass,

        error && 'border-red-500',

        disabled && 'cursor-not-allowed opacity-50',
      ]"
      @input="updateValue"
    />
  </div>
</template>
