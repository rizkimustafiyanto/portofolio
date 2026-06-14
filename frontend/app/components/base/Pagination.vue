<script setup lang="ts">
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
}

const props = withDefaults(defineProps<Props>(), {
  siblingCount: 1,
  hideIfSinglePage: true,
})

const emit = defineEmits<{
  'update:page': [page: number]
  pageChange: [page: number]
}>()

const currentPage = computed(() => Math.max(1, props.meta.page))
const totalPages = computed(() => Math.max(1, props.meta.totalPage))

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

const canRender = computed(() => !(props.hideIfSinglePage && totalPages.value <= 1))

const goToPage = (nextPage: number) => {
  const page = Math.min(Math.max(1, nextPage), totalPages.value)
  if (page === currentPage.value) return

  emit('update:page', page)
  emit('pageChange', page)
}
</script>

<template>
  <nav
    v-if="canRender"
    :class="[theme.colors.pagination.shell, 'inline-flex items-center gap-1']"
    aria-label="Pagination"
  >
    <button
      type="button"
      :class="[
        theme.colors.pagination.control,
        !props.meta.hasPrevious && 'pointer-events-none opacity-50',
      ]"
      :disabled="!props.meta.hasPrevious"
      aria-label="Previous page"
      @click="goToPage(currentPage - 1)"
    >
      <slot name="previous">
        <span aria-hidden="true">
          {{ `<` }}
        </span>
      </slot>
    </button>

    <template v-for="item in pages" :key="`${item}-${typeof item}`">
      <span v-if="item === 'ellipsis'" :class="['px-2 text-sm', theme.colors.pagination.ellipsis]">
        <slot name="ellipsis">...</slot>
      </span>

      <button
        v-else
        type="button"
        :class="[
          theme.colors.pagination.item,
          item === currentPage ? theme.colors.pagination.active : theme.colors.pagination.inactive,
          !props.meta.hasNext && item > currentPage && 'pointer-events-none opacity-50',
        ]"
        :aria-current="item === currentPage ? 'page' : undefined"
        :disabled="false"
        @click="goToPage(item)"
      >
        <slot name="item" :page="item" :active="item === currentPage">
          {{ item }}
        </slot>
      </button>
    </template>

    <button
      type="button"
      :class="[
        theme.colors.pagination.control,
        !props.meta.hasNext && 'pointer-events-none opacity-50',
      ]"
      :disabled="!props.meta.hasNext"
      aria-label="Next page"
      @click="goToPage(currentPage + 1)"
    >
      <slot name="next">
        <span aria-hidden="true">></span>
      </slot>
    </button>
  </nav>
</template>
