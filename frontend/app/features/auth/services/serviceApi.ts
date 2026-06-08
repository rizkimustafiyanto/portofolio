import { api } from '~/services/api'
import type { ApiResponse } from '~/types/api';
import type { LoginPayload, LoginResponse } from '../types/login';

export const authService = {
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

// Composable-friendly version
export const useAuthService = (): typeof authService => authService
