<script setup lang="ts" generic="T extends Record<string, unknown>">
import { animation } from '~/constans/animation'
import { theme } from '~/constans/theme'

export type TableColumn<TItem extends Record<string, unknown>> = {
  key: keyof TItem | string
  label: string
  headerClass?: string
  cellClass?: string
  align?: 'left' | 'center' | 'right'
}

interface Props {
  items?: T[]
  columns?: TableColumn<T>[]

  rowKey?: keyof T | ((item: T, index: number) => string | number)

  striped?: boolean
  hoverable?: boolean

  loading?: boolean

  variant?: 'default' | 'filled' | 'ghost'
  size?: 'sm' | 'md' | 'lg'

  emptyText?: string
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  columns: () => [],

  rowKey: undefined,

  striped: true,
  hoverable: true,

  loading: false,

  variant: 'default',
  size: 'md',

  emptyText: 'No data available.',
})

const getValue = (item: T, key: keyof T | string) => {
  return item[key as keyof T]
}

const getRowKey = (item: T, index: number) => {
  if (typeof props.rowKey === 'function') {
    return props.rowKey(item, index)
  }

  if (props.rowKey) {
    return String(item[props.rowKey])
  }

  return index
}

const headerAlignClass = (align?: TableColumn<T>['align']) => {
  if (align === 'center') return 'text-center'
  if (align === 'right') return 'text-right'

  return 'text-left'
}

const cellAlignClass = (align?: TableColumn<T>['align']) => {
  if (align === 'center') return 'justify-center'
  if (align === 'right') return 'justify-end'

  return 'justify-between'
}

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return {
        header: 'px-3 py-2 text-xs',
        cell: 'px-3 py-2 text-sm',
      }

    case 'lg':
      return {
        header: 'px-6 py-5 text-base',
        cell: 'px-6 py-5 text-base',
      }

    default:
      return {
        header: 'px-5 py-4 text-sm',
        cell: 'px-5 py-4 text-sm',
      }
  }
})

const variantClass = computed(() => {
  switch (props.variant) {
    case 'filled':
      return `
        bg-muted
        border-transparent
      `

    case 'ghost':
      return `
        bg-transparent
        border-transparent
      `

    default:
      return `
        ${theme.colors.surface}
        border-black/10
      `
  }
})
</script>

<template>
  <div
    :class="[
      theme.table.shell,
      variantClass,
      animation.duration.normal,
      'transition-all overflow-hidden',
    ]"
  >
    <div class="overflow-x-auto">
      <table class="base-table min-w-full border-separate border-spacing-0">
        <thead v-if="$slots.header || columns.length" :class="theme.table.header">
          <slot name="header" :columns="columns">
            <tr>
              <th
                v-for="column in columns"
                :key="String(column.key)"
                :class="[
                  sizeClass.header,
                  headerAlignClass(column.align),
                  column.headerClass,
                  'border-b font-medium',
                ]"
              >
                {{ column.label }}
              </th>
            </tr>
          </slot>
        </thead>

        <tbody v-if="loading">
          <slot name="loading">
            <tr>
              <td
                :colspan="Math.max(columns.length, 1)"
                class="px-5 py-10 text-center text-sm text-muted-foreground"
              >
                Loading...
              </td>
            </tr>
          </slot>
        </tbody>

        <tbody v-else-if="$slots.body || items.length">
          <slot name="body" :items="items" :columns="columns" :get-value="getValue">
            <tr
              v-for="(item, rowIndex) in items"
              :key="getRowKey(item, rowIndex)"
              :class="[
                theme.table.row,

                hoverable && 'hover:bg-slate-50/70 dark:hover:bg-white/5',

                striped && rowIndex % 2 === 1 && 'bg-slate-50/40 dark:bg-white/3',

                animation.duration.fast,
                'transition-colors',
              ]"
            >
              <td
                v-for="column in columns"
                :key="String(column.key)"
                :data-label="column.label"
                :class="[
                  sizeClass.cell,

                  column.cellClass,

                  cellAlignClass(column.align),

                  'border-b',
                ]"
              >
                <slot
                  :name="`cell-${String(column.key)}`"
                  :item="item"
                  :value="getValue(item, column.key)"
                  :column="column"
                  :row-index="rowIndex"
                >
                  {{ getValue(item, column.key) }}
                </slot>
              </td>
            </tr>
          </slot>
        </tbody>

        <tbody v-else>
          <tr>
            <td
              :colspan="Math.max(columns.length, 1)"
              class="px-5 py-10 text-center text-sm text-muted-foreground"
            >
              <slot name="empty">
                {{ emptyText }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.base-table {
  width: 100%;
}

@media (max-width: 767px) {
  .base-table :deep(thead) {
    display: none;
  }

  .base-table,
  .base-table :deep(tbody),
  .base-table :deep(tr),
  .base-table :deep(td),
  .base-table :deep(th) {
    display: block;
    width: 100%;
  }

  .base-table :deep(tbody) {
    padding: 0.75rem;
  }

  .base-table :deep(tr) {
    margin-bottom: 0.75rem;
    overflow: hidden;
    border-radius: 1rem;
    border: 1px solid rgb(226 232 240 / 0.8);
    background: rgb(255 255 255 / 0.86);
  }

  :global(.dark) .base-table :deep(tr) {
    border-color: rgb(51 65 85 / 1);
    background: rgb(15 23 42 / 0.72);
  }

  .base-table :deep(td) {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;

    border-bottom: 1px solid rgb(226 232 240 / 0.8);
    padding: 0.9rem 1rem;
  }

  :global(.dark) .base-table :deep(td) {
    border-bottom-color: rgb(51 65 85 / 1);
  }

  .base-table :deep(td::before) {
    content: attr(data-label);

    flex: 0 0 40%;

    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.02em;

    color: rgb(100 116 139 / 1);
  }

  :global(.dark) .base-table :deep(td::before) {
    color: rgb(148 163 184 / 1);
  }

  .base-table :deep(td:last-child) {
    border-bottom: none;
  }

  .base-table :deep(td > *) {
    text-align: right;
  }
}
</style>
