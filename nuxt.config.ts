// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@unocss/nuxt','@nuxtjs/supabase'
  ],
    // @ts-ignore
  build: {
    transpile:process.env.NODE_ENV === 'production'
        ? [
          'naive-ui',
          'vueuc',
          '@css-render/vue3-ssr',
          '@juggle/resize-observer'
        ]
        : ['@juggle/resize-observer']
  },
  vite: {
    optimizeDeps: {
      include:
          process.env.NODE_ENV === 'development'
              ? ['naive-ui', 'vueuc']
              : []
    }
  },
  unocss: {
    // presets
    uno: true, // enabled `@unocss/preset-uno`
    icons: true, // enabled `@unocss/preset-icons`
    attributify: true, // enabled `@unocss/preset-attributify`,
  }
})
