import { AUTH_LOGIN_ROUTE, MANAGEMENT_ROUTE, TOKEN_COOKIE_KEY } from '~/constans'
import { useAuthService } from '../services/graphql'
import type { LoginPayload } from "../types/login"
import { useToast } from '~/composables/useToast'

type UseAuthReturn = {
  login: (payload: LoginPayload) => Promise<void>
  logout: () => Promise<void>
  fetchMe: () => Promise<void>
}

  export const useAuth = (): UseAuthReturn => {
    const authService = useAuthService()
    const store = useAuthStore()
    const token = useCookie<string | null>(TOKEN_COOKIE_KEY)
    const toast = useToast()

    const login = async (payload: LoginPayload) => {
    try {
      const res = await authService.login(payload)

      token.value = res.login.token

      store.setAuth({
        user: res.login.user,
        token: res.login.token,
      })

      toast.success('Login berhasil')

      await navigateTo(MANAGEMENT_ROUTE)
    } catch (err) {
      toast.error(extractGraphqlError(err))
      return
    }
  }

  const logout = async (): Promise<void> => {
    token.value = null
    store.clearAuth()
    await navigateTo(AUTH_LOGIN_ROUTE)
  }

  const fetchMe = async (): Promise<void> => {
    try {
      const res = await authService.getMe()
      store.user = res.me
    } catch (error) {
      void error
      await logout()
    }
  }

  return {
    login,
    logout,
    fetchMe,
  }
}
