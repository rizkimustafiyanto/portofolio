<script setup lang="ts">
const currentDate = computed(() => formatDate(new Date()))
</script>

<template>
  <header class="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
    <div class="flex items-center justify-between px-6 py-5">
      <div>
        <h1 class="text-lg font-semibold">Management</h1>

        <p class="text-sm text-muted-foreground">
          {{ currentDate }}
        </p>
      </div>

      <div class="flex items-center gap-4">
        <button class="rounded-xl border border-border px-4 py-2">Preview</button>
      </div>
    </div>
  </header>
</template>
