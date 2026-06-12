<script setup>
definePageMeta({
  layout: 'auth',
  middleware: 'guest',
})
</script>

<template>
  <div>
    <AuthFormLogin />
  </div>
</template>
