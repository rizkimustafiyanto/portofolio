<script setup lang="ts">
import { animation } from '~/constans/animation'

interface Props {
  override?: string
}

withDefaults(defineProps<Props>(), {
  override: undefined,
})
</script>

<template>
  <section :class="[override || 'py-16 md:py-20', animation.duration.normal]">
    <slot />
  </section>
</template>
