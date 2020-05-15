<template>
  <div id="app">
    <v-menu />
    <router-view />
    <v-footer />
  </div>
</template>

<script>
import Vue from "vue";
import menu from '@/components/common/TopMenu'
import footer from '@/components/common/Footer'

Vue.component("v-menu", menu);
Vue.component("v-footer", footer);

export default {
  name: 'App',
  components: { }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
