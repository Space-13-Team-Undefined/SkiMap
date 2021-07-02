// Per prendere le variabili d'ambiente (file .env)
require('dotenv').config()

export default {
  // Header html globali (valgono per tutte le pagine): https://go.nuxtjs.dev/config-head
  head: {
    title: '',
    titleTemplate: '%sSkiMap - Piste e scuole di sci della Lombardia',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'robots', content: 'noodp,noydir' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:description', property: 'og:description', content: 'Con SkiMap Lombardia trovi subito le piste perfette e le scuole di sci più vicine ad esse!' },
      { name: 'author', content: 'Progetto Sp@ce 13' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'SkiMap - Piste e scuole di sci della Lombardia' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        src: `https://maps.googleapis.com/maps/api/js?key=${process.env.CHIAVE_API_GOOGLE_MAPS}`,
        async: true
      }
    ]
  },

  // Css globale: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/style/style.css',
  ],

  // Plugin da caricare prima del rendering delle pagine: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios',
    '~/plugins/funzioni'
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
    '@nuxtjs/pwa'
  ],

  // Configurazione di Axios: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Configurazione webapp: https://go.nuxtjs.dev/pwa
  pwa: {
    meta: {
      name: 'Skimap Lombardia',
      lang: 'it'
    },
    manifest: {
      lang: 'it',
      name: 'Skimap Lombardia',
      shortcuts: [
        {
          name: "Cerca piste",
          short_name: "Piste",
          description: "Mostra tutte le piste della Lombardia",
          url: "/piste",
        },
        {
          name: "Cerca scuole di sci",
          short_name: "Scuole",
          description: "Mostra tutte le scuole di sci della Lombardia",
          url: "/scuole",
        }
      ]
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
