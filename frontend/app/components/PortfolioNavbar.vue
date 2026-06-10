<script setup lang="ts">
import { computed } from 'vue'
import { AUTH_LOGIN_ROUTE, HOME_ROUTE, MANAGEMENT_ROUTE } from '~/constans'
import { useAuth } from '~/features/auth/composables/useAuth'

const store = useAuthStore()
const { logout } = useAuth()

const isLogged = computed(() => !!store.user)
</script>

<template>
  <nav class="w-full bg-white border-b p-4 flex items-center justify-between">
    <div class="flex items-center gap-4">
      <NuxtLink :to="HOME_ROUTE" class="font-bold text-lg">My Portfolio</NuxtLink>
      <NuxtLink :to="HOME_ROUTE" class="text-sm text-gray-600">Home</NuxtLink>
      <NuxtLink :to="MANAGEMENT_ROUTE" class="text-sm text-gray-600">Management</NuxtLink>
    </div>

    <div>
      <button
        v-if="isLogged"
        class="text-sm text-red-600"
        @click="logout"
      >
        Logout
      </button>

      <BaseButton
        v-else
        :to="AUTH_LOGIN_ROUTE"
        class="text-sm text-green-600">
        Login
      </BaseButton>
    </div>
  </nav>
</template>
