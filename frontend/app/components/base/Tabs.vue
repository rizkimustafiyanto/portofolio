<script setup lang="ts">
import { theme } from '~/constans/theme'

export interface TabItem {
  value: string
  label: string
  disabled?: boolean
}

interface Props {
  modelValue: string
  items: TabItem[]
}

defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

const selectTab = (value: string, disabled?: boolean) => {
  if (disabled) return

  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<template>
  <div :class="theme.tabs.root">
    <div role="tablist" :class="theme.tabs.list">
      <button
        v-for="tab in items"
        :key="tab.value"
        role="tab"
        :aria-selected="modelValue === tab.value"
        :disabled="tab.disabled"
        :class="[
          theme.tabs.trigger,

          modelValue === tab.value ? theme.tabs.active : theme.tabs.inactive,

          tab.disabled && 'pointer-events-none opacity-40 saturate-0',
        ]"
        @click="selectTab(tab.value, tab.disabled)"
      >
        <slot name="label" :tab="tab" :active="modelValue === tab.value">
          {{ tab.label }}
        </slot>
      </button>
    </div>

    <div :class="theme.tabs.panel">
      <slot :active-tab="modelValue" />
    </div>
  </div>
</template>
