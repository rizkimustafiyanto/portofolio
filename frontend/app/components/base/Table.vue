<script setup lang="ts" generic="T extends Record<string, unknown>">
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
  emptyText?: string
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  columns: () => [],
  rowKey: undefined,
  striped: true,
  emptyText: 'No data available.',
})

const getValue = (item: T, key: keyof T | string) => item[key as keyof T]

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
</script>

<template>
  <div :class="[theme.colors.table.shell, 'overflow-hidden']">
    <div class="overflow-x-auto">
      <table class="base-table min-w-full border-separate border-spacing-0">
        <thead v-if="$slots.header || columns.length" :class="theme.colors.table.header">
          <slot name="header" :columns="columns">
            <tr>
              <th
                v-for="column in columns"
                :key="String(column.key)"
                class="border-b px-5 py-4 text-sm font-medium"
                :class="[headerAlignClass(column.align), column.headerClass]"
              >
                {{ column.label }}
              </th>
            </tr>
          </slot>
        </thead>

        <tbody v-if="$slots.body || items.length">
          <slot name="body" :items="items" :columns="columns" :get-value="getValue">
            <tr
              v-for="(item, rowIndex) in items"
              :key="getRowKey(item, rowIndex)"
              :class="[
                theme.colors.table.row,
                striped && rowIndex % 2 === 1 && 'bg-slate-50/40 dark:bg-white/3',
              ]"
            >
              <td
                v-for="column in columns"
                :key="String(column.key)"
                :data-label="column.label"
                class="border-b px-5 py-4"
                :class="[column.cellClass, cellAlignClass(column.align)]"
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

          <tr v-if="!items.length">
            <td
              :colspan="Math.max(columns.length, 1)"
              class="px-5 py-10 text-center text-sm text-muted-foreground"
            >
              {{ emptyText }}
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
    border-radius: 1.5rem;
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
