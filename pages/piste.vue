<template>
  <div id="piste" class="fullscreen flex">

    <div id="header" class="flex-centro davanti2">
      <nuxt-link to="/" id="indietro" class="flex-centro cliccabile">
        <IconaFrecciaIndietro />
      </nuxt-link>
      <div class="flex-centro titolo">
        Piste
      </div>
      <div id="button" class="flex-centro cliccabile" v-on:click="filtriChiusi = !filtriChiusi">
        <IconaFiltro v-if="filtriChiusi"/>
        <IconaX v-else/>
      </div>
    </div>

    <div id="filtri" class="flex-centro davanti" v-bind:class="filtriChiusi ? 'nascosto' : ''">

      <div class="riga-f flex-centro cliccabile" v-on:click="apriOpzioniFiltro(0)">
        <div class="nome-filtro flex-centro">
          <IconaFreccia />
          Tipologia
        </div>
        <div class="valore-filtro flex-centro">
          {{ tipologia }}
        </div>
      </div>
      <div class="opzioni-filtro nascosto flex-centro">
        <div class="icona-opzione flex cliccabile" v-on:click="filtraTipologia(0)">
          <IconaCamposcuola />
        </div>
        <div class="icona-opzione flex cliccabile" v-on:click="filtraTipologia(1)">
          <IconaSciDiscesa />
        </div>
        <div class="icona-opzione flex cliccabile" v-on:click="filtraTipologia(2)">
          <IconaSciFondo />
        </div>
        <div class="icona-opzione flex cliccabile" v-on:click="filtraTipologia(3)">
          <IconaSkiweg />
        </div>
        <div class="icona-opzione flex cliccabile" v-on:click="filtraTipologia(4)">
          <IconaSnowboard />
        </div>
      </div>

      <div class="riga-f flex-centro cliccabile" v-on:click="apriOpzioniFiltro(1)">
        <div class="nome-filtro flex-centro">
          <IconaFreccia />
          Difficoltà
        </div>
        <div class="valore-filtro flex-centro">
          {{ difficolta }} {{ difficolta === "Blu" ? "(facile)" : difficolta === "Rossa" ? "(intermedia)" : "(difficile)"}}
        </div>
      </div>
      <div class="opzioni-filtro nascosto flex-centro">
        <div class="radio-difficolta cliccabile" v-on:click="filtraDifficolta(1)"/>
        <div class="radio-difficolta cliccabile" v-on:click="filtraDifficolta(2)"/>
        <div class="radio-difficolta cliccabile" v-on:click="filtraDifficolta(3)"/>
      </div>

      <div class="riga-f flex-centro cliccabile" v-on:click="apriOpzioniFiltro(2)">
        <div class="nome-filtro flex-centro">
          <IconaFreccia />
          Lunghezza minima
        </div>
        <div class="valore-filtro flex-centro">
          {{ lunghezza }}m
        </div>
      </div>
      <div class="opzioni-filtro nascosto">
        <Slider id="slider-lunghezza" :max="lunghezzaMax" :min="lunghezzaMin" :value="lunghezza" @input.native="filtraLunghezza()"/>
      </div>
    </div>

    <div id="mappa" />

    <div id="pista-popup" class="flex-centro" v-if="pistaAperta !== null">
      <div id="nome-pista" class="titolo">
        {{ pistaAperta.nome_pista.charAt(0).toUpperCase() + pistaAperta.nome_pista.toLowerCase().slice(1) }}
      </div>
      <div id="localita-pista" class="descrizione">
        {{ pistaAperta.comune }} ({{ pistaAperta.provincia }})
      </div>
      <div id="menu-pista" class="flex-centro">
        <div id="chiudi-popup" class="cliccabile flex-centro" v-on:click="pistaAperta = null" >
          Chiudi
        </div>
        <div id="visualizza-info" class="cliccabile flex-centro">
          Visualizza
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconaCamposcuola from "~/components/icone/piste/IconaCamposcuola";
import IconaSciDiscesa from "~/components/icone/piste/IconaSciDiscesa";
import IconaSciFondo from "~/components/icone/piste/IconaSciFondo";
import IconaSkiweg from "~/components/icone/piste/IconaSkiweg";
import IconaSnowboard from "~/components/icone/piste/IconaSnowboard";
import IconaFrecciaIndietro from "~/components/icone/ui/IconaFrecciaIndietro";
import IconaFiltro from "~/components/icone/ui/IconaFiltro";
import IconaX from "@/components/icone/ui/IconaX";
import IconaFreccia from "@/components/icone/ui/IconaFreccia";
import Slider from "@/components/ui/Slider";
const chiaveGMaps = process.env.CHIAVE_API_GOOGLE_MAPS;

export default {
  components: {
    Slider,
    IconaFreccia,
    IconaX,
    IconaFiltro, IconaFrecciaIndietro, IconaSnowboard, IconaSkiweg, IconaSciFondo, IconaSciDiscesa, IconaCamposcuola},
  head() {
    return {
      script: [
        {
          src: `https://maps.googleapis.com/maps/api/js?key=${chiaveGMaps}&libraries=&v=weekly`,
          defer: true
        }
      ]
    };
  },
  data() {
    return {
      // OpenData
      datiPiste: [],
      pisteFiltrate: [],

      // Filtri
      filtriChiusi: true,
      filtriModificati: false,
      tipologia: "Discesa",
      difficolta: "Blu",
      lunghezza: 1000,
      lunghezzaMax: 10000,
      lunghezzaMin: 1,

      // Mappa
      mappa: {},
      pistaAperta: null,
      marcatori: [],
      locations: [],
    }
  },
  mounted() {

    setInterval(() => {
      if (this.filtriModificati) {
        this.filtraPiste()
      }
    }, 2000)

    this.$lombardiaAPI.get('8c8w-y5ce.json')
        .then(risposta => {
          this.datiPiste = risposta.data;
          this.caricaMappa();
        })
  },
  methods: {
    caricaMappa() {
      this.mappa = new google.maps.Map(document.getElementById("mappa"), {
        center: {
          lat: parseInt(this.datiPiste[parseInt(this.datiPiste.length / 5)].x_start_pista),
          lng: parseInt(this.datiPiste[parseInt(this.datiPiste.length / 5)].y_start_pista)
        },
        zoom: 10,
      })
    },

    caricaMarcatori() {
      for(let i=0; i<this.pisteFiltrate.length; i++) {
        const pista = this.pisteFiltrate[i]
        const marcatore = new google.maps.Marker({
          position: {
            lat: parseFloat(pista.x_start_pista),
            lng: parseFloat(pista.y_start_pista)
          },
          map: this.mappa,
          title: pista.nome_pista,
        });

        marcatore.addListener("click", () => {
          this.filtriChiusi = true
          this.pistaAperta = pista
        });

        this.marcatori.push(marcatore);
      }
    },

    pulisciMarcatori(){
      for(let i=0; i<this.marcatori.length; i++) {
        this.marcatori[i].setMap(null);
      }
    },

    apriOpzioniFiltro(indice) {
      const righeOpzioniFiltri = document.getElementsByClassName("opzioni-filtro");
      for (let i=0; i<righeOpzioniFiltri.length; i++) {
        if (i === indice) {
          let gradi = "0deg";

          if (righeOpzioniFiltri[i].classList.contains("nascosto"))
            gradi = "90deg";

          document.getElementsByClassName("icona-freccia")[indice].style.transform = `rotate(${gradi})`;

          righeOpzioniFiltri[i].classList.toggle("nascosto")
        }
        else {
          document.getElementsByClassName("icona-freccia")[i].style.transform = "rotate(0deg)";
          righeOpzioniFiltri[i].classList.add("nascosto")
        }
      } //test heroku
    },

    filtraTipologia(indice) {
      this.filtriModificati = true;
      const tipologie = ["Campo Scuola", "Discesa", "Fondo", "Skiweg", "Snowboard"];
      this.tipologia = tipologie[indice];
    },

    filtraLunghezza() {
      this.filtriModificati = true

      this.lunghezza = parseInt(document.getElementById("slider-lunghezza").value)
    },

    filtraDifficolta(id){
      this.filtriModificati = true

      if(id === 1)
        this.difficolta = "Blu";
      else if(id === 2)
        this.difficolta = "Rossa";
      else
        this.difficolta = "Nera";
    },

    filtraPiste() {
      this.filtriModificati = false
      this.pisteFiltrate = this.datiPiste.filter(pista => this.filtroPerPiste(pista))

      this.pulisciMarcatori();
      this.caricaMarcatori();
    },

    filtroPerPiste(pista) {
      return pista.tipologia_pista.toLowerCase() === this.tipologia.toLowerCase()
      && (
          pista.difficolta_pista.toLowerCase().includes(this.difficolta.toLowerCase())
          || this.difficolta === "Rossa" && pista.difficolta_pista.toLowerCase() === "non definito"
      )
      && parseInt(pista.lunghezza_pista) >= this.lunghezza
    },

    infoPista(id) {
      return this.datiPiste.find(pista => pista.identificativo === id)
    }

  }
}
</script>

<style scoped>
#piste {
    flex-direction: column;
}

#header {
  width: 100vw;
  height: 5%;
  justify-content: space-between;
  border: 0.1rem solid black;
  border-width: 0 0 0.1rem 0;
  padding: 0.5rem 0.7rem;
  background-color: var(--sfondo);
}

/* Filtri */
#filtri {
  width: 100vw;
  flex-direction: column;
  background-color: var(--sfondo);
}

.riga-f {
  width: 100%;
  justify-content: space-between;
  padding: 0.7rem;
  font-size: 1.5rem;
  border-width: 0 0 0.2rem 0;
  border-style: solid;
  border-color: var(--bordo);
}

.opzioni-filtro {
  width: 100%;
  justify-content: space-evenly;
  padding: 0.4rem;
  border-width: 0 0 0.2rem 0;
  border-style: solid;
  border-color: var(--bordo);
}

/* Icone tipologie */
.icona-opzione {
  height: 100%;
}
.icona-opzione svg {
  height: 3rem;
  width: 3rem;
  padding: 0.5rem;
}
.icona-opzione:hover {
  border-radius: 0.6rem;
  background-color: var(--terziario);
}

.radio-difficolta {
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  border: 0.15rem solid black;
  padding: 0.3rem;
  opacity: 0.6;
}

.radio-difficolta:nth-child(1) {
  background-color: var(--diff-blue);
}
.radio-difficolta:nth-child(2) {
  background-color: var(--diff-rosso);
}
.radio-difficolta:nth-child(3) {
  background-color: var(--diff-nero);
}

.radio-difficolta:hover {
  opacity: 1;
}


#slider-lunghezza {
  width: 90%;
  margin: 0.5rem;
}


#mappa {
  position: absolute;
  width: 100vw;
  height: 95%;
  top: 5%;
}
#pista-popup{
  position: absolute;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--sfondo);
  border-radius: 0.4rem;
  border: 0.2rem solid var(--bordo);
}

#nome-pista {
  margin: 1rem 1rem 1.5rem 1rem;
}

#localita-pista {
  margin: 0 1rem 1.3rem 1rem;
}

#menu-pista {
  border: 2px solid var(--bordo);
  border-width: 0.2rem 0 0 0;
  width: 100%;
  height: 100%;
}

#chiudi-popup {
  width: 100%;
  border: 0.1rem dotted var(--bordo);
  border-width: 0 0.2rem 0 0;
  padding: 0.4rem;
}
#visualizza-info {
  width: 100%;
  padding: 0.4rem;
}

@media screen and (max-width: 600px) {
  #pista-popup {
    width: 70vw;
  }
}

@media screen and (min-width: 601px) {
  #filtri {
    align-self: flex-end;
    width: 25rem;
    border-color: var(--bordo);
    border-style: solid;
    border-width: 0 0 0 0.2rem;
  }

  #pista-popup {
    width: 35vw;
  }
}
</style>
