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
          {{ difficolta }} {{ difficolta === "Blu" ? "(facile)" : difficolta === "Rossa" ? "(intermedia)" : difficolta === "Nera" ? "(difficile)" : ""}}
        </div>
      </div>
      <div class="opzioni-filtro nascosto flex-centro">
        <div class="radio-difficolta cliccabile" v-on:click="filtraDifficolta(0)"/>
        <div class="radio-difficolta cliccabile" v-on:click="filtraDifficolta(1)"/>
        <div class="radio-difficolta cliccabile" v-on:click="filtraDifficolta(2)"/>
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
        {{ $capitalize(pistaAperta.nome_pista) }}
      </div>
      <div id="localita-pista" class="descrizione">
        {{ $capitalize(pistaAperta.comune) }} ({{ $capitalize(pistaAperta.provincia) }})
      </div>
      <div id="menu-pista" class="flex-centro">
        <div id="chiudi-popup" class="cliccabile flex-centro" v-on:click="pistaAperta = null" >
          Chiudi
        </div>
        <nuxt-link :to="'/piste/'+pistaAperta.identificativo" id="visualizza-info" class="cliccabile flex-centro">
          Visualizza
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import IconaCamposcuola from "@/components/icone/piste/IconaCamposcuola";
import IconaSciDiscesa from "@/components/icone/piste/IconaSciDiscesa";
import IconaSciFondo from "@/components/icone/piste/IconaSciFondo";
import IconaSkiweg from "@/components/icone/piste/IconaSkiweg";
import IconaSnowboard from "@/components/icone/piste/IconaSnowboard";
import IconaFrecciaIndietro from "@/components/icone/ui/IconaFrecciaIndietro";
import IconaFiltro from "@/components/icone/ui/IconaFiltro";
import IconaX from "@/components/icone/ui/IconaX";
import IconaFreccia from "@/components/icone/ui/IconaFreccia";
import Slider from "@/components/ui/Slider";
export default {
  components: {
    Slider,
    IconaFreccia,
    IconaX,
    IconaFiltro, IconaFrecciaIndietro, IconaSnowboard, IconaSkiweg, IconaSciFondo, IconaSciDiscesa, IconaCamposcuola
  },
  head: {
    title: 'Piste - ',
    meta: [
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Piste - SkiMap - Piste e scuole di sci della Lombardia'
      },
      {
        hid: 'title',
        name: 'title',
        content: 'Piste - SkiMap - Piste e scuole di sci della Lombardia'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Visualizza sulla mappa tutte le piste da sci della Lombardia!'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Visualizza sulla mappa tutte le piste da sci della Lombardia!'
      }
    ]
  },
  data() {
    return {
      // OpenData
      datiPiste: [],
      pisteFiltrate: [],

      // Filtri
      filtriChiusi: true,
      filtriModificati: false,
      tipologia: "Qualsiasi",
      difficolta: "Qualsiasi",
      lunghezza: 1,
      lunghezzaMax: 10000,
      lunghezzaMin: 1,

      // Mappa
      mappa: {},
      pistaAperta: null,
      marcatori: [],
      locations: [],
    }
  },
  beforeMount() {
    this.$lombardiaAPI.get('8c8w-y5ce.json')
        .then(risposta => {
          this.datiPiste = risposta.data;
          this.pisteFiltrate = this.datiPiste
          this.caricaMappa();
          this.caricaMarcatori()
        })
  },
  mounted() {
    setInterval(() => {
      if (this.filtriModificati) {
        this.filtraPiste()
      }
    }, 2000)
  },
  methods: {
    caricaMappa() {
      this.mappa = new google.maps.Map(document.getElementById("mappa"), {
        center: {
          lat: parseInt(this.datiPiste[parseInt(this.datiPiste.length / 5)].x_start_pista),
          lng: parseInt(this.datiPiste[parseInt(this.datiPiste.length / 5)].y_start_pista)
        },
        zoom: 10,
        fullscreenControl:false
      })
    },

    caricaMarcatori() {
      const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle fill="#f00" cx="11.5" cy="8.5" r="5.5"/><path d="M11.5 14v7"/></svg>';

      for(let i=0; i<this.pisteFiltrate.length; i++) {
        const pista = this.pisteFiltrate[i]
        const marcatore = new google.maps.Marker({
          position: {
            lat: parseFloat(pista.x_start_pista),
            lng: parseFloat(pista.y_start_pista)
          },
          map: this.mappa,
          title: pista.nome_pista,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8;base64,' + btoa(svg),
            scaledSize: new google.maps.Size(35, 35)
          },
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
      }
    },

    filtraTipologia(indice) {
      this.filtriModificati = true;

      const tipologie = ["Campo Scuola", "Discesa", "Fondo", "Skiweg", "Snowboard"];

      const iconeTipologie = document.getElementsByClassName("icona-opzione")
      for (let i=0; i<iconeTipologie.length; i++) {
        if (i === indice)
          iconeTipologie[i].classList.add("tipologia-selezionata")
        else
          iconeTipologie[i].classList.remove("tipologia-selezionata")
      }

      this.tipologia = tipologie[indice];
    },

    filtraLunghezza() {
      this.filtriModificati = true
      this.lunghezza = parseInt(document.getElementById("slider-lunghezza").value)
    },

    filtraDifficolta(indice){
      this.filtriModificati = true

      const bottoniDifficoltà = document.getElementsByClassName("radio-difficolta")
      for (let i=0; i<bottoniDifficoltà.length; i++) {
        if (i === indice)
          bottoniDifficoltà[i].classList.add("difficolta-selezionata")
        else
          bottoniDifficoltà[i].classList.remove("difficolta-selezionata")
      }

      if(indice === 0)
        this.difficolta = "Blu";
      else if(indice === 1)
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
  }
}
</script>

<style scoped>
#piste {
    flex-direction: column;
}

#header {
  width: 100vw;
  height: 4rem;
  justify-content: space-between;
  border: 0.1rem solid black;
  border-width: 0 0 0.1rem 0;
  padding: 1rem 0.7rem;
  background-color: var(--sfondo);
}

#header svg {
  height: 1.5rem;
  width: 1.5rem;
}

/* Filtri */
#filtri {
  position: absolute;
  width: 100vw;
  top: 4rem;
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
.icona-opzione:hover, .tipologia-selezionata {
  border-radius: 1rem;
  background-color: var(--terziario);
}
.icona-opzione:hover svg {
  stroke: black;
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

.radio-difficolta:hover, .difficolta-selezionata {
  opacity: 1;
}


#slider-lunghezza {
  width: 90%;
  margin: 0.5rem;
}


#mappa {
  width: 100vw;
  flex-grow: 1;
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

#chiudi-popup:hover {
  color: var(--accento)
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
