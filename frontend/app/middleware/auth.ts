import { AUTH_LOGIN_ROUTE, TOKEN_COOKIE_KEY } from '~/constans'

export default defineNuxtRouteMiddleware(() => {
  const token = useCookie(TOKEN_COOKIE_KEY).value

  if (!token) {
    return navigateTo(AUTH_LOGIN_ROUTE)
  }
})
