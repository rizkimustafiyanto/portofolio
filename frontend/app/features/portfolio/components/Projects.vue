<script setup lang="ts">
const projects = [
  {
    id: '01',
    title: 'AMMS Dashboard',
    description:
      'Administration Monitoring Management System with role-based navigation, analytics panels, and workflow shortcuts for internal teams.',
    tags: [
      'Vue',
      'Express',
      'PostgreSQL',
      'Charts',
    ],
  },
  {
    id: '02',
    title: 'Laboratory Revamp',
    description:
      'A healthcare platform refresh with clearer patient journeys, faster data entry, and a more trustworthy visual system.',
    tags: [
      'Nuxt',
      'GraphQL',
      'Pinia',
      'Accessibility',
    ],
  },
  {
    id: '03',
    title: 'Portfolio Template',
    description:
      'A content-led personal portfolio concept designed to showcase work, experience, and contact paths without feeling overly busy.',
    tags: [
      'Nuxt',
      'Tailwind',
      'Motion',
    ],
  },
]
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
    <div
      class="
        mb-10
        text-sm
        tracking-[0.3em]
      "
    >
      FEATURED PROJECTS
    </div>

    <div class="space-y-4">
      <article
        v-for="project in projects"
        :key="project.id"
        class="
          group
          rounded-3xl
          border
          border-border/70
          bg-background/60
          p-8
          shadow-sm
          transition-transform
          duration-300
          hover:-translate-y-1
        "
      >
        <div class="flex flex-wrap items-start justify-between gap-6">
          <div class="max-w-2xl">
            <div
              class="
                text-sm
                tracking-[0.3em]
                text-muted-foreground
              "
            >
              {{ project.id }}
            </div>

            <h3
              class="
                mt-4
                text-3xl
                font-light
                leading-tight
                transition-transform
                duration-300
                group-hover:translate-x-1
                md:text-4xl
              "
            >
              {{ project.title }}
            </h3>

            <p
              class="
                mt-4
                max-w-xl
                leading-relaxed
                text-muted-foreground
              "
            >
              {{ project.description }}
            </p>
          </div>

          <div class="text-sm text-muted-foreground">
            Featured work
          </div>
        </div>

        <div
          class="
            mt-6
            flex
            flex-wrap
            gap-3
          "
        >
          <span
            v-for="tag in project.tags"
            :key="tag"
            class="
              rounded-full
              border
              border-border/70
              px-4
              py-2
              text-sm
            "
          >
            {{ tag }}
          </span>
        </div>
      </article>
    </div>
  </BaseSection>
</template>
