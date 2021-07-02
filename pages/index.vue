<template>
  <div id="home" class="fullscreen flex">

    <div id="logo" class="flex-centro davanti">
      <div id="logo-img-cont" class="flex-centro">
        <img src="logo.png" id="logo-img" alt="Logo SkiMap">
      </div>
    </div>

    <div id="cont-divisione" class="desktop flex">
      <nuxt-link to="/piste" id="piste" class="divisione cliccabile flex-centro">
        <div class="velo-immagine">
          <div class="nome-divisione flex-centro">
            Piste
          </div>
        </div>
      </nuxt-link>

      <nuxt-link to="/scuole" id="scuole" class="divisione cliccabile flex-centro">
        <div class="velo-immagine">
          <div class="nome-divisione flex-centro">
            <span>Scuole</span>
          </div>
        </div>
      </nuxt-link>
    </div>

    <div id="cont-mob" class="mobile maxDim flex-centro">
      <div id="cont-divisione-mob" class="flex-centro">
        <nuxt-link to="/piste" id="piste-mob" class="divisione flex-centro">
          <div class="flex-centro cont-testo-divisione">
            <IconaFreccia class="flex-centro" style="transform: rotate(180deg)" />
            <span id="titolo-piste" class="titolo">
            Piste
          </span>
          </div>
        </nuxt-link>

        <nuxt-link to="/scuole" class="divisione flex-centro">
          <div class="flex-centro cont-testo-divisione">
            <span id="titolo-scuole" class="titolo">
              Scuole
            </span>
            <IconaFreccia />
          </div>
        </nuxt-link>

      </div>
    </div>

  </div>
</template>

<script>
import IconaFreccia from "~/components/icone/ui/IconaFreccia";
export default {
  components: {IconaFreccia},
  head: {
    title: '',
    meta: [
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'SkiMap - Piste e scuole di sci della Lombardia'
      },
      {
        hid: 'title',
        name: 'title',
        content: 'SkiMap - Piste e scuole di sci della Lombardia'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Con SkiMap Lombardia trovi subito le piste perfette e le scuole di sci più vicine ad esse!'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Con SkiMap Lombardia trovi subito le piste perfette e le scuole di sci più vicine ad esse!'
      }
    ]
  },
}
</script>

<style scoped>
#home {
  position: relative;
}
#logo {
  position: absolute;
  width: 100vw;
}
#logo-img-cont {
  padding: 1rem;
  background-color: var(--sfondo);
}

@media screen and (max-width: 600px) {
  #logo {
    font-size: 5rem;
  }

  #logo-img-cont {
    width: 100vw;
    border-radius: 0;
  }

  #cont-mob {
    background-image: url("static/bgPiste.jpg");
    background-position: center;
    background-size: cover;
    align-items: flex-end;
  }

  #cont-divisione-mob {
    background-color: var(--sfondo);
    width: 100vw;
    height: 15vh;
    /* Per il fatto che i div sono inclinati */
    overflow: hidden;
  }

  .divisione {
    height: 100%;
    width: 100%;
    transform: skew(var(--inclinazione));
    overflow: hidden;
  }

  #piste-mob {
    border-color: var(--bordo);
    border-style: dashed;
    border-width: 0 0.3rem 0 0;
  }

  .cont-testo-divisione {
    transform: skew(var(--anti-inclinazione));
  }

  .titolo {
    margin: 0 0.9rem;
  }

  .icona-freccia {
    width: 2.2rem;
  }
}

@media screen and (min-width: 601px) {
  #logo {
    top: 7vh;
    font-size: 3rem;
  }

  #logo-img-cont {
    border-radius: 1rem;
  }

  #logo-img {
    width: 16rem;
  }

  .divisione {
    width: 50vw;
    height: 100vh;
    background-size: cover;
    background-position: center;
  }

  #scuole {
    background-image: url('assets/img/bgScuole.jpg');
  }

  #piste {
    background-image: url('static/bgPiste.jpg');
  }

  .velo-immagine {
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.8);
    transition: background-color var(--vel-transizione) var(--stile-transizione);
  }

  .nome-divisione {
    width: 100%;
    height: 100vh;
    font-size: 6rem;
    font-family: "ITCAvantGardenPro", serif;
    color: white;
    transition: all var(--vel-transizione) var(--stile-transizione);
  }

  .divisione:hover .nome-divisione {
    color: var(--accento);
    padding-top: 70vh;
  }

  .divisione:hover .velo-immagine {
    background-color: rgba(0, 0, 0, 0);
  }
}
</style>
