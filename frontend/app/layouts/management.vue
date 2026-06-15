<script setup lang="ts">
import { theme } from '~/constans'

const page = computed(() => [theme.colors.background])
</script>

<template>
  <div :class="['min-h-screen transition-colors duration-300', page]">
    <UiManagement />

    <div class="lg:pl-[240px]">
      <UiManagementHeader />

      <main class="p-6 md:p-8">
        <slot />
      </main>
    </div>

    <CommonScrollIndicator mode="next" target-selector="section" />
    <CommonScrollIndicator mode="top" label="Top" />
  </div>
</template>
