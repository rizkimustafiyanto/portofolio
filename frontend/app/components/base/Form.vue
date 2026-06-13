<script setup lang="ts">
import { animation } from '~/constans/animation'

interface Props {
  as?: 'form' | 'div'
  loading?: boolean
  submitOnEnter?: boolean
}

withDefaults(defineProps<Props>(), {
  as: 'form',
  loading: false,
  submitOnEnter: true,
})

const emit = defineEmits<{
  submit: [Event]
}>()

const handleSubmit = (event: Event) => {
  emit('submit', event)
}
</script>

<template>
  <component
    :is="as"
    :class="[
      'space-y-4',
      loading && 'pointer-events-none opacity-80',
      animation.duration.normal,
    ]"
    @submit.prevent="handleSubmit"
    @keydown.enter="!submitOnEnter && $event.preventDefault()"
  >
    <slot />
  </component>
</template>
