<script setup lang="ts">
const highlights = [
  'Design systems that stay consistent as the product grows.',
  'Nuxt and Vue implementations with careful attention to loading states.',
  'Composable UI patterns that make future changes cheaper.',
]
</script>

<template>
  <BaseSection id="about" override="mx-auto max-w-7xl px-6 py-12">
    <div class="mb-12 text-sm font-medium tracking-[0.3em] text-muted-foreground">ABOUT</div>

    <div class="grid gap-12 md:grid-cols-12">
      <div class="md:col-span-4">
        <h2 class="text-3xl font-light md:text-5xl">Building products that scale.</h2>
      </div>

      <div class="md:col-span-8">
        <p class="text-lg leading-relaxed text-muted-foreground">
          Over the past several years, I have worked across product teams that needed interfaces to
          be calm, clear, and dependable. My sweet spot is turning ambiguous requirements into clean
          frontend experiences that are simple to maintain.
        </p>

        <div class="mt-10 grid gap-4">
          <div
            v-for="item in highlights"
            :key="item"
            class="rounded-2xl border border-border/70 bg-background/60 px-5 py-4 text-sm leading-relaxed text-foreground shadow-sm"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </BaseSection>
</template>
