import { GraphQLClient } from 'graphql-request'
import { TOKEN_COOKIE_KEY } from '~/constans'
import { useUiStore } from '~/stores/ui.store'

export const useGraphqlClient = () => {
  const config = useRuntimeConfig()
  const token = useCookie<string | null>(TOKEN_COOKIE_KEY)
  const ui = useUiStore()

  const client = new GraphQLClient(`${config.public.apiBase}/graphql`, {
    headers: token.value
      ? {
          Authorization: `Bearer ${token.value}`,
        }
      : {},
  })

  const request = async <T>(query: string, variables?: any): Promise<T> => {
    ui.startLoading()

    try {
      return await client.request<T>(query, variables)
    } finally {
      ui.stopLoading()
    }
  }

  return {
    request,
  }
}
