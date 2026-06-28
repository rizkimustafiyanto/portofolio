import { routes, TOKEN_COOKIE_KEY } from '~/constans'
import { useAuth } from '~/features/auth/composables/useAuth'
import { useUiStore } from '~/stores/ui.store'

export default defineNuxtRouteMiddleware(async () => {
  const token = useCookie(TOKEN_COOKIE_KEY).value
  const store = useAuthStore()
  const ui = useUiStore()

  if (!token) return

  if (store.authChecked) {
    if (store.user) {
      return navigateTo(routes.MANAGEMENT_ROUTE)
    }

    return
  }

  ui.startLoading('Menyiapkan dashboard...')

  try {
    const { fetchMe } = useAuth()
    const isValid = await fetchMe()

    if (isValid) {
      return navigateTo(routes.MANAGEMENT_ROUTE)
    }
  } finally {
    ui.stopLoading()
  }
})
