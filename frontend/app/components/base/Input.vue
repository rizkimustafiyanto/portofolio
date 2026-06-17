<script setup lang="ts">
import { computed, ref } from 'vue'
import { animation } from '~/constans/animation'
import { theme } from '~/constans/theme'

interface Props {
  modelValue: string | number

  type?: 'text' | 'email' | 'password' | 'number' | 'tel'

  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  error?: string

  icon?: string
  iconPosition?: 'start' | 'end'

  clickableIcon?: boolean

  clearable?: boolean
  loading?: boolean

  size?: 'sm' | 'md' | 'lg'

  variant?: 'default' | 'filled' | 'ghost'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  readonly: false,
  placeholder: '',
  error: '',

  icon: '',
  iconPosition: 'start',
  clickableIcon: false,

  clearable: false,
  loading: false,

  size: 'md',
  variant: 'default',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  iconClick: []
}>()

const isPasswordVisible = ref(false)

const inputType = computed(() => {
  if (props.type !== 'password') return props.type

  return isPasswordVisible.value ? 'text' : 'password'
})

function updateValue(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

function clear() {
  emit('update:modelValue', '')
}

function togglePassword() {
  isPasswordVisible.value = !isPasswordVisible.value
}

const hasValue = computed(() => {
  return String(props.modelValue ?? '').length > 0
})

const hasEndAction = computed(() => {
  return (
    props.loading ||
    props.clearable ||
    props.type === 'password' ||
    (props.icon && props.iconPosition === 'end')
  )
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return {
        input: 'h-9 text-sm',
        icon: 'h-4 w-4',
      }

    case 'lg':
      return {
        input: 'h-12 text-base',
        icon: 'h-5 w-5',
      }

    default:
      return {
        input: 'h-10 text-sm',
        icon: 'h-5 w-5',
      }
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

const iconColorClass = computed(() => [
  'text-muted-foreground',
  animation.duration.fast,
  'transition-colors',
])
</script>

<template>
  <div class="relative">
    <!-- Start Icon -->
    <Icon
      v-if="icon && iconPosition === 'start'"
      :name="icon"
      :class="[sizeClass.icon, iconColorClass, 'absolute left-3 top-1/2 -translate-y-1/2']"
    />

    <input
      :type="inputType"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :class="[
        'w-full rounded-lg border outline-none',

        animation.duration.normal,
        'transition-all',

        sizeClass.input,

        variantClass,

        icon && iconPosition === 'start' ? 'pl-10' : 'pl-3',

        hasEndAction ? 'pr-10' : 'pr-3',

        error && 'border-red-500',

        disabled && 'cursor-not-allowed opacity-50',
      ]"
      @input="updateValue"
    />

    <!-- Loading -->
    <div v-if="loading" class="absolute right-3 top-1/2 -translate-y-1/2">
      <Icon name="lucide:loader-circle" :class="[sizeClass.icon, iconColorClass, 'animate-spin']" />
    </div>

    <!-- Clear -->
    <button
      v-else-if="clearable && hasValue && !readonly && !disabled && type !== 'password'"
      type="button"
      class="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center"
      @click="clear"
    >
      <Icon name="lucide:x" :class="[sizeClass.icon, iconColorClass, 'hover:text-foreground']" />
    </button>

    <!-- Password Toggle -->
    <button
      v-else-if="type === 'password'"
      type="button"
      class="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center"
      @click="togglePassword"
    >
      <Icon
        :name="isPasswordVisible ? 'lucide:eye-off' : 'lucide:eye'"
        :class="[sizeClass.icon, iconColorClass, 'hover:text-foreground']"
      />
    </button>

    <!-- Clickable End Icon -->
    <button
      v-else-if="icon && iconPosition === 'end' && clickableIcon"
      type="button"
      class="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center"
      @click="emit('iconClick')"
    >
      <Icon :name="icon" :class="[sizeClass.icon, iconColorClass, 'hover:text-foreground']" />
    </button>

    <!-- Static End Icon -->
    <Icon
      v-else-if="icon && iconPosition === 'end'"
      :name="icon"
      :class="[sizeClass.icon, iconColorClass, 'absolute right-3 top-1/2 -translate-y-1/2']"
    />
  </div>
</template>
