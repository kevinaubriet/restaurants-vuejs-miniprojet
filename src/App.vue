<template>
  <div id="app">
    <v-app>
      <div>
        <v-btn fixed top right fab @click="gotoPanier()">
          <v-icon large color="grey lighten-1">shopping_basket</v-icon>
        </v-btn>
      </div>

      <div>
        <router-view></router-view>
      </div>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      nbPanier: 0,
      elementsPanier: []
    };
  },
  methods: {
    gotoPanier() {
      this.$router.push({
        name: "panier"
      });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
