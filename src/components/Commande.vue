<template>
  <div id="user">
    <v-container v-for="n in ($tabPanier.length)" :key="`${n}`">
      <h3>{{$tabPanier[n-1].str}}</h3>
      <h3>x {{$tabPanier[n-1].nb}}</h3>
      <h3>prix unitaire : {{$tabPanier[n-1].prix}}</h3>
      <h3>prix groupé : {{$tabPanier[n-1].prix*$tabPanier[n-1].nb}}</h3>
      <v-spacer></v-spacer>
    </v-container>

    <h1>{{totalpanier}}</h1>

    <v-btn :loading="loading4" :disabled="loading4" color="info" @click="loader = 'loading4'">
      Commander
      <span slot="loader" class="custom-loader">
        <v-icon light>cached</v-icon>
      </span>
    </v-btn>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  data() {
    return {
      totalpanier: 0,
      loader: null,
      loading: false,
      loading2: false,
      loading3: false,
      loading4: false
    };
  },
  methods: {
    commander() {
      console.log("commande passée");
    },
    getPanier() {},
    getTotalPanier() {
      this.$tabPanier.forEach(element => {
        this.totalpanier = this.totalpanier + element.nb * element.prix;
      });
    }
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => {
        this[l] = false;
        this.commander();
      }, 3000);

      this.loader = null;
    }
  },
  created() {},
  mounted() {
    //console.log("AVANT AFFICHAGE")
    this.getTotalPanier();
  },
  components: {
    // LOCAL COMPONENTS
  }
};

const toLower = text => {
  return text.toString().toLowerCase();
};

const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.name).includes(toLower(term)));
  }

  return items;
};
</script>

<style>
p {
  font-style: italic;
  color: red;
}
#testbackground {
  background-color: blue;
}
#testbackground2 {
  background-color: red;
}
#testbackground3 {
  background-color: yellow;
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>