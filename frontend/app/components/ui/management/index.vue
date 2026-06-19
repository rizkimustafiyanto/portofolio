<script setup lang="ts">
import { theme } from '~/constans';

const route = useRoute()

const menus = [
  {
    label: 'Dashboard',
    to: '/management',
  },
  {
    label: 'Projects',
    to: '/management/projects',
  },
  {
    label: 'Experience',
    to: '/management/experience',
  },
  {
    label: 'Tech Stack',
    to: '/management/tech-stack',
  },
  {
    label: 'About',
    to: '/management/about',
  },
  {
    label: 'Settings',
    to: '/management/settings',
  },
]
</script>

<template>
  <aside
    :class="['fixed inset-y-0 left-0 hidden w-[210px] border-r border-border bg-background lg:flex lg:flex-col', theme.colors.border]"
  >
    <div class="px-8 py-8">
      <div class="text-xl font-semibold tracking-wide">Portfolio CMS</div>

      <p class="mt-2 text-sm text-muted-foreground">Content Management</p>
    </div>

    <nav class="flex-1 px-4">
      <NuxtLink
        v-for="menu in menus"
        :key="menu.to"
        :to="menu.to"
        class="flex items-center rounded-2xl px-4 py-3 transition-colors"
        :class="route.path === menu.to ? 'bg-muted font-medium' : 'hover:bg-muted/50'"
      >
        {{ menu.label }}
      </NuxtLink>
    </nav>

    <div :class="['border-t border-border p-4', theme.colors.border]">
      <NuxtLink to="/portfolio" class="flex items-center rounded-2xl px-4 py-3 hover:bg-muted/50">
        View Portfolio
      </NuxtLink>
    </div>
  </aside>
</template>
