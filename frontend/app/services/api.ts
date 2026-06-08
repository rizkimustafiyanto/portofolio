import { AUTH_LOGIN_ROUTE, TOKEN_COOKIE_KEY } from '~/constans'
import type { ApiErrorResponse } from "~/types/api"

type FetchClient = ReturnType<typeof $fetch.create>

export const useApi = (): FetchClient => {
  const config = useRuntimeConfig()
  const base = String(config.public.apiBase)

  return $fetch.create({
    baseURL: base,

    async onRequest({ options }: any): Promise<void> {
      const token = useCookie(TOKEN_COOKIE_KEY).value
      const headers = new Headers(options.headers)

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      options.headers = headers
    },

    async onResponseError({ response }: any): Promise<void> {
      if (response.status === 401) {
        const token = useCookie(TOKEN_COOKIE_KEY)
        token.value = null
        useAuthStore().clearAuth()

        navigateTo(AUTH_LOGIN_ROUTE)
      }

      if (response.status === 403) {
        throw createError<ApiErrorResponse>({
          statusCode: 403,
          message: 'You do not have permission to access this resources'
        })
      }

      if (response.status >= 500) {
        throw createError<ApiErrorResponse>({
          statusCode: response.status,
          message: 'An error occured while processing your request. Please try again later.'
        })
      }
    },
  })
}

// Export instance untuk compatibility dengan service imports
export const api = useApi()
