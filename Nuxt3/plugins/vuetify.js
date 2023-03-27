// plugins/vuetify.js
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const myCustomLightTheme = {
  dark: false,
  colors: {
    background: '#fff',
    surface: '#fff',
    primary: '#08f',
    'primary-darken-1': '#06c',
    secondary: '#0e4',
    'secondary-darken-1': '#0b3',
    error: '#e10',
    info: '#eb0',
    success: '#6f0',
    warning: '#d0f',
  }
}

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    components,
    directives,

    theme: {
      defaultTheme: 'myCustomLightTheme',
      themes: {
        myCustomLightTheme,
      }
    }
  })

  nuxtApp.vueApp.use(vuetify)
})