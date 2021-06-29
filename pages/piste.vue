<template>
  <div id="piste">
    <div id="header" class="flex-centro">
      <nuxt-link to="/" id="indietro" class="flex-centro">
        <FrecciaIndietro />
      </nuxt-link>
      <div id="titolo" class="flex-centro">
        Piste
      </div>
      <div id="button" class="flex-centro" onclick="this.filtroBottone()">
        <IconaFiltro />
      </div>
    </div>
    <div id="tipologia" class="flex-centro">
      Tipologia
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    filtroBottone(){
      //
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
  display: flex;
  border: 0.1em solid black;
  border-width: 0 0 0.1em 0;
  background-color: #ffffff;
}
</style>
