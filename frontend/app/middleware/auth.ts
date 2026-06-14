import { AUTH_LOGIN_ROUTE, TOKEN_COOKIE_KEY } from '~/constans'
import { useAuth } from '~/features/auth/composables/useAuth'
import { useUiStore } from '~/stores/ui.store'

export default defineNuxtRouteMiddleware(async () => {
  const token = useCookie(TOKEN_COOKIE_KEY).value
  const store = useAuthStore()
  const ui = useUiStore()

  if (!token) {
    return navigateTo(AUTH_LOGIN_ROUTE)
  }

  if (store.authChecked && store.user) {
    return
  }

  ui.startLoading('Menyiapkan dashboard...')

  try {
    const { fetchMe } = useAuth()
    const isValid = await fetchMe()

    if (!isValid) {
      return navigateTo(AUTH_LOGIN_ROUTE)
    }
  } finally {
    ui.stopLoading()
  }
})
