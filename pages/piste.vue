<template>
  <div id="piste" class="fullscreen flex">

    <div id="header" class="flex-centro">
      <nuxt-link to="/" id="indietro" class="flex-centro">
        <IconaFrecciaIndietro />
      </nuxt-link>
      <div class="flex-centro titolo">
        Piste
      </div>
      <div id="button" class="flex-centro" v-on:click="filtriChiusi = !filtriChiusi">
        <IconaFiltro v-if="filtriChiusi"/>
        <IconaX v-else/>
      </div>
    </div>

    <div id="filtri" class="flex-centro" v-bind:class="filtriChiusi ? 'nascosto' : ''">

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
          {{ difficolta }}
        </div>
      </div>
      <div class="opzioni-filtro nascosto">

      </div>

      <div class="riga-f flex-centro cliccabile" v-on:click="apriOpzioniFiltro(2)">
        <div class="nome-filtro flex-centro">
          <IconaFreccia />
          Lunghezza
        </div>
        <div class="valore-filtro flex-centro">
          {{ lunghezza }}m
        </div>
      </div>
      <div class="opzioni-filtro nascosto">
        <Slider id="slider-lunghezza" :max="lunghezzaMax" :min="lunghezzaMin" :value="lunghezza" @input.native="cambiaLunghezza()" />
      </div>
    </div>

    <!--
    <div id="filtri" class="flex-centro nascosto">
      <div id="tipologia" class="filtro flex-centro" v-on:click="filtri('filtroTipologia')">
        <div class="nome-filtro">
          Tipologia
        </div>
        <div class="filtro-selezionato">
          {{ tipologia }}
        </div>
      </div>
      <div id="filtroTipologia" class="modificaFiltro flex-centro">
        <div class="icona flex-centro cliccabile" v-on:click="filtraTipologia(0)">
          <IconaCamposcuola />
        </div>
        <div class="icona flex-centro cliccabile" v-on:click="filtraTipologia(1)">
          <IconaSciDiscesa />
        </div>
        <div class="icona flex-centro cliccabile" v-on:click="filtraTipologia(2)">
          <IconaSciFondo />
        </div>
        <div class="icona flex-centro cliccabile" v-on:click="filtraTipologia(3)">
          <IconaSkiweg />
        </div>
        <div class="icona flex-centro cliccabile" v-on:click="filtraTipologia(4)">
          <IconaSnowboard/>
        </div>
      </div>
      <div id="lunghezza" class="filtro flex-centro" v-on:click="filtri('filtroLunghezza')">Lunghezza
      </div>
      <div id="filtroLunghezza" class="modificaFiltro flex-centro">modifica lunghezza</div>
      <div id="difficolta" class="filtro flex-centro" v-on:click="filtri('filtroDifficolta')">Difficoltà</div>
      <div id="filtroDifficolta" class="modificaFiltro flex-centro">modifica difficoltà</div>
    </div>
    -->

    <GMap
        id="mappa"
        ref="gMap"
        language="it"
        :cluster="{options: {styles: clusterStyle}}"
        :center="{lat: posizioneIniziale.lat, lng: posizioneIniziale.lng}"
        :options="{fullscreenControl: false, styles: mapStyle}"
        :zoom="10"
    >
      <GMapMarker
          v-for="location in locations"
          :key="location.id"
          :position="{lat: location.lat, lng: location.lng}"
          :options="{icon: location === currentLocation ? pins.selected : pins.notSelected}"
          @click="currentLocation = location"
      >
        <GMapInfoWindow :options="{maxWidth: 100}">
          <code>
            lat: {{ location.lat }},
            lng: {{ location.lng }}
          </code>
        </GMapInfoWindow>
      </GMapMarker>
      <GMapCircle :options="circleOptions"/>
    </GMap>
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

export default {
  components: {
    Slider,
    IconaFreccia,
    IconaX,
    IconaFiltro, IconaFrecciaIndietro, IconaSnowboard, IconaSkiweg, IconaSciFondo, IconaSciDiscesa, IconaCamposcuola},
  data() {
    return {
      // OpenData
      datiPiste: {},

      // Filtri
      filtriChiusi: true,
      tipologia: "Discesa",
      difficolta: "Bassa",
      lunghezza: 1000,
      lunghezzaMax: 0,
      lunghezzaMin: 0,

      // Maps
      currentLocation: {},
      posizioneIniziale: {
        lat: 46.54754835725146,
        lng: 10.1375703079666
      },
      locations: [
        {
          lat: 46.54754835725146,
          lng: 10.1375703079666
        },
        {
          lat: 45.815,
          lng: 15.9819
        },
        {
          lat: 45.12,
          lng: 16.21
        }
      ],
      pins: {
        selected: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png",
        notSelected: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png"
      },
      circleOptions: {

      },
      mapStyle: [],
      clusterStyle: [
        {
          url: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png",
          textColor: "#fff",
          height: "100vh",
          width: "100vw",
        }
      ]
    }
  },
  mounted() {
    window.navigator.geolocation.getCurrentPosition(
        posizione => {
          console.log(posizione)
          const coordinate = posizione.coords
          this.posizioneIniziale = {
            lat: coordinate.latitude,
            lng: coordinate.longitude
          }
        },
        () => console.error("geolocalizzazione disattivata")
    )

    this.$lombardiaAPI.get('8c8w-y5ce.json?$select=lunghezza_pista')
        .then(risposta => {
          let dati = risposta.data;
          this.lunghezzaMin = parseInt(dati[4].lunghezza_pista);
          this.lunghezzaMax = parseInt(dati[dati.length - 2].lunghezza_pista);
        })
  },
  methods: {
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
      const tipologie = ["Camposcuola", "Discesa", "Sci di fondo", "Skiweg", "Snowboard"];
      this.tipologia = tipologie[indice];
    },

    cambiaLunghezza() {
      console.log(document.getElementById("slider-lunghezza").value)
      this.lunghezza = parseInt(document.getElementById("slider-lunghezza").value)
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
    justify-content: space-between;
    border: 0.1rem solid black;
    border-width: 0 0 0.1rem 0;
    padding: 0.5rem 0.7rem;
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


#slider-lunghezza {
  width: 90%;
  margin: 0.5rem;
}


#mappa {
  position: relative;
  flex-grow: 1;
}
</style>
