// Per prendere le variabili d'ambiente (file .env)
require('dotenv').config()

export default {
  // Header html globali (valgono per tutte le pagine): https://go.nuxtjs.dev/config-head
  head: {
    title: 'SkiMap',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Css globale: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/style/style.css',
  ],

  // Plugin da caricare prima del rendering delle pagine: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios',
  ],

  // Auto importazione del components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
      '~/components',
      '~/components/icone/piste',
      '~/components/icone/ui',
      '~/components/ui'
    ]
  },


  // Moduli da "compilare" quando si utilizza il sito in ssr [server side rendering]: https://go.nuxtjs.dev/config-modules
  buildModules: [
      // Modulo per le variabili d'ambiente ed i file .env
    '@nuxtjs/dotenv'
  ],

  // Altri moduli: https://go.nuxtjs.dev/config-modules
  modules: [
    // Per richieste http: https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // Per il supporto a webapp: https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
      // Per google maps: https://www.npmjs.com/package/nuxt-gmaps
    ['nuxt-gmaps', {
      key: process.env.CHIAVE_API_GOOGLE_MAPS,
    }]
  ],

  // Configurazione di Axios: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Configurazione webapp: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Configurazione per la build ssr: https://go.nuxtjs.dev/config-build
  build: {
  },

  // Configurazione variabili d'ambiente
  dotenv: {
    // Permette di utilizzare le variabili d'ambiente del computer direttamente senza necessità di metterle in un file .env (solo ssr)
    systemvars: true
  }
}
