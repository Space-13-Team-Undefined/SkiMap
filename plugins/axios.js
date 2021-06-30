const datiLombardiaConfigurazioneAPI = {
    baseURL: `https://www.dati.lombardia.it/resource/`,
    headers: {
        'X-App-Token': process.env.DATI_LOMBARDIA_TOKEN,
        'Content-Type': 'application/json'
    }
}

export default function ({ $axios }, inject) {
    // Creo una configurazione per Axios (plugin per fare richieste http)
    const lombardiaAPI = $axios.create(datiLombardiaConfigurazioneAPI)
    // Injecto la configurazione in nuxt, così da poterla usare con `this.$lombardiaAPI` da qualsiasi pagina
    inject('lombardiaAPI', lombardiaAPI)
}
