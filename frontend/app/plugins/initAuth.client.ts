import { TOKEN_COOKIE_KEY } from '~/constans'

export default defineNuxtPlugin(async () => {
  const token = useCookie<string | null>(TOKEN_COOKIE_KEY)
  const store = useAuthStore()

  if (token.value && store.token !== token.value) {
    store.token = token.value
  }
})
