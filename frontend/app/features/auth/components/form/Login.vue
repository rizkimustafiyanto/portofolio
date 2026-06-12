<script setup lang="ts">
import { useSubmitGuard } from '~/composables/useSubmitGuard'
import { useAuth } from '../../composables/useAuth'
import { loginSchema } from '../../schemas/loginSchema'
import type { LoginForm } from '../../schemas/loginSchema'

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
  <form class="space-y-4" @submit.prevent="onSubmit">
    <BaseInput v-model="form.email" label="Email" type="email" required :error="errors.email" />

    <BaseInput
      v-model="form.password"
      label="Password"
      type="password"
      required
      :error="errors.password"
    />

    <BaseButton type="submit" :loading="loading" variant="filled"> Login </BaseButton>
  </form>
</template>
