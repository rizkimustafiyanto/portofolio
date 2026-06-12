<script setup lang="ts">
import { animation } from '~/constans/animation'
import { theme } from '~/constans/theme'
import { AUTH_LOGIN_ROUTE, MANAGEMENT_ROUTE } from '~/constans'
import { useAuth } from '~/features/auth/composables/useAuth'

const { logout } = useAuth()
const store = useAuthStore()
</script>

<template>
  <aside :class="['h-screen w-64 border-r p-4', theme.colors.surface, theme.colors.border]">
    <div class="mb-6">
      <h2 :class="['font-semibold', theme.colors.text.primary, animation.duration.normal]">
        Management
      </h2>
    </div>

    <ul class="space-y-2">
      <li>
        <NuxtLink
          :to="MANAGEMENT_ROUTE"
          :class="[
            'transition-colors hover:text-slate-900 dark:hover:text-white',
            theme.colors.text.secondary,
            animation.duration.normal,
          ]"
          >Dashboard</NuxtLink
        >
      </li>
      <li v-if="store.user">
        <BaseButton variant="danger" @click="logout"> Logout </BaseButton>
      </li>
      <li v-else>
        <NuxtLink :to="AUTH_LOGIN_ROUTE" class="text-blue-600 dark:text-sky-400">Login</NuxtLink>
      </li>
    </ul>
  </aside>
</template>
