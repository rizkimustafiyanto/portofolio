<script setup lang="ts">
import { animation } from '~/constans/animation'
import { theme } from '~/constans/theme'
import { useEntrance } from '../../composables/useEntrance'
import { useTheme } from '../../composables/useTheme'

const navigatePortfolio = () => {
  navigateTo('/portfolio')
}

const { visible } = useEntrance()
const { colorMode } = useTheme()
const isDark = computed(() => colorMode.value === 'dark')

const buttonClass = computed(() => [
  'group relative overflow-hidden rounded-full border px-8 py-4 font-medium transition-all',
  animation.duration.slow,
  animation.easing.premium,
  theme.colors.border,
  isDark.value
    ? 'bg-white/5 text-white hover:bg-white/10'
    : 'bg-slate-950 text-white hover:bg-slate-800',
])
</script>

<template>
  <section class="flex min-h-screen items-center justify-center px-6">
    <div
      :class="[
        'max-w-4xl text-center transition-all duration-1000',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
      ]"
    >
      <WelcomeSectionsHeroBadge />

      <div class="h-8" />
      <p :class="['mb-6 text-sm font-medium uppercase tracking-[0.35em]', theme.colors.accent]">
        Full Stack Developer
      </p>

      <h1
        :class="[
          'mb-8 text-5xl font-light leading-tight transition-colors md:text-7xl',
          theme.colors.text.secondary,
          animation.duration.normal,
        ]"
      >
        Crafting Digital
        <span class="italic"> Experiences </span>
        with Simplicity
      </h1>

      <p
        :class="[
          'mx-auto mb-10 max-w-2xl text-lg transition-colors',
          theme.colors.text.secondary,
          animation.duration.normal,
        ]"
      >
        Building scalable web applications with modern technologies and thoughtful user experiences.
      </p>

      <BaseButton :override="buttonClass.join(' ')" @click="navigatePortfolio">
        <span
          :class="[
            'absolute inset-0 -translate-x-full transition-transform group-hover:translate-x-0',
            isDark ? 'bg-white/10' : 'bg-white/20',
            animation.duration.slow,
          ]"
        />

        <span class="relative z-10 flex items-center gap-2">
          Explore Portfolio

          <span class="transition-transform group-hover:translate-x-1">&rarr;</span>
        </span>
      </BaseButton>
    </div>
  </section>
</template>
