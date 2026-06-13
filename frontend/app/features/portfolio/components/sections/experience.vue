<script setup lang="ts">
const experiences = [
  {
    year: '2025',
    role: 'Senior Frontend Developer',
    company: 'Laboratory Platform',
    detail:
      'Led the UI refresh and created reusable form and table patterns for operational teams.',
  },
  {
    year: '2024',
    role: 'Frontend Developer',
    company: 'Healthcare System',
    detail:
      'Improved page performance and introduced a more consistent component system across product screens.',
  },
]
</script>

<template>
  <BaseSection
    id="experience"
    override="
      mx-auto
      max-w-7xl
      px-6
      py-12
    "
  >
    <div class="mb-10 text-sm tracking-[0.3em]">EXPERIENCE</div>

    <div class="space-y-4">
      <div
        v-for="item in experiences"
        :key="item.year"
        class="grid gap-8 rounded-3xl border border-border/70 bg-background/60 p-8 md:grid-cols-12"
      >
        <div class="md:col-span-2">
          <div class="text-sm tracking-[0.3em] text-muted-foreground">
            {{ item.year }}
          </div>
        </div>

        <div class="md:col-span-10">
          <h3 class="text-2xl font-light md:text-3xl">
            {{ item.role }}
          </h3>

          <p class="mt-2 text-muted-foreground">
            {{ item.company }}
          </p>

          <p class="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            {{ item.detail }}
          </p>
        </div>
      </div>
    </div>
  </BaseSection>
</template>
