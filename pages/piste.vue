<template>
  <div id="piste">
    <div id="header" class="flex-centro">
      <nuxt-link to="/" id="indietro" class="flex-centro">
        <FrecciaIndietro />
      </nuxt-link>
      <div id="titolo" class="flex-centro">
        Piste
      </div>
      <div id="button" class="flex-centro" v-on:click="filtroBottone()">
        <IconaFiltro />
      </div>
    </div>

    <div id="filtri" class="flex-centro nascosto">
      <div id="tipologia" class="filtro" v-on:click="filtri('filtroTipologia')">
        <div class="nome-filtro">
          Tipologia
        </div>
        <div class="filtro-selezionato">
          {{ tipologia }}
        </div>
      </div>
      <div id="filtroTipologia" class="modificaFiltro">
        <div class="icona" v-on:click="filtraTipologia(0)">
          <CampoScuola />
        </div>
        <div class="icona selezionato" v-on:click="filtraTipologia(1)">
          <SciDiscesa />
        </div>
        <div class="icona" v-on:click="filtraTipologia(2)">
          <SciFondo />
        </div>
        <div class="icona" v-on:click="filtraTipologia(3)">
          <Skiweg />
        </div>
        <div class="icona" v-on:click="filtraTipologia(4)">
          <SnowBoard/>
        </div>
      </div>
      <div id="lunghezza" class="filtro" v-on:click="filtri('filtroLunghezza')">Lunghezza
      </div>
      <div id="filtroLunghezza" class="modificaFiltro">modifica lunghezza</div>
      <div id="difficolta" class="filtro" v-on:click="filtri('filtroDifficolta')">Difficoltà</div>
      <div id="filtroDifficolta" class="modificaFiltro">modifica difficoltà</div>
    </div>

    <GMap
        id="mappa"
        ref="gMap"
        language="it"
        :cluster="{options: {styles: clusterStyle}}"
        :center="{lat: locations[0].lat, lng: locations[0].lng}"
        :options="{fullscreenControl: false, styles: mapStyle}"
        :zoom="6"
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
export default {
  data() {
    return {
      datiPiste: {},
      tipologia: "Discesa",
      lunghezza: 1000,
      difficolta: 1,
      currentLocation: {},
      locations: [
        {
          lat: 60.933076,
          lng: 20.629058
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
    this.$lombardiaAPI.get('8c8w-y5ce.json')
        .then(risposta => {
          risposta.data = risposta.data.sort(this.compare);
          console.log(risposta.data)
        })
    /*  this.datiPiste = risposta.data
        console.log(this.datiPiste[0].difficolta_pista)

      })
    .catch(e => {
      alert("Errore sium\n" + e)
    })*/
  },
  methods: {
    filtroBottone() {
      document.getElementById("filtri").classList.toggle("nascosto")
    },
    filtri(id) {
      if (document.getElementById(id).style.display === "none") {
        document.getElementById("filtroTipologia").style.display = "none";
        document.getElementById("filtroLunghezza").style.display = "none";
        document.getElementById("filtroDifficolta").style.display = "none";
        document.getElementById(id).style.display = "flex";
      } else {
        document.getElementById("filtroTipologia").style.display = "none";
        document.getElementById("filtroLunghezza").style.display = "none";
        document.getElementById("filtroDifficolta").style.display = "none";
      }
    },
    filtraTipologia(indice) {
      const tipologie = ["Camposcuola", "Discesa", "Sci di fondo", "Skiweg", "Snowboard"];
      this.tipologia = tipologie[indice];
    },
    compare( a, b ) {
      if ( a.lunghezza_pista < b.lunghezza_pista ){
        return -1;
      }
      if ( a.lunghezza_pista > b.lunghezza_pista ){
        return 1;
      }
        return 0;
    }
  }
}
</script>

<style scoped>
#piste {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
}
#header {
    width: 100vw;

    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 0.1rem solid black;
    border-width: 0 0 0.1rem 0;
    padding: 0.5rem 0.7rem;
}

#mappa {
  position: relative;
  flex-grow: 1;
}

#titolo {
  font-size: 2rem;
  font-family: "Evolve", serif;
}

#filtri {
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
}

.filtro {
  width: 100vw;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 2rem;
  border: 0.1rem solid black;
  border-width: 0 0 0.1rem;
  white-space: nowrap;
  padding: 0.5rem;
}

.modificaFiltro{
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100vw;
  font-size: 1em;
  border: 0.1em solid black;
  border-width: 0 0 0.1em 0;
  padding: 0.4rem;
}

.icona{
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 7px;
}

.icona svg {
  height: 3rem;
  width: 3rem;
  padding: 0.4rem;
}

.selezionato {
  background-color: rgba(0, 0, 0, 0.2);
}
.icona:hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
