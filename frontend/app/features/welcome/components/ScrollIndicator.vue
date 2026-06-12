<script setup lang="ts">
import { animation } from '~/constans/animation'

const scrollNext = () => {
  if (!import.meta.client) {
    return
  }

  window.scrollBy({
    top: window.innerHeight,
    behavior: 'smooth',
  })
}
</script>

<template>
  <button
    type="button"
    :class="[
      'fixed bottom-6 right-6 z-10 flex flex-col items-center gap-2 rounded-full px-2 py-2 opacity-45 transition-all hover:-translate-y-0.5 hover:opacity-100 focus:outline-none focus:opacity-100',
      animation.duration.normal,
    ]"
    aria-label="Scroll to next section"
    @click="scrollNext"
  >
    <span
      :class="['text-[0.65rem] uppercase tracking-[0.28em]', 'text-slate-500 dark:text-slate-400']"
    >
      Scroll
    </span>

    <div
      :class="[
        'flex h-10 w-5 justify-center rounded-full border',
        'border-slate-300/70 dark:border-slate-700/80',
      ]"
    >
      <div
        :class="[
          'mt-2 h-1.5 w-1.5 animate-bounce rounded-full',
          'bg-slate-500 dark:bg-slate-400',
          animation.duration.fast,
        ]"
      />
    </div>
  </button>
</template>
