<script setup lang="ts">
import { animation } from '~/constans/animation'

type ScrollMode = 'next' | 'top' | 'anchor'

interface Props {
  mode?: ScrollMode
  targetSelector?: string
  anchor?: string
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'next',
  targetSelector: 'section[id]',
  anchor: '',
  label: 'Scroll',
})

const router = useRouter()
const route = useRoute()

const isVisible = ref(false)

const updateVisibility = () => {
  if (!import.meta.client) {
    return
  }

  if (props.mode === 'top') {
    isVisible.value = window.scrollY > 120
    return
  }

  const targets = Array.from(document.querySelectorAll<HTMLElement>(props.targetSelector)).filter(
    (section) => section.getBoundingClientRect().height > 0,
  )

  if (props.mode === 'anchor') {
    isVisible.value = Boolean(props.anchor)
    return
  }

  isVisible.value = targets.length > 0
}

const scrollNext = () => {
  if (!import.meta.client) {
    return
  }

  if (props.mode === 'top') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    return
  }

  if (props.mode === 'anchor') {
    const target = props.anchor.startsWith('#') ? props.anchor : `#${props.anchor}`
    const el = document.querySelector<HTMLElement>(target)

    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    } else if (props.anchor) {
      router.push({
        path: route.path,
        hash: target,
      })
    }

    return
  }

  const sections = Array.from(document.querySelectorAll<HTMLElement>(props.targetSelector)).filter(
    (section) => section.getBoundingClientRect().height > 0,
  )

  const currentOffset = window.scrollY + window.innerHeight * 0.25
  const nextSection = sections.find((section) => section.offsetTop > currentOffset)

  if (nextSection) {
    nextSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
    return
  }

  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  })
}

onMounted(() => {
  updateVisibility()
  window.addEventListener('scroll', updateVisibility, { passive: true })
  window.addEventListener('resize', updateVisibility)
})

onBeforeUnmount(() => {
  if (!import.meta.client) {
    return
  }

  window.removeEventListener('scroll', updateVisibility)
  window.removeEventListener('resize', updateVisibility)
})

watch(
  () => [props.mode, props.targetSelector, props.anchor, route.path],
  () => updateVisibility(),
)
</script>

<template>
  <button
    v-if="isVisible"
    type="button"
    :class="[
      'fixed z-20 w-20 flex flex-col items-center gap-2 rounded-full px-2 py-2 opacity-45 transition-all hover:-translate-y-0.5 hover:opacity-100 focus:outline-none focus:opacity-100',
      mode === 'top' ? 'bottom-24 right-6' : 'bottom-6 right-6',
      animation.duration.normal,
    ]"
    :aria-label="
      mode === 'top'
        ? 'Scroll to top'
        : mode === 'anchor'
          ? 'Scroll to anchor'
          : 'Scroll to next section'
    "
    @click="scrollNext"
  >
    <span
      :class="['text-[0.65rem] uppercase tracking-[0.28em]', 'text-slate-500 dark:text-slate-400']"
    >
      {{ label }}
    </span>

    <div
      :class="[
        'flex h-10 w-5 justify-center rounded-full border',
        'border-slate-300/70 dark:border-slate-700/80',
      ]"
    >
      <div
        :class="[
          'mt-2 h-1.5 w-1.5 animate-bounce rounded-full',
          'bg-slate-500 dark:bg-slate-400',
          animation.duration.fast,
        ]"
      />
    </div>
  </button>
</template>
