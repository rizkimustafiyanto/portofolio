<script setup lang="ts">
interface Props {
  modelValue: string | number

  type?:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'tel'

  placeholder?: string
  disabled?: boolean
  readonly?: boolean

  label?: string
  error?: string
  helperText?: string
  required?: boolean
}

withDefaults(
  defineProps<Props>(),
  {
    type: 'text',
    disabled: false,
    readonly: false,
    placeholder: '',
    label: '',
    error: '',
    helperText: '',
  },
)

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <BaseFormField
    :label="label"
    :error="error"
    :required="required"
    :helper-text="helperText"
  >
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :class="[
        'w-full rounded-lg border px-3 py-2 outline-none transition',
        error
          ? 'border-red-500'
          : 'border-gray-300 focus:border-blue-500',
      ]"
      @input="
        $emit(
          'update:modelValue',
          ($event.target as HTMLInputElement).value
        )
      "
    >
  </BaseFormField>
</template>