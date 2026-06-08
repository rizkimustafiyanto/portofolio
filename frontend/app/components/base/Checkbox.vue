<script setup lang="ts">
interface Props {
  modelValue: boolean

  label?: string
  error?: string
}

defineProps<Props>()

defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<template>
  <BaseFormField :error="error">
    <label class="flex items-center gap-2">
      <input
        type="checkbox"
        :checked="modelValue"
        @change="
          $emit(
            'update:modelValue',
            ($event.target as HTMLInputElement).checked
          )
        "
      >

      <span>
        {{ label }}
      </span>
    </label>
  </BaseFormField>
</template>