<template>
  <div id="pista" class="flex">
    <div id="cont-img" class="flex-centro">
      <img id="img-pista" src="~/assets/img/bgPiste.jpg" alt="Immagine pista" class="desktop"/>
    </div>

    <a :href="'http://www.google.com/maps/dir//' + pista.coordinate_x + ',' + pista.coordinate_y" target="_blank" id="bottone-maps" class="flex-centro davanti cliccabile">
      <IconaMaps id="icona-maps"/>
    </a>

    <div id="header" class="flex-centro davanti2">
      <div class="flex-centro cliccabile" v-on:click="$router.back()">
        <IconaFrecciaIndietro id="indietro" />
      </div>
      <div id="nome-pista" class="titolo flex-centro" >
        {{ $capitalize(pista.denominazione) }}
      </div>
      <IconaFrecciaIndietro class="invisibile"/>
    </div>

    <div id="cont-informazioni" class="flex">
      <div class="titolo-informazioni titolo">
        Località
      </div>
      <div class="informazioni">
        <div class="icona-info flex">
          <IconaTrattino /> Comune: {{ $capitalize(pista.comune) }} ({{ $capitalize(pista.provincia) }})
        </div>
      </div>
      <div class="titolo-informazioni titolo">
        Stagioni
      </div>
      <div class="informazioni">
        <div class="icona-info flex">
          <IconaCheck v-if="pista.inverno === 'S'" />
          <IconaX v-else />
          Inverno
        </div>
        <div class="icona-info flex">
          <IconaCheck v-if="pista.estate == 'S'" />
          <IconaX v-else />
          Estate
        </div>
      </div>
      <div class="titolo-informazioni titolo">
        Informazioni
      </div>
      <div class="informazioni">
        <div class="icona-info flex">
          <IconaTrattino /> Direttore: {{ $capitalize(pista.direttore) }}
        </div>
        <div class="icona-info flex">
          <IconaTrattino /> Tipologia Scuola: {{ $capitalize(pista.tipologia_scuola) }}
        </div>
        <a class="icona-info flex" :href="'tel:+39' + pista.telefono">
          <IconaTelefono /> Telefono: {{ pista.telefono }}
        </a>
        <a class="icona-info flex" :href="'mailto:' + pista.mail">
          <IconaMail /> Mail: {{ pista.mail }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import IconaFrecciaIndietro from "@/components/icone/ui/IconaFrecciaIndietro";
import IconaCheck from "@/components/icone/ui/IconaCheck";
import IconaMaps from "@/components/icone/ui/IconaMaps";
import IconaX from "@/components/icone/ui/IconaX";
import IconaTrattino from "@/components/icone/ui/IconaTrattino";
import IconaFreccia from "@/components/icone/ui/IconaFreccia";
import IconaTelefono from "@/components/icone/ui/IconaTelefono";
import IconaMail from "@/components/icone/ui/IconaMail";
export default {
  components: {
    IconaMail,
    IconaTelefono, IconaFreccia, IconaTrattino, IconaX, IconaMaps, IconaCheck, IconaFrecciaIndietro},
  data() {
    return {
      pista: {
        nome_pista: 'caricamento...',
      },
      pisteComprensorio: []
    }
  },
  head() {
    return {
      title: `Scuola - ${this.$route.params.idScuola}`,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: `Scuola - ${this.$route.params.idScuola}`
        },
        {
          hid: 'title',
          name: 'title',
          content: `Scuola - ${this.$route.params.idScuola}`
        },
        {
          hid: 'description',
          name: 'description',
          content: `Visualizza informazioni sulla scuola ID:${this.$route.params.idScuola}`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `Visualizza informazioni sulla scuola ID:${this.$route.params.idScuola}`
        }
      ]
    }
  },
  beforeMount() {
    this.$lombardiaAPI.get(`tasa-ymhw.json?identificativo=${this.$route.params.idScuola}`)
        .then(risposta => {
          this.pista = risposta.data[0]
        })
        .catch(errore => {
          // TODO: Gestire errore pista non trovata
        })
  },
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
  transition: all var(--vel-transizione) var(--stile-transizione);
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
#bottone-maps:hover svg {
  stroke: black;
}
#bottone-maps:hover {
  transform: translate3d(-0.4vh, -0.4vh, 0);
}

#piste-vicine {
  margin: 1.5rem 2rem;
  flex-direction: column;
}

#cont-piste-vicine {
  margin-top: 0.5rem;
  align-items: center;
  overflow: scroll;
  white-space: nowrap;
  word-wrap: break-word;
  overflow-y: hidden;
}

.elem-pista {
  height: 10vh;
  width: 36%;
  min-width: 36%;
  max-width: 36%;
  margin: 0.7rem;
  background-image: url("~/assets/img/bgPiste.jpg");
  background-size: cover;
  background-position: center;
  border-radius: 0.7rem;
  word-wrap: break-word;
}

.velo-img {
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0, .5);
  transition: background-color var(--vel-transizione) var(--stile-transizione);
  border-radius: 0.7rem;
}

.nome-pista-vicina {
  width: 100%;
  height: 100%;
  white-space: initial;
  font-size: 1.3rem;
  color: white;
}

.velo-img:hover {
  background-color: rgba(0,0,0, .3);
}

.icona-scrolla {
  min-height: 3rem;
  min-width: 3rem;
  height: 3rem;
  width: 3rem;
}


@media screen and (max-width: 600px) {
  .invisibile {
    display: none;
  }

  .icona-info {
    font-size: 1.1rem;
  }

  #bottone-maps {
    position: fixed;
    bottom: 0;
    right: 0;
    margin: 1.5rem;
    padding: 0.5rem;
    background-color: white;
  }

  .elem-pista {
    width: 50%;
    min-width: 50%;
    max-width: 50%;
  }

  #piste-vicine {
    margin: 1.5rem 1rem 5rem 1rem;
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
    animation: gradient 10s ease infinite;
  }

  #img-pista {
    height: 35vh;
    margin: -7vh 0;
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
