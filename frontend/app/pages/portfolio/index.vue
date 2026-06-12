<script lang="ts" setup>
definePageMeta({
  layout: 'portfolio',
})

</script>

<template>
  <main
    class="
      snap-y
      snap-mandatory
      overflow-y-auto
      bg-gradient-to-b
      from-background
      via-background
      to-muted/20
    "
  >
    <Portfolio />

    <PortfolioAbout />

    <PortfolioProjects />

    <PortfolioExperience />

    <PortfolioTechStack />

    <PortfolioContact />
  </main>
</template>
