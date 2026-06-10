import type { ApiResponse } from '~/types/api'
import type { LoginPayload, LoginResponse } from '../types/login'
import { useApiClient } from '~/composables/useApiClient'

export const useAuthService = () => {
  const api = useApiClient()

  return {
    login(payload: LoginPayload): Promise<ApiResponse<LoginResponse>> {
      return api<ApiResponse<LoginResponse>>('/auth/login', {
        method: 'POST',
        body: payload
      })
    },

    getMe(): Promise<ApiResponse<LoginResponse>> {
      return api<ApiResponse<LoginResponse>>('/auth/me', {
        method: 'GET'
      })
    }
  }
}