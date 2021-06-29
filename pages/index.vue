<template>
  <div id="home">
    <div id="logo">
      <img src="logo.png" id="logo-img">
    </div>
    <div id="sezioni" class="desktop">
      <nuxt-link to="/piste">
        <div class="sezione" id="piste" >
          <div class="nome">
            PISTE
          </div>
        </div>
      </nuxt-link>
      <nuxt-link to="/scuole">
        <div class="sezione" id="scuole">
          <div class="nome">
            SCUOLE
          </div>
        </div>
      </nuxt-link>
    </div>
    <div id="home-mobile" class="mobile">
      <div id="bottoni">
        <nuxt-link to="/piste">
          <Bottone testo="Piste" />
        </nuxt-link>
        <nuxt-link to="/scuole">
          <Bottone testo="Scuole" />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
#home {
  height: 100vh;
  width: 100vw;
  display: flex;
}

#logo {
  position: absolute;
  width: 100vw;
  text-align: center;
  font-size: 3em;
  z-index: 100;
}


@media screen and (max-width: 600px) {
  .desktop {
    display: none;
  }

  #logo {
    display: flex;
    font-size: 5em;
  }

  #logo-img {
    width: 100vw;
  }

  #home-mobile {
    background-image: url("static/background-mobile.jpg");
    background-size: cover;
    background-position: center;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 4em;
  }

  #bottoni {
    display: flex;
    flex-wrap: wrap;
  }

  .bottone {
    margin: 1em;
    font-size: 2em;
  }
}

@media screen and (min-width: 601px) {
  .mobile {
    display: none;
  }

  #logo {
    top: 10%;
  }

  #logo-img {
    width: 7em;
  }


  #sezioni {
    display: flex;
  }

  .sezione {
    width: 50vw;
    height: 100vh;
    background-image: url("static/background.jpg");
    filter: grayscale(100%);
    background-size: cover;
    background-blend-mode: saturation;
    transition: all 500ms ease-in-out;
  }

  .nome {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-size: 3em;
    font-weight: bold;
    transition: all 400ms ease-in-out;
    filter: grayscale(0%);
    backdrop-filter: blur(5px);
    font-family: "Evolve", serif;
    font-style: italic;
  }

  .sezione:hover {
    cursor: pointer;
    filter: grayscale(0%);
  }

  .sezione:hover .nome {
    padding-top: 50vh;
    backdrop-filter: blur(0);
  }
}
</style>
