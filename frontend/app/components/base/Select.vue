<script setup lang="ts">
import { computed } from 'vue'
import { animation } from '~/constans/animation'
import { theme } from '~/constans/theme'

interface Option {
  label: string
  value: string | number
  disabled?: boolean
}

interface Props {
  modelValue: string | number | null

  options: Option[]

  placeholder?: string

  disabled?: boolean
  readonly?: boolean

  loading?: boolean
  loadingText?: string

  clearable?: boolean

  icon?: string
  iconPosition?: 'start' | 'end'
  clickableIcon?: boolean

  size?: 'sm' | 'md' | 'lg'

  variant?: 'default' | 'filled' | 'ghost'

  invalid?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Pilih data',

  disabled: false,
  readonly: false,

  error: '',

  loading: false,
  loadingText: 'Memuat data...',

  clearable: false,

  icon: '',
  iconPosition: 'start',
  clickableIcon: false,

  size: 'md',

  variant: 'default',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  iconClick: []
}>()

function updateValue(event: Event) {
  if (props.readonly) return

  emit('update:modelValue', (event.target as HTMLSelectElement).value)
}

function clear() {
  emit('update:modelValue', '')
}

const selectedOption = computed(() => {
  return props.options.find((option) => option.value === props.modelValue)
})

const hasValue = computed(() => {
  return !!selectedOption.value
})

const hasEndAction = computed(() => {
  return props.loading || props.clearable || (props.icon && props.iconPosition === 'end')
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return {
        select: 'h-9 text-sm',
        icon: 'h-4 w-4',
      }

    case 'lg':
      return {
        select: 'h-12 text-base',
        icon: 'h-5 w-5',
      }

    default:
      return {
        select: 'h-10 text-sm',
        icon: 'h-5 w-5',
      }
  }
})

const variantClass = computed(() => {
  return theme.select.variant[props.variant] ?? theme.select.variant.default
})

const invalidClass = computed(() => {
  return props.invalid ? theme.select.invalid : ''
})

const iconColorClass = computed(() => [
  'text-muted-foreground',
  animation.duration.fast,
  'transition-colors',
])

const paddingClass = computed(() => ({
  'pl-10': props.icon && props.iconPosition === 'start',

  'pl-3': !props.icon || props.iconPosition !== 'start',

  'pr-10': hasEndAction.value,

  'pr-3': !hasEndAction.value,
}))
</script>

<template>
  <div class="relative">
    <Icon
      v-if="icon && iconPosition === 'start'"
      :name="icon"
      :class="[sizeClass.icon, iconColorClass, 'absolute left-3 top-1/2 -translate-y-1/2']"
    />

    <select
      :value="modelValue ?? ''"
      :disabled="disabled || loading"
      :class="[
        'w-full appearance-none rounded-lg border outline-none',

        animation.duration.normal,
        'transition-all',

        sizeClass.select,

        variantClass,

        paddingClass,

        invalidClass,

        (disabled || loading) && 'cursor-not-allowed opacity-50',

        readonly && 'pointer-events-none select-none',
      ]"
      @change="updateValue"
    >
      <option v-if="placeholder" disabled value="">
        {{ placeholder }}
      </option>

      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </option>
    </select>

    <div v-if="loading" class="absolute right-3 top-1/2 -translate-y-1/2">
      <Icon name="lucide:loader-circle" :class="[sizeClass.icon, iconColorClass, 'animate-spin']" />
    </div>

    <button
      v-else-if="clearable && hasValue && !readonly && !disabled"
      type="button"
      class="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center"
      @click="clear"
    >
      <Icon name="lucide:x" :class="[sizeClass.icon, iconColorClass, 'hover:text-foreground']" />
    </button>

    <button
      v-else-if="icon && iconPosition === 'end' && clickableIcon"
      type="button"
      class="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center"
      @click="emit('iconClick')"
    >
      <Icon :name="icon" :class="[sizeClass.icon, iconColorClass, 'hover:text-foreground']" />
    </button>

    <Icon
      v-else-if="icon && iconPosition === 'end'"
      :name="icon"
      :class="[sizeClass.icon, iconColorClass, 'absolute right-3 top-1/2 -translate-y-1/2']"
    />

    <div v-else class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
      <Icon name="lucide:chevron-down" :class="[sizeClass.icon, iconColorClass]" />
    </div>
  </div>
</template>
