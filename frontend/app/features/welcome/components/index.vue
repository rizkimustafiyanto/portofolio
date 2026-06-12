<script setup lang="ts">
import { useThemeClasses } from '../composables/useThemeClasses'

const { page } = useThemeClasses()
</script>

<template>
  <main :class="['relative min-h-screen overflow-hidden transition-colors duration-300', page]">
    <WelcomeIntroScreen />
    <WelcomeHeroBackground />

    <div class="relative z-10">
      <WelcomeHeroSection />
    </div>

    <div class="pb-10">
      <WelcomeScrollIndicator />
    </div>
  </main>
</template>
