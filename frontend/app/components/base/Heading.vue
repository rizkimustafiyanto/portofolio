<script setup lang="ts">
import { animation } from '~/constans/animation'
import { theme } from '~/constans/theme'

interface Props {
  eyebrow?: string
  title: string
  description?: string
  center?: boolean
}

withDefaults(defineProps<Props>(), {
  center: false,
  eyebrow: undefined,
  description: undefined,
})
</script>

<template>
  <div :class="[center && 'text-center']">
    <p
      v-if="eyebrow"
      :class="[
        'mb-3 text-sm uppercase tracking-[0.3em]',
        'text-amber-700 dark:text-amber-300',
        animation.duration.normal,
      ]"
    >
      {{ eyebrow }}
    </p>

    <h2
      :class="[
        'text-4xl font-light tracking-tight md:text-6xl',
        theme.colors.text.primary,
        animation.duration.normal,
      ]"
    >
      {{ title }}
    </h2>

    <p
      v-if="description"
      :class="[
        'mx-auto mt-6 max-w-2xl text-sm',
        theme.colors.text.secondary,
        animation.duration.normal,
      ]"
    >
      {{ description }}
    </p>
  </div>
</template>
