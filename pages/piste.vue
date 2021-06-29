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

    <div id="filtri" class="flex-centro">
      <div id="tipologia" class="filtro" v-on:click="filtri('filtroTipologia')">Tipologia</div>
      <div id="filtroTipologia" class="modificaFiltro">modifica tipologia
        <CampoScuola class="icona"/>
        <SciDiscesa class="icona"/>
        <SciFondo class="icona"/>
        <Skiweg class="icona"/>
        <Snowboard class="icona"/>
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
  methods: {
    filtroBottone(){
      if(document.getElementById("filtri").style.display === "none"){
        document.getElementById("filtri").style.display = "flex";
      }else{
        document.getElementById("filtri").style.display = "none";
      }
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
    border: 0.1em solid black;
    border-width: 0 0 0.1em 0;
    padding: 0.5em 0.7em;
  }

  #mappa {
    position: relative;
    flex-grow: 1;
  }

#titolo{
    font-size: 2em;
  font-family: "Evolve", serif;
}

#filtri{
  width: 100vw;
  display: none;
  flex-direction: column;
  background-color: #ffffff;
}

.filtro{
  width: 100vw;
  padding: 0.2em;
  font-size: 1.5em;
  display: flex;
  border: 0.1em solid black;
  border-width: 0 0 0.1em 0;
  background-color: #ffffff;
  overflow: auto;
  white-space: nowrap;
}

.modificaFiltro{
  width: 100vw;
  display: none;
  font-size: 1em;
  border: 0.1em solid black;
  border-width: 0 0 0.1em 0;
  background-color: #ffffff;
}

.icona{
  height: 3em;
  width: 3em;
  text-align: center;
  padding: 0.1em;
}
</style>