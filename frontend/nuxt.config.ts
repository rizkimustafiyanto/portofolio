import { resolveRuntimeConfig, resolveServerConfig } from './config/runtime'

export default defineNuxtConfig({
  compatibilityDate: '2024-12-19',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/eslint',
  ],
  css: ['~/assets/css/main.css'],
  typescript: {
    strict: true,
  },
  pinia: {
    storesDirs: ['features/auth/stores'],
  },
  imports: {
    dirs: [
      'app/constans',
      'app/composables',
      'app/services',
      'app/utils',
      'app/features/auth/composables',
      'app/features/auth/services',
      'app/features/project/composables',
    ],
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
    {
      path: '~/features',
      extensions: ['vue'],
      pathPrefix: false,
    },
  ],
  devServer: resolveServerConfig(),
  runtimeConfig: resolveRuntimeConfig(),
})
