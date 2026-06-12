<script setup lang="ts">
import { theme } from '~/constans/theme'

interface Props {
  variant?: 'primary' | 'secondary' | 'muted'
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
})

const variants = {
  primary: theme.colors.text.primary,
  secondary: theme.colors.text.secondary,
  muted: theme.colors.text.muted,
}
</script>

<template>
  <p :class="['leading-relaxed', variants[variant]]">
    <slot />
  </p>
</template>
