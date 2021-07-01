<template>
  <input class="slider" type="range" :min="min" :max="max" :value="value" :step="step"/>
</template>

<script>
export default {
  name: "Slider",
  props: {
    value: {
      type: Number,
      default: 50
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100,
    },
    step: {
      type: String,
      default: "any"
    }
  }
}
</script>

<style scoped>
input[type=range]::-moz-range-track {
  background-color: black;
}
</style>
