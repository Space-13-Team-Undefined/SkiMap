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


  </div>
</template>

<script>
const chiaveApiMaps = process.env.CHIAVE_API_GOOGLE_MAPS

export default {
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
  #header {
    width: 100vw;

    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 0.1em solid black;
    border-width: 0 0 0.1em 0;
    padding: 0.5em 0.7em;
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
  height: 0.2em;
  width: 0.2em;
  display: inline-block;
  text-align: center;
  padding: 0.1em;
}
</style>
