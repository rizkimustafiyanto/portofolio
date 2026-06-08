<script setup lang="ts">
import { MANAGEMENT_ROUTE, TOKEN_COOKIE_KEY } from '~/constans'
import { loginSchema } from '../schemas/loginSchema'
import type { LoginForm } from '../schemas/loginSchema'

const form = reactive<LoginForm>({
  email: '',
  password: '',
})

const { errors, validate } = useZodForm(loginSchema)
const store = useAuthStore()
const router = useRouter()

const onSubmit = (): void => {
  const validationErrors = validate(form)
  if (validationErrors) return

  const token = 'dev-token'
  useCookie(TOKEN_COOKIE_KEY).value = token

  store.setAuth({
    user: createDemoUser(form.email),
    token,
  })

  router.push(MANAGEMENT_ROUTE)
}

</script>

<template>
  <form
    class="space-y-4"
    @submit.prevent="onSubmit"
  >
    <BaseInput
      v-model="form.email"
      label="Email"
      type="email"
      required
      :error="errors.email"
    />

    <BaseInput
      v-model="form.password"
      label="Password"
      type="password"
      required
      :error="errors.password"
    />

    <button type="submit">
      Login
    </button>
  </form>
</template>
