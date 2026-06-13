<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'management',
})
</script>

<template>
  <div class="p-4">
    <Management />
  </div>
</template>
