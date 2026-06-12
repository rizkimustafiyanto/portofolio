<script setup lang="ts">
import { projects } from '../../constants/projects'
</script>

<template>
  <BaseSection
    id="projects"
    override="
      mx-auto
      max-w-7xl
      px-6
      py-12
    "
  >
    <div class="mb-10 text-sm tracking-[0.3em]">FEATURED PROJECTS</div>

    <div class="space-y-4">
      <article
        v-for="project in projects"
        :key="project.id"
        class="group rounded-3xl border border-border/70 bg-background/60 p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1"
      >
        <NuxtLink :to="`/portfolio/projects/${project.slug}`" class="block">
          <div class="flex flex-wrap items-start justify-between gap-6">
            <div class="max-w-2xl">
              <div class="text-sm tracking-[0.3em] text-muted-foreground">
                {{ project.id }}
              </div>

              <h3
                class="mt-4 text-3xl font-light leading-tight transition-transform duration-300 group-hover:translate-x-1 md:text-4xl"
              >
                {{ project.title }}
              </h3>

              <p class="mt-4 max-w-xl leading-relaxed text-muted-foreground">
                {{ project.description }}
              </p>
            </div>

            <div class="text-sm text-muted-foreground">Featured work</div>
          </div>

          <div class="mt-6 flex flex-wrap gap-3">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="rounded-full border border-border/70 px-4 py-2 text-sm"
            >
              {{ tag }}
            </span>
          </div>
          <div class="mt-8 flex items-center gap-2 text-sm font-medium">
            View Case Study

            <span
              class="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
              >→</span
            >
          </div>
        </NuxtLink>
      </article>
    </div>
  </BaseSection>
</template>
