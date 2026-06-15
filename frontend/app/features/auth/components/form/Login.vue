<script setup lang="ts">
import { useSubmitGuard } from '~/composables/useSubmitGuard'
import { useAuth } from '../../composables/useAuth'
import { loginSchema } from '../../schemas/login-schema'
import type { LoginForm } from '../../schemas/login-schema'

const form = reactive<LoginForm>({
  email: '',
  password: '',
})

const { errors, validate } = useZodForm(loginSchema)

const { login } = useAuth()

const { loading, wrap } = useSubmitGuard()

const onSubmit = async (): Promise<void> => {
  const isValid = validate(form)
  if (!isValid) return

  await wrap(async () => {
    await login(form)
  })
}
</script>

<template>
  <div class="w-[360px] space-y-6 text-center p-8 border rounded-md">
    <div class="mx-auto max-w-3xl text-center">
      <p class="mb-3 text-sm uppercase tracking-[0.3em] text-amber-700 dark:text-amber-300">
        Welcome back
      </p>

      <h2 class="text-4xl font-normal leading-tight text-slate-800 dark:text-slate-50 md:text-6xl">
        Login
      </h2>

      <p class="mt-6 text-sm leading-normal text-slate-600 dark:text-slate-300">
        Fill the form with right email n password
      </p>
    </div>

    <BaseForm as="form" class="text-left" :loading="loading" @submit="onSubmit">
      <BaseFormField label="Email" required :error="errors.email">
        <BaseInput v-model="form.email" type="email" />
      </BaseFormField>

      <BaseFormField label="Password" required :error="errors.password">
        <BaseInput v-model="form.password" type="password" />
      </BaseFormField>

      <BaseButton type="submit" :loading="loading" variant="filled" add-style="rounded-xl w-full">
        Login
      </BaseButton>
    </BaseForm>
  </div>
</template>
