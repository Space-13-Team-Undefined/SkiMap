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
    <div id="tipologia" class="flex-centro">
      Tipologia
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

#tipologia{
  width: 100vw;
  display: none;
  flex-direction: column;
  background-color: #ffffff;
}
</style>
