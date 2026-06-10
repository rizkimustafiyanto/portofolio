<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

type Variant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'ghost'

type Type = 'button' | 'submit' | 'reset'

interface Props {
  type?: Type
  to?: RouteLocationRaw
  
  variant?: Variant

  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
  disabled: false,
  loading: false,
  to: undefined,
})

const emit = defineEmits<{
  click: [Event]
}>()

const isDisabled = computed(() =>
  props.disabled || props.loading,
)

const isNavigating = ref(false)

const variantClass = computed(() => {
  const map: Record<string, string> = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
  }

  return map[props.variant] || map.primary
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
  <!-- LINK MODE -->
  <NuxtLink
    v-if="to"
    :to="to"
    :class="[
      'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition',
      variantClass,
      isDisabled && 'pointer-events-none opacity-60',
    ]"
    @click="handleClick"
  >
    <svg
      v-if="loading || isNavigating"
      class="w-4 h-4 animate-spin"
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
    :class="[
      'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition',
      variantClass,
      isDisabled && 'pointer-events-none opacity-60',
    ]"
    @click="handleClick"
  >
    <svg
      v-if="loading"
      class="w-4 h-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" opacity="0.25" />
      <path d="M4 12a8 8 0 018-8" fill="currentColor" opacity="0.75" />
    </svg>

    <slot />
  </button>
</template>