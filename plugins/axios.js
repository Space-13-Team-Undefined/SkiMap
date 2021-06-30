const datiLombardiaAPIConfig = {
    baseURL: `https://www.dati.lombardia.it/resource/`,
    headers: {
        'X-App-Token': process.env.DATI_LOMBARDIA_TOKEN,
        'Content-Type': 'application/json'
    }
}

export default function ({ $axios }, inject) {
    const lombardiaAPI = $axios.create(datiLombardiaAPIConfig)
    inject('lombardiaAPI', lombardiaAPI)
}
