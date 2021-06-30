<template>
  <div class="bottone">
    {{ testo }}
  </div>
</template>

<script>
export default {
  name: 'Bottone',
  props: {
    testo: {
      type: String,
      default: 'senza nome'
    }
  }
}
</script>

<style scoped>
  .bottone {
    background-color: #275efe;
    border-radius: 0.5em;
    padding: 0.4em;
    text-align: center;
    color: white;
    width: 4em;
    font-family: "Evolve", serif;
    font-weight: 100;
  }
</style>
