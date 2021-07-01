<template>
  <div id="pista" class="fullscreen flex">
    <div id="cont-img" class="flex-centro">
      <img id="img-pista" src="bgPiste.jpg" alt="Immagine pista" />
    </div>

    <div id="bottone-maps" class="flex-centro davanti cliccabile">
      Maps
    </div>

    <div id="header" class="flex-centro">
      <nuxt-link to="/piste" class="flex-centro cliccabile">
        <IconaFrecciaIndietro id="indietro" />
      </nuxt-link>
      <div id="nome-pista" class="titolo flex-centro" >
        {{ pista.nome_pista.charAt(0).toUpperCase() + pista.nome_pista.toLowerCase().slice(1) }}
      </div>
      <IconaFrecciaIndietro class="invisibile"/>
    </div>

    <!--
    Località (provincia e comune)
    comprensorio
    innevameto artificiale
    servizio soccorso
    quota
    lunghezza pista
    pendenza media / pendenza massima
    dislivello
    larghezza media
    -->
    <div id="cont-informazioni" class="flex">
      <div id="titolo-informazioni">
        Informazioni pista:
      </div>
    </div>

    <div id="piste-vicine" class="flex">

    </div>

    <div id="scuole-vicine" class="flex">

    </div>
  </div>
</template>

<script>
import IconaFrecciaIndietro from "@/components/icone/ui/IconaFrecciaIndietro";
export default {
  components: {IconaFrecciaIndietro},
  data() {
    return {
      pista: {
        nome_pista: 'caricamento...'
      }
    }
  },
  mounted() {
    this.$lombardiaAPI.get(`8c8w-y5ce.json?identificativo=${this.$route.params.idPista}`)
      .then(risposta => {
        this.pista = risposta.data[0]
      })
    .catch(errore => {
      // TODO: Gestire errore pista non trovata
    })
  }
}
</script>

<style scoped>
#pista {
  flex-direction: column;
}

#cont-img {
  width: 100vw;
  height: 20vh;
  background-color: black;
}
#img-pista {
  height: 100%;
  width: auto;
}


#bottone-maps {
  position: absolute;
  top: 17.75vh;
  left: 80%;
  padding: 0.5rem 2rem;
  background-color: var(--accento);
  border: 2px solid black;
  border-radius: 0.5rem;
  font-size: 2rem;
}


#header {
  width: 100vw;
  height: 5rem;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  border: 0.2rem solid var(--bordo);
  border-width: 0 0 0.2rem 0;
}
#indietro {
  width: 2rem;
  height: 2rem;
}




</style>
