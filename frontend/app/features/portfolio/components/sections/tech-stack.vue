<script setup lang="ts">
const stacks = [
  {
    category: 'Frontend',
    items: ['Vue', 'Nuxt', 'TypeScript', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'Prisma', 'REST / GraphQL'],
  },
  {
    category: 'Workflow',
    items: ['Design Systems', 'Component QA', 'Performance Audits'],
  },
]
</script>

<template>
  <BaseSection
    id="tech-stack"
    override="
      mx-auto
      max-w-7xl
      px-6
      py-12
    "
  >
    <div class="mb-10 text-sm tracking-[0.3em]">TECH STACK</div>

    <div class="grid gap-12 md:grid-cols-3">
      <div
        v-for="stack in stacks"
        :key="stack.category"
        class="rounded-3xl border border-border/70 bg-background/60 p-8"
      >
        <h3 class="mb-6 text-2xl font-light">
          {{ stack.category }}
        </h3>

        <div class="space-y-3">
          <div v-for="item in stack.items" :key="item" class="text-muted-foreground">
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </BaseSection>
</template>
