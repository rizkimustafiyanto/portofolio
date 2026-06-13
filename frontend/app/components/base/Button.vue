<script setup lang="ts">
import { animation } from '~/constans/animation'
import { theme } from '~/constans/theme'
import type { RouteLocationRaw } from 'vue-router'

type Variant = 'filled' | 'text'
type Tone = 'default' | 'danger'

type Type = 'button' | 'submit' | 'reset'

interface Props {
  type?: Type
  to?: RouteLocationRaw

  variant?: Variant
  tone?: Tone
  override?: string
  addStyle?: string

  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'filled',
  tone: 'default',
  disabled: false,
  loading: false,
  to: undefined,
  override: undefined,
  addStyle: ''
})

const emit = defineEmits<{
  click: [Event]
}>()

const isDisabled = computed(() => props.disabled || props.loading)

const isNavigating = ref(false)

const buttonBaseClass = [
  'inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition',
  animation.duration.normal,
  animation.easing.smooth,
]

const variantClass = computed(() => {
  const map: Record<Variant, Record<Tone, string>> = {
    filled: {
      default: theme.colors.button.filled,
      danger: theme.colors.button.dangerFilled,
    },
    text: {
      default: theme.colors.button.text,
      danger: theme.colors.button.dangerText,
    },
  }

  return props.override || map[props.variant][props.tone]
})

const handleClick = (e: Event) => {
  if (isDisabled.value || isNavigating.value) {
    e.preventDefault()
    return
  }

  if (props.to) {
    isNavigating.value = true
  }

  emit('click', e)
}
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :class="[buttonBaseClass, addStyle, variantClass, isDisabled && 'pointer-events-none opacity-60']"
    @click="handleClick"
  >
    <svg
      v-if="loading || isNavigating"
      :class="['h-4 w-4 animate-spin', animation.duration.instant]"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" opacity="0.25" />
      <path d="M4 12a8 8 0 018-8" fill="currentColor" opacity="0.75" />
    </svg>

    <slot />
  </NuxtLink>

  <button
    v-else
    :type="type"
    :disabled="isDisabled"
    :class="[buttonBaseClass, addStyle, variantClass, isDisabled && 'pointer-events-none opacity-60']"
    @click="handleClick"
  >
    <svg
      v-if="loading"
      :class="['h-4 w-4 animate-spin', animation.duration.instant]"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" opacity="0.25" />
      <path d="M4 12a8 8 0 018-8" fill="currentColor" opacity="0.75" />
    </svg>

    <slot />
  </button>
</template>
