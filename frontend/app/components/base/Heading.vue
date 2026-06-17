<script setup lang="ts">
import { animation } from '~/constans/animation'
import { theme } from '~/constans/theme'

interface Props {
  eyebrow?: string
  title: string
  description?: string
  center?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  center: false,
  size: 'xs',
  eyebrow: undefined,
  description: undefined,
})

const headingConfig = computed(() => {
  const variants = {
     xs: {
      title: 'text-xl md:text-2xl',
      eyebrow: 'mb-1',
      description: 'mt-2',
    },

    sm: {
      title: 'text-2xl md:text-3xl',
      eyebrow: 'mb-2',
      description: 'mt-3',
    },

    md: {
      title: 'text-3xl md:text-5xl',
      eyebrow: 'mb-3',
      description: 'mt-5',
    },

    lg: {
      title: 'text-5xl md:text-7xl',
      eyebrow: 'mb-5',
      description: 'mt-8',
    },
  }

  return variants[props.size]
})
</script>

<template>
  <div :class="[center ? 'text-center' : 'text-left']">
    <!-- Wrapper agar semua elemen memiliki starting point yang sama -->
    <div :class="[center ? 'mx-auto max-w-3xl' : 'max-w-3xl']">
      <p
        v-if="eyebrow"
        :class="[
          headingConfig.eyebrow,
          'text-sm uppercase tracking-[0.3em]',
          'text-amber-700 dark:text-amber-300',
          animation.duration.normal,
        ]"
      >
        {{ eyebrow }}
      </p>

      <h2
        :class="[
          headingConfig.title,
          'font-light leading-tight tracking-tight',
          theme.colors.text.primary,
          animation.duration.normal,
        ]"
      >
        {{ title }}
      </h2>

      <p
        v-if="description"
        :class="[
          headingConfig.description,
          'text-sm leading-relaxed md:text-base',
          theme.colors.text.secondary,
          animation.duration.normal,
        ]"
      >
        {{ description }}
      </p>
    </div>
  </div>
</template>
