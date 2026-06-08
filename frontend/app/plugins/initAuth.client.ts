import { TOKEN_COOKIE_KEY } from '~/constans'
import { useAuth } from "~/features/auth/composables/useAuth"

export default defineNuxtPlugin(async () => {
  const token = useCookie<string | null>(TOKEN_COOKIE_KEY)
  const store = useAuthStore()

  const { fetchMe } = useAuth()

  if (token.value && !store.user) {
    await fetchMe()
  }
})
