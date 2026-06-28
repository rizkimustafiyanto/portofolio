<script setup lang="ts">
const route = useRoute()

const id = computed(() => route.params.id as string)
</script>

<template>
  <ProjectForm :id="id" mode="edit" />
</template>
