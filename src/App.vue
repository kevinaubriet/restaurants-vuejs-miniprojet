<template>
  <div id="app">
    <v-app>
      <v-toolbar>
        <v-toolbar-title>{{$route.name}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn v-if="$route.name != 'panier'" fab @click="gotoPanier()">
            <v-icon large color="grey lighten-1">shopping_basket</v-icon>
          </v-btn>
          <v-btn fab @click="gotoHome()">
            <v-icon large color="grey lighten-1">home</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <router-view></router-view>
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
    },
    gotoHome() {
      this.$router.push({
        name: "restaurants"
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
