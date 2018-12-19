<template>
  <div id="app">
    <Bubble chart-id="poo"></Bubble>
  </div>
</template>

<script>
import Bubble from '@/components/Bubbles'

export default {
  name: 'app',
  components: {
    Bubble
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
