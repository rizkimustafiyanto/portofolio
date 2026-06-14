<script setup lang="ts">
import { useThemeClasses } from '~/features/welcome/composables/useThemeClasses'

const { page } = useThemeClasses()
</script>

<template>
  <div :class="['min-h-screen transition-colors duration-300', page]">
    <UiManagement />

    <div class="lg:pl-72">
      <UiManagementHeader />

      <main class="p-6 md:p-8">
        <slot />
      </main>
    </div>

    <CommonScrollIndicator mode="next" target-selector="main section, main [data-scroll-target]" />
    <CommonScrollIndicator mode="top" label="Top" />
  </div>
</template>
