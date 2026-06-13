<script setup lang="ts">
import { animation } from '~/constans/animation'

const show = ref(true)

onMounted(() => {
  setTimeout(() => {
    show.value = false
  }, 1800)
})
</script>

<template>
  <Transition name="fade">
    <div
      v-if="show"
      :class="[
        'fixed inset-0 z-[999] isolate flex items-center justify-center transition-colors backdrop-blur-sm',
        'bg-stone-50/90 text-slate-950 dark:bg-slate-950/90 dark:text-white',
        animation.duration.normal,
      ]"
    >
      <div class="text-center">
        <h1
          :class="[
            'text-4xl font-light tracking-[0.4em] transition-colors',
            'text-slate-950 dark:text-white',
            animation.duration.normal,
          ]"
        >
          RIZKI
        </h1>

        <p :class="['mt-4 text-sm tracking-[0.3em]', 'text-slate-500 dark:text-slate-400']">
          FULL STACK DEVELOPER
        </p>
      </div>
    </div>
  </Transition>
</template>
