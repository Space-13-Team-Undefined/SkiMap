<template>
  <div id="pista" class="fullscreen flex">
    <div id="cont-img" class="flex-centro">
      <img id="img-pista" src="~/assets/img/bgPiste.jpg" alt="Immagine pista" class="desktop"/>
    </div>

    <div id="bottone-maps" class="flex-centro davanti cliccabile">
      <IconaMaps id="icona-maps"/>
    </div>

    <div id="header" class="flex-centro davanti2">
      <nuxt-link to="/piste" class="flex-centro cliccabile">
        <IconaFrecciaIndietro id="indietro" />
      </nuxt-link>
      <div id="nome-pista" class="titolo flex-centro" >
        {{ pista.nome_pista.charAt(0).toUpperCase() + pista.nome_pista.toLowerCase().slice(1) }}
      </div>
      <IconaFrecciaIndietro class="invisibile"/>
    </div>

    <div id="cont-informazioni" class="flex">
      <div class="titolo-informazioni titolo">
        Località
      </div>
      <div class="informazioni">
        <div class="icona-info flex">
          <IconaTrattino /> Comune: {{ pista.comune }} ({{ pista.provincia }})
        </div>
        <div class="icona-info flex">
          <IconaTrattino /> Comprensorio: {{ pista.comprensorio }}
        </div>
      </div>
      <div class="titolo-informazioni titolo">
        Servizi
      </div>
      <div class="informazioni">
        <div class="icona-info flex">
          <IconaCheck v-if="pista.innevamento_artificiale === 'S'" />
          <IconaX v-else />
          Innevamento artificiale
        </div>
        <div class="icona-info flex">
          <IconaCheck v-if="pista.servizio_di_soccorso !== 'N.P'" />
          <IconaX v-else />
          Servizio soccorso: {{ pista.servizio_di_soccorso }}
        </div>
      </div>
      <div class="titolo-informazioni titolo">
        Statistiche
      </div>
      <div class="informazioni">
        <div class="icona-info flex">
          <IconaTrattino /> Lunghezza: {{ pista.lunghezza_pista }}m
        </div>
        <div class="icona-info flex">
          <IconaTrattino /> Larghezza media: {{ pista.larghezza_pista }}m
        </div>
        <div class="icona-info flex">
          <IconaTrattino /> Pendenza media: {{ pista.pendenza_media }}°
        </div>
        <div class="icona-info flex">
          <IconaTrattino /> Quota massima: {{ pista.quota_monte }}m
        </div>
        <div class="icona-info flex">
          <IconaTrattino /> Dislivello: {{ pista.dislivello_medio }}m
        </div>
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
import IconaCheck from "@/components/icone/ui/IconaCheck";
import IconaMaps from "@/components/icone/ui/IconaMaps";
import IconaX from "@/components/icone/ui/IconaX";
import IconaTrattino from "@/components/icone/ui/IconaTrattino";
export default {
  components: {IconaTrattino, IconaX, IconaMaps, IconaCheck, IconaFrecciaIndietro},
  data() {
    return {
      pista: {
        nome_pista: 'caricamento...'
      }
    }
  },
  beforeMount() {
    this.$lombardiaAPI.get(`8c8w-y5ce.json?identificativo=${this.$route.params.idPista}`)
      .then(risposta => {
        this.pista = risposta.data[0]
        console.log(this.pista)
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
  background-color: black;
}
#img-pista {
  height: 100%;
  width: auto;
}


#bottone-maps {
  position: absolute;
  background-color: white;
  border: 2px solid black;
  border-radius: 3.125rem;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5);
}

#header {
  width: 100vw;
  height: 5rem;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  border: 0.2rem solid var(--bordo);
  border-width: 0.2rem 0 0.2rem 0;
  background-color: white;
}
#indietro {
  width: 2rem;
  height: 2rem;
}


#cont-informazioni {
  flex-direction: column;
  padding: 1rem 2rem;
}

.titolo-informazioni {
  font-style: normal;
  font-size: 1.8rem;
  margin: 1rem 0 0.5rem 0;
}

#icona-maps{
  height: 2.5rem;
  width: 2.5rem;
}

.icona-info {
  align-items: center;
  margin-bottom: 0.3rem;
  margin-left: 0.4rem;
  font-size: 1.2rem;
}

.icona-info svg {
  margin-right: 0.3rem;
}

svg {
  min-width: 1.5rem;
  min-height: 1.5rem;
  height: 1.5rem;
  width: 1.5rem;
}


@media screen and (max-width: 600px) {
  .invisibile {
    display: none;
  }

  .icona-info {
    font-size: 1.1rem;
  }

  #bottone-maps {
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 1.5rem;
    padding: 0.5rem;
    background-color: white;
  }
}

@media screen and (min-width: 601px) {
  #bottone-maps {
    left: 82vw;
    top: 14.5vh;
    padding: 0.5rem 2rem;
  }
}

@media screen and (max-width: 1000px) {
  .desktop {
    display: none;
  }

  #cont-img {
    height: 17vh;
    background: url("~/assets/img/bgPiste.jpg");
    background-size: cover;
    background-position: center;
  }
}

@media screen and (min-width: 1001px) {
  #cont-img {
    background: linear-gradient(315deg, #fc00ff 0%, #00dbde 74%);
    background-size: 400% 400%;
    animation: gradient 20s ease infinite;
  }

  #img-pista {
    height: 30vh;
    margin: -5vh 0;
    filter: opacity(95%);
  }

  #bottone-maps {
    top: 17.75vh;
    left: 83.5vw;
  }

  #cont-informazioni {
    padding: 2rem 3rem;
  }
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
