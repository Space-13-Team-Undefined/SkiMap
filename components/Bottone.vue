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
    background-color: var(--celeste);
    border: 3px solid white;
    border-radius: 0.75em;
    padding: 0.4em;
    text-align: center;
  }
</style>
