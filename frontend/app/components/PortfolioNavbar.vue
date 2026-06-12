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
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-4">
      <a href="/" :class="['text-lg font-semibold tracking-tight', theme.colors.text.secondary]">
        My Portfolio
      </a>

      <div class="flex items-center gap-2 md:gap-3">
        <div class="hidden flex-wrap items-center justify-end gap-2 md:flex md:gap-3">
          <a
            v-for="link in links"
            :key="link.href"
            :href="link.href"
            :class="[
              'inline-flex h-10 items-center rounded-full border border-border/70 px-3 text-sm transition hover:bg-background/80 md:px-4',
              theme.colors.text.secondary,
              animation.duration.normal,
            ]"
          >
            {{ link.label }}
          </a>
        </div>

        <CommonThemeToggle />
      </div>
    </div>
  </nav>
</template>
