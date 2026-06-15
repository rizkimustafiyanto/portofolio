<script setup lang="ts">
import { theme, animation } from '~/constans/index'

const route = useRoute()
const isProjectDetailPage = computed(() => route.path.startsWith('/portfolio/projects/'))

const navClass = computed(() => [
  'sticky top-0 z-50 w-full border-b px-4 py-4 md:px-6',
  theme.colors.surface,
  theme.colors.border,
  animation.duration.normal,
])

const textClass = computed(() => theme.colors.text.secondary)

const linkClass = computed(() => [
  'inline-flex h-10 items-center rounded-full border px-3 text-sm transition md:px-4',

  theme.button.text,
  theme.colors.border,
  theme.colors.text.secondary,

  animation.duration.normal,
])

const backClass = computed(() => [
  'inline-flex h-10 items-center rounded-full border px-4 text-sm transition hover:bg-background/80',

  theme.colors.border,
  theme.colors.text.secondary,

  animation.duration.normal,
])

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
  <nav :class="navClass">
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-4">
      <a href="/" :class="['text-lg font-semibold tracking-tight', textClass]"> My Portfolio </a>

      <div class="flex items-center gap-2 md:gap-3">
        <a v-if="isProjectDetailPage" href="/portfolio#projects" :class="backClass">
          <span aria-hidden="true" class="mr-2">&larr;</span>
          Back to projects
        </a>

        <div v-else class="hidden flex-wrap items-center justify-end gap-2 md:flex md:gap-3">
          <a v-for="link in links" :key="link.href" :href="link.href" :class="linkClass">
            {{ link.label }}
          </a>
        </div>

        <CommonThemeToggle />
      </div>
    </div>
  </nav>
</template>
