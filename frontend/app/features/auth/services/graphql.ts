import { useGraphqlClient } from '~/services/graphql'
import { LOGIN_MUTATION, ME_QUERY } from '../graphql'

import type {
  LoginPayload,
} from '../types/login'
import type { LoginMutationResponse, MeQueryResponse } from '../types/graphql'

export const useAuthService = () => {
  const client = useGraphqlClient()

  return {
    login(payload: LoginPayload) {
      return client.request<LoginMutationResponse>(
        LOGIN_MUTATION,
        { input: payload },
      )
    },

    getMe() {
      return client.request<MeQueryResponse>(
        ME_QUERY,
      )
    },
  }
}