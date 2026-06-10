<script setup>
definePageMeta({
  layout: 'auth',
  middleware: 'guest',
})
</script>

<template>
  <div>
    <AuthLoginForm />
  </div>
</template>