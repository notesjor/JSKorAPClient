// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    postcss: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
      css: [
        'vuetify/lib/styles/main.sass',
        '@mdi/font/css/materialdesignicons.min.css',
        '~/assets/css/main.css'
      ],
      build: {
        transpile: ['vuetify'],
      },
      vite: {
        define: {
          'process.env.DEBUG': false,
        },
      },
})
