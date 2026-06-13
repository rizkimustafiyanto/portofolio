<script setup>
definePageMeta({
  layout: 'auth',
  middleware: 'guest',
})

useHead({
  title: 'Login',
})
</script>

<template>
  <div>
    <AuthFormLogin />
  </div>
</template>
