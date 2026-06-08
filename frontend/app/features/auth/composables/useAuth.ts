import { AUTH_LOGIN_ROUTE, MANAGEMENT_ROUTE, TOKEN_COOKIE_KEY } from '~/constans'
import { useAuthService } from '../services/serviceApi'
import type { LoginPayload } from "../types/login"

type UseAuthReturn = {
  login: (payload: LoginPayload) => Promise<void>
  logout: () => void
  fetchMe: () => Promise<void>
}

export const useAuth = (): UseAuthReturn => {
  const authService = useAuthService()
  const store = useAuthStore()
  const token = useCookie<string | null>(TOKEN_COOKIE_KEY)

  const login = async (payload: LoginPayload): Promise<void> => {
    const res = await authService.login(payload)

    token.value = res.data.token

    store.setAuth({
      user: res.data.user,
      token: res.data.token
    })

    navigateTo(MANAGEMENT_ROUTE)
  }

  const logout = (): void => {
    token.value = null
    store.clearAuth()
    navigateTo(AUTH_LOGIN_ROUTE)
  }

  const fetchMe = async (): Promise<void> => {
    try {
      const res = await authService.getMe()
      store.user = res.data.user
    } catch (error) {
      void error
      logout()
    }
  }

  return {
    login,
    logout,
    fetchMe,
  }
}
