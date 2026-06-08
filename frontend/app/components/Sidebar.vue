<script setup lang="ts">
import { AUTH_LOGIN_ROUTE, MANAGEMENT_ROUTE } from '~/constans'
import { useAuth } from '~/features/auth/composables/useAuth'

const { logout } = useAuth()
const store = useAuthStore()
</script>

<template>
  <aside class="w-64 h-screen bg-gray-50 border-r p-4">
    <div class="mb-6">
      <h2 class="font-semibold">Management</h2>
    </div>

    <ul class="space-y-2">
      <li>
        <NuxtLink :to="MANAGEMENT_ROUTE" class="text-gray-700">Dashboard</NuxtLink>
      </li>
      <li v-if="store.user">
        <button class="text-red-600" @click="logout">Logout</button>
      </li>
      <li v-else>
        <NuxtLink :to="AUTH_LOGIN_ROUTE" class="text-blue-600">Login</NuxtLink>
      </li>
    </ul>
  </aside>
</template>
