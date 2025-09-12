// https://nuxt.com/docs/api/configuration/nuxt-config
// import pugPlugin from 'vite-plugin-pug'

import UnoCSS from 'unocss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-09-11',
  devtools: { enabled: false },
  
  srcDir: 'src/',
  app: {
    baseURL: '/k9gb'
  },
  
  modules: ['@unocss/nuxt', '@nuxtjs/i18n', '@vueuse/nuxt', '@nuxt/content', '@nuxtjs/mdc', '~/modules/content.ts', '@pinia/nuxt', '@nuxt/scripts', '@nuxt/image', '@nuxt/test-utils/module'],
  
  // build: {
  //   transpile: ['gsap']
  // },
  
  components: {
    global: true,
    dirs: ["~/components"]
  },
  
  i18n: {
    baseUrl: '/',
    locales: [
      { name: "English", code: 'en', language: 'en', file: 'en.json' },
      { name: "Japanese", code: 'jp', language: 'jp', file: 'jp.json' },
      { name: "Russian", code: 'ru', language: 'ru', file: 'ru.json' }
    ],
    defaultLocale: 'ru',
    strategy: "prefix_except_default",
    langDir: "locales",
    vueI18n: './i18n/i18n.config.ts'
  },
  
  content: {
    experimental: {
      clientDB: true
    }
  },
  
  css: [
    '~/assets/css/main.css',
    '~/assets/css/fontawesome.min.css',
  ],
  
  vite: {
    plugins: [
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          nesting: true,
        },
        scss: {
          api: "modern",
          silenceDeprecations: ['legacy-js-api']
        }
      }
    }
  },
  
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  
  unocss: {
    attributify: true,
    icons: true,
    components: false,
    shortcuts: [
      ['btn_default', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ],
  },
  
  nitro: {
    prerender: {
      routes: ["/sitemap.xml"],
    }
  },
  devServer: {
    port: 8000
  },
  ssr: true,


})