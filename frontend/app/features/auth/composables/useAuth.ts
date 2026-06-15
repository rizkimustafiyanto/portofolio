import { AUTH_LOGIN_ROUTE, MANAGEMENT_ROUTE, TOKEN_COOKIE_KEY } from '~/constans'
import { useAuthService } from '../services/graphql'
import type { LoginPayload } from '../types/login'
import { useToast } from '~/composables/useToast'
import { loginSchema } from '../schemas/login-schema'

type UseAuthReturn = {
  login: (payload: LoginPayload) => Promise<void>
  logout: (redirect?: boolean) => Promise<void>
  fetchMe: () => Promise<boolean>
  errors: Ref<Record<string, string>>
  validate: (data: LoginPayload) => boolean
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

  const logout = async (redirect = true): Promise<void> => {
    token.value = null
    store.clearAuth()

    if (redirect) {
      await navigateTo(AUTH_LOGIN_ROUTE)
    }
  }

  const fetchMe = async (): Promise<boolean> => {
    try {
      const res = await authService.getMe()
      store.user = res.me
      store.setAuthChecked(true)
      return true
    } catch (error) {
      void error
      await logout(false)
      store.setAuthChecked(true)
      return false
    }
  }

  const { errors, validate } = useZodForm(loginSchema)

  return {
    login,
    logout,
    fetchMe,
    errors,
    validate,
  }
}
