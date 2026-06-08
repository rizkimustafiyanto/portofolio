type RuntimeEnv = NodeJS.ProcessEnv

const DEFAULT_PORT = 3000
const DEFAULT_NITRO_HOST = '0.0.0.0'
const DEFAULT_PUBLIC_API_HOST = 'localhost'

function readPort(value: string | undefined, fallback: number): number {
  const parsedPort = Number(value)

  return Number.isFinite(parsedPort) && parsedPort > 0 ? parsedPort : fallback
}

function readText(value: string | undefined, fallback: string): string {
  const trimmedValue = value?.trim()

  return trimmedValue ? trimmedValue : fallback
}

export function resolveServerConfig(
  env: RuntimeEnv = process.env,
): { host: string; port: number } {
  return {
    host: readText(env.NITRO_HOST, DEFAULT_NITRO_HOST),
    port: readPort(env.NITRO_PORT ?? env.PORT, DEFAULT_PORT),
  }
}

export function resolveRuntimeConfig(
  env: RuntimeEnv = process.env,
): { public: { apiBase: string } } {
  const explicitBaseUrl = env.NUXT_PUBLIC_API_BASE?.trim()

  return {
    public: {
      apiBase:
        explicitBaseUrl ??
        `http://${readText(env.NUXT_PUBLIC_API_HOST, DEFAULT_PUBLIC_API_HOST)}:${readPort(
          env.NITRO_PORT ?? env.PORT,
          DEFAULT_PORT,
        )}`,
    },
  }
}
