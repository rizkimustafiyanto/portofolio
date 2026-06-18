<script setup lang="ts">
import { animation } from '~/constans/animation'
import { theme } from '~/constans/theme'

type PaginationItem = number | 'ellipsis'

type PaginationMeta = {
  page: number
  limit: number
  totalData: number
  totalPage: number
  hasNext: boolean
  hasPrevious: boolean
}

interface Props {
  meta: PaginationMeta

  siblingCount?: number
  hideIfSinglePage?: boolean

  size?: 'sm' | 'md' | 'lg'

  variant?: 'default' | 'filled' | 'ghost'

  loading?: boolean

  showInfo?: boolean

  previousIcon?: string
  nextIcon?: string
}

const props = withDefaults(defineProps<Props>(), {
  siblingCount: 1,
  hideIfSinglePage: true,

  size: 'sm',

  variant: 'default',

  loading: false,

  showInfo: false,

  previousIcon: 'lucide:chevron-left',
  nextIcon: 'lucide:chevron-right',
})

const emit = defineEmits<{
  'update:page': [page: number]
  pageChange: [page: number]
}>()

const currentPage = computed(() => Math.max(1, props.meta.page))

const totalPages = computed(() => Math.max(1, props.meta.totalPage))

const canRender = computed(() => {
  return !(props.hideIfSinglePage && totalPages.value <= 1)
})

const pages = computed<PaginationItem[]>(() => {
  const page = Math.min(Math.max(1, currentPage.value), totalPages.value)

  const siblingCount = Math.max(0, props.siblingCount)

  if (totalPages.value <= 7) {
    return Array.from({ length: totalPages.value }, (_, index) => index + 1)
  }

  const startPage = Math.max(2, page - siblingCount)

  const endPage = Math.min(totalPages.value - 1, page + siblingCount)

  const showLeftEllipsis = startPage > 2
  const showRightEllipsis = endPage < totalPages.value - 1

  const items: PaginationItem[] = [1]

  if (showLeftEllipsis) {
    items.push('ellipsis')
  }

  for (let page = startPage; page <= endPage; page += 1) {
    items.push(page)
  }

  if (showRightEllipsis) {
    items.push('ellipsis')
  }

  items.push(totalPages.value)

  return items
})

const goToPage = (nextPage: number) => {
  const page = Math.min(Math.max(1, nextPage), totalPages.value)

  if (page === currentPage.value) return

  emit('update:page', page)
  emit('pageChange', page)
}

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return {
        item: 'h-8 min-w-8 px-2 text-xs',
        icon: 'h-3.5 w-3.5',
      }

    case 'lg':
      return {
        item: 'h-11 min-w-11 px-4 text-base',
        icon: 'h-5 w-5',
      }

    default:
      return {
        item: 'h-10 min-w-10 px-3 text-sm',
        icon: 'h-4 w-4',
      }
  }
})

const pageVariantClass = computed(() => {
  switch (props.variant) {
    case 'filled':
      return `
        bg-amber-50
        hover:bg-amber-100

        dark:bg-amber-500/5
        dark:hover:bg-amber-500/10
      `

    case 'ghost':
      return `
        hover:bg-transparent
      `

    default:
      return ''
  }
})

const startItem = computed(() => {
  return (currentPage.value - 1) * props.meta.limit + 1
})

const endItem = computed(() => {
  return Math.min(currentPage.value * props.meta.limit, props.meta.totalData)
})
</script>

<template>
  <div v-if="canRender" class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <div v-if="showInfo" :class="['text-sm', theme.colors.text.muted]">
      Showing
      {{ startItem }}
      -
      {{ endItem }}
      of
      {{ meta.totalData }}
    </div>

    <nav :class="[theme.pagination.shell, 'inline-flex items-center gap-1.5']">
      <button
        type="button"
        :disabled="!meta.hasPrevious || loading"
        :aria-disabled="!meta.hasPrevious || loading"
        :class="[
          theme.pagination.control,

          sizeClass.item,

          pageVariantClass,

          animation.duration.fast,
          'transition-all',

          (!meta.hasPrevious || loading) && 'pointer-events-none opacity-40 saturate-0',
        ]"
        aria-label="Previous page"
        @click="goToPage(currentPage - 1)"
      >
        <slot name="previous">
          <Icon :name="previousIcon" :class="sizeClass.icon" />
        </slot>
      </button>

      <template v-for="item in pages" :key="`${item}-${typeof item}`">
        <span
          v-if="item === 'ellipsis'"
          :class="['inline-flex items-center justify-center px-2', theme.pagination.ellipsis]"
        >
          ...
        </span>

        <button
          v-else
          type="button"
          :title="`Page ${item}`"
          :aria-label="`Go to page ${item}`"
          :aria-current="item === currentPage ? 'page' : undefined"
          :disabled="loading"
          :class="[
            theme.pagination.item,

            sizeClass.item,

            animation.duration.fast,
            'transition-all',

            item === currentPage
              ? theme.pagination.active
              : [theme.pagination.inactive, pageVariantClass],

            loading && 'pointer-events-none opacity-50 animate-pulse',
          ]"
          @click="goToPage(item)"
        >
          <slot name="item" :page="item" :active="item === currentPage">
            {{ item }}
          </slot>
        </button>
      </template>

      <button
        type="button"
        :disabled="!meta.hasNext || loading"
        :aria-disabled="!meta.hasNext || loading"
        :class="[
          theme.pagination.control,

          sizeClass.item,

          pageVariantClass,

          animation.duration.fast,
          'transition-all',

          (!meta.hasNext || loading) && 'pointer-events-none opacity-40 saturate-0',
        ]"
        aria-label="Next page"
        @click="goToPage(currentPage + 1)"
      >
        <slot name="next">
          <Icon :name="nextIcon" :class="sizeClass.icon" />
        </slot>
      </button>
    </nav>
  </div>
</template>
