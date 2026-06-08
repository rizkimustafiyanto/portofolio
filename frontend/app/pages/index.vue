<script setup lang="ts">
import { PORTOFOLIO_ROUTE } from '~/constans'

definePageMeta({
  layout: 'default',
})
</script>

<template>
  <NuxtLink :to="PORTOFOLIO_ROUTE">
    Go to Portofolio
  </NuxtLink>
</template>
