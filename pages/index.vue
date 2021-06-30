<template>
  <div id="home">
    <div id="logo">
      <div id="logo-img-cont">
        <img src="logo.png" id="logo-img">
      </div>
    </div>
    <div id="sezioni" class="desktop">
      <nuxt-link to="/piste">
        <div class="sezione" id="piste">
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
      <div id="nav-mobile">
        <nuxt-link to="/piste" id="piste-mobile" class="elem-nav-mobile">
          <div class="link">
            <PuntaFreccia style="transform: rotate(180deg); margin-right: 0.8rem"/>
            <div>
              Piste
            </div>
          </div>
        </nuxt-link>
        <nuxt-link to="/scuole" id="scuole-mobile" class="elem-nav-mobile">
          <div class="link">
            <div>
              Scuole
            </div>
            <PuntaFreccia style="margin-left: 0.8rem"/>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // test
}
</script>

<style scoped>
#home {
  height: 100vh;
  width: 100vw;
  display: flex;
}

#logo {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100vw;
  text-align: center;
  font-size: 3em;
  z-index: 100;
}


#logo-img-cont {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: white;
  width: fit-content;
  height: fit-content;
  border-radius: 1rem;
}


@media screen and (max-width: 600px) {
  .desktop {
    display: none;
  }

  #logo {
    display: flex;
    font-size: 5em;
  }

  #logo-img-cont {
    width: 100vw;
    border-radius: 0;
  }

  #home-mobile {
    background-image: url("static/background-mobile.jpg");
    background-size: cover;
    background-position: center;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }

  #nav-mobile {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    width: 100vw;
    height: 15vh;
  }

  .elem-nav-mobile {
    height: 100%;
    width: 100%;
    transform: skew(-20deg);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #piste-mobile {
    border: 2px solid black;
    border-width: 0 0.3rem 0 0;
  }

  .link {
    display: flex;
    align-items: center;
    justify-content: center;
    transform: skew(20deg);
    font-size: 2rem;
    font-family: "Evolve", serif;
    color: black;
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
    width: 9em;
  }

  #sezioni {
    display: flex;
  }

  .sezione {
    width: 50vw;
    height: 100vh;
    background-size: cover;
    background-position: center;
    background-blend-mode: saturation;
    transition: all 500ms ease-in-out;
  }

  #scuole {
    background-image: url('static/baita.jpeg');
  }

  #piste {
    background-image: url('static/background.jpg');
  }

  .nome {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-size: 6em;
    transition: all 400ms ease-in-out;
    backdrop-filter: grayscale(100%) blur(5px);
    font-family: "ITCAvantGardenPro", serif;
    color: #e63946;
  }

  .sezione:hover {
    cursor: pointer;
  }

  .sezione:hover .nome {
    padding-top: 60vh;
    backdrop-filter: grayscale(0%) blur(0);
  }
}
</style>
