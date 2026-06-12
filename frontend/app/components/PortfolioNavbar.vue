<script setup lang="ts">
import { animation } from '~/constans/animation'
import { theme } from '~/constans/theme'

const links = [
  {
    label: 'About',
    href: '#about',
  },
  {
    label: 'Projects',
    href: '#projects',
  },
  {
    label: 'Experience',
    href: '#experience',
  },
  {
    label: 'Stack',
    href: '#tech-stack',
  },
  {
    label: 'Contact',
    href: '#contact',
  },
]
</script>

<template>
  <nav
    :class="[
      'sticky top-0 z-50 w-full border-b px-4 py-4 backdrop-blur-xl md:px-6',
      theme.colors.surface,
      animation.duration.normal,
      'border-black/5 dark:border-white/10',
    ]"
  >
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-6">
      <a
        href="#hero"
        :class="['text-lg font-semibold tracking-tight', theme.colors.text.primary]"
      >
        My Portfolio
      </a>

      <div class="flex flex-wrap items-center justify-end gap-2 md:gap-3">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          :class="[
            'rounded-full border border-border/70 px-3 py-2 text-sm transition hover:bg-background/80',
            theme.colors.text.secondary,
            animation.duration.normal,
          ]"
        >
          {{ link.label }}
        </a>
      </div>
    </div>
  </nav>
</template>
