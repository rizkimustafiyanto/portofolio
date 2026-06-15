<script setup lang="ts">
import { animation } from '~/constans/animation'
import { useEntrance } from '../../composables/useEntrance'
import { theme } from '~/constans'

const navigatePortfolio = () => {
  navigateTo('/portfolio')
}
const { visible } = useEntrance()
const accentClass = computed(() => theme.colors.accent)

const headingClass = computed(() => [theme.colors.text.secondary, animation.duration.slow])

const buttonClass = computed(() =>
  [theme.button.welcomeButton, animation.duration.slow, animation.easing.premium].join(' '),
)
</script>

<template>
  <BaseSection override="flex min-h-screen items-center justify-center px-6">
    <div
      :class="[
        'max-w-4xl text-center transition-all duration-1000',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
      ]"
    >
      <WelcomeSectionsHeroBadge />

      <div class="h-8" />
      <p :class="['mb-6 text-sm font-medium uppercase tracking-[0.35em]', accentClass]">
        Full Stack Developer
      </p>

      <h1
        :class="[
          'mb-8 text-5xl font-light leading-tight transition-colors md:text-7xl',
          headingClass,
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
          headingClass,
          animation.duration.normal,
        ]"
      >
        Building scalable web applications with modern technologies and thoughtful user experiences.
      </p>

      <BaseButton :override="buttonClass" @click="navigatePortfolio">
        <span
          :class="[
            'absolute inset-0 -translate-x-full transition-transform group-hover:translate-x-0 bg-white/20 dark:bg-white/10',
            animation.duration.slow,
          ]"
        />

        <span class="relative z-10 flex items-center gap-2">
          Explore Portfolio

          <span class="transition-transform group-hover:translate-x-1">&rarr;</span>
        </span>
      </BaseButton>
    </div>
  </BaseSection>
</template>
