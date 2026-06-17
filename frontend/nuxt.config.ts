import { resolveRuntimeConfig, resolveServerConfig } from './config/runtime'

export default defineNuxtConfig({
  compatibilityDate: '2024-12-19',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxt/eslint', '@nuxt/icon'],
  css: ['~/assets/css/main.css', 'vue-sonner/style.css'],
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
      'app/features/welcome/composables',
    ],
  },
  components: [
    {
      path: '~/components',
      pathPrefix: true,
    },
    {
      path: '~/features/auth/components',
      prefix: 'Auth',
    },
    {
      path: '~/features/project/components',
      prefix: 'Project',
    },
    {
      path: '~/features/portfolio/components',
      prefix: 'Portfolio',
    },
    {
      path: '~/features/management/components',
      prefix: 'Management',
    },
    {
      path: '~/features/welcome/components',
      prefix: 'Welcome',
    },
  ],
  devServer: resolveServerConfig(),
  runtimeConfig: resolveRuntimeConfig(),
  app: {
    head: {
      title: 'Portfolio',
      meta: [
        {
          name: 'description',
          content: 'My personal portfolio built with Nuxt 4 and Tailwind CSS.',
        },
      ],
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
  },
  experimental: {
    viewTransition: true,
  },
})
