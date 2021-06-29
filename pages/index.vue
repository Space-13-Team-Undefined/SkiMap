<template>
  <div id="home">
    <div id="logo">
      <img src="logo.png" id="logo-img">
    </div>
    <div id="sezioni">
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

#sezioni {
  display: flex;
}

.nome {
  font-family: "Evolve", serif;
  font-style: italic;
}


@media screen and (max-width: 700px) {
  #logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-size: 5em;
  }

  #logo-img {
    width: 100vw;
  }

  #sezioni {
    flex-direction: column;
  }


  .sezione {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 50vh;
    background-image: url("static/background-mobile.jpg");
    background-size: cover;
  }

  .nome {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.2em 0.4em;
    width: 70%;
    font-size: 3em;
    font-weight: bold;
    transition: all 500ms ease-in-out;
    filter: grayscale(0%);
    background-color: rgba(255,255,255,0.5);
    border-radius: 0.5em;
    border: 0.1em solid black;
  }
}

@media screen and (min-width: 701px) {
  #logo {
    top: 10%;
  }

  #logo-img {
    width: 7em;
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
