<script setup lang="ts">
import { animation } from '~/constans/animation'
import { theme } from '~/constans/theme'

interface Props {
  modelValue: boolean
  title?: string
  description?: string
  closeOnOverlayClick?: boolean
  showCloseButton?: boolean
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  description: '',
  closeOnOverlayClick: true,
  showCloseButton: true,
  maxWidth: 'md',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const maxWidthClass = computed(() => {
  const map: Record<NonNullable<Props['maxWidth']>, string> = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  }

  return map[props.maxWidth]
})

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleOverlayClick = () => {
  if (!props.closeOnOverlayClick) return
  close()
}

watch(
  () => props.modelValue,
  (open) => {
    if (!import.meta.client) return
    document.body.style.overflow = open ? 'hidden' : ''
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  if (!import.meta.client) return
  document.body.style.overflow = ''
})

const onKeydown = (event: KeyboardEvent) => {
  if (event.key !== 'Escape' || !props.modelValue) return
  close()
}

onMounted(() => {
  if (!import.meta.client) return
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  if (!import.meta.client) return
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[999] flex items-center justify-center px-4 py-6"
        aria-modal="true"
        role="dialog"
      >
        <button
          type="button"
          class="absolute inset-0 cursor-default bg-black/50 backdrop-blur-sm"
          :aria-label="closeOnOverlayClick ? 'Close modal' : 'Modal overlay'"
          @click="handleOverlayClick"
        />

        <div
          :class="[
            'relative w-full overflow-hidden rounded-3xl border shadow-2xl transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
            maxWidthClass,
            theme.colors.surface,
            theme.colors.border,
            animation.duration.normal,
          ]"
        >
          <div
            class="flex items-start justify-between gap-4 border-b border-black/5 px-6 py-5 dark:border-white/10"
          >
            <div class="space-y-1">
              <h2 v-if="title" :class="['text-lg font-semibold', theme.colors.text.primary]">
                {{ title }}
              </h2>

              <p v-if="description" :class="['text-sm', theme.colors.text.secondary]">
                {{ description }}
              </p>
            </div>

            <button
              v-if="showCloseButton"
              type="button"
              class="rounded-full p-2 text-slate-500 transition hover:bg-black/5 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"
              @click="close"
            >
              <span class="sr-only">Close modal</span>
              <svg
                viewBox="0 0 24 24"
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          <div class="max-h-[calc(100vh-8rem)] overflow-y-auto px-6 py-5">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
