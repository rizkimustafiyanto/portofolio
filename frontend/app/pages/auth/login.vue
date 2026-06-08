<script setup>
definePageMeta({
  layout: 'auth',
  middleware: 'guest',
})
</script>

<template>
  <div>
    <LoginForm />
  </div>
</template>