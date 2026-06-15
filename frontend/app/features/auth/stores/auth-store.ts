import type { User } from '~/features/auth/types/login'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    authChecked: false,
  }),
  actions: {
    setAuth(data: { user: User; token: string }) {
      this.user = data.user
      this.token = data.token
      this.authChecked = true
    },
    clearAuth() {
      this.user = null
      this.token = null
      this.authChecked = false
    },
    setAuthChecked(value: boolean) {
      this.authChecked = value
    },
  },
})
