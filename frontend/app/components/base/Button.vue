<script setup lang="ts">
import { animation } from '~/constans/animation'
import { theme } from '~/constans/theme'
import type { RouteLocationRaw } from 'vue-router'

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost'

type Type = 'button' | 'submit' | 'reset'

interface Props {
  type?: Type
  to?: RouteLocationRaw

  variant?: Variant
  override?: string

  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
  disabled: false,
  loading: false,
  to: undefined,
  override: undefined,
})

const emit = defineEmits<{
  click: [Event]
}>()

const isDisabled = computed(() => props.disabled || props.loading)

const isNavigating = ref(false)

const buttonBaseClass = [
  'inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition',
  animation.duration.normal,
  animation.easing.smooth,
]

const variantClass = computed(() => {
  const map: Record<string, string> = {
    primary: `${theme.colors.surface} ${theme.colors.text.primary} hover:brightness-95`,
    secondary:
      'bg-slate-200 text-slate-900 hover:bg-slate-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/15',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost:
      'bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/5',
  }

  return props.override || map[props.variant] || map['primary']
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
    :class="[buttonBaseClass, variantClass, isDisabled && 'pointer-events-none opacity-60']"
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
    :class="[buttonBaseClass, variantClass, isDisabled && 'pointer-events-none opacity-60']"
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
