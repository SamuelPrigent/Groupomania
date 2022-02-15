<script setup>
import Nav from "./components/Nav.vue";
import Footer from "./components/footer.vue";
</script>

<template>
  <Nav></Nav>

  <!-- Page active Router -->
  <router-view></router-view>

  <Footer></Footer>
</template>

<style>
@import url(./style/reset.scss);

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
