<script setup lang="ts">
import { AUTH_LOGIN_ROUTE, MANAGEMENT_ROUTE } from '~/constans'

definePageMeta({
  layout: 'portfolio',
})

const store = useAuthStore()
const isLogged = computed(() => !!store.user)
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-2">Portfolio</h1>
    <p class="mb-4">This is the portfolio page. Showcase of projects and experience.</p>

    <div class="mt-4">
      <span class="block mb-2">See the management area to edit projects and settings.</span>

      <NuxtLink
        v-if="isLogged"
        :to="MANAGEMENT_ROUTE"
        class="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Go to Management
      </NuxtLink>

      <NuxtLink
        v-else
        :to="AUTH_LOGIN_ROUTE"
        class="px-4 py-2 bg-green-600 text-white rounded"
      >
        Login to Manage
      </NuxtLink>
    </div>
  </div>
</template>
