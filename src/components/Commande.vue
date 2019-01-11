<template>
  <div id="user">
    <h3 v-if="$tabPanier.length == 0">Votre panier est vide</h3>
    <v-container v-for="(article,index) in $tabPanier" :key="index">
      <app-article-commande :article="article" v-on:loadPanier="getTotalPanier()"></app-article-commande>

      <v-spacer></v-spacer>
    </v-container>
    <div v-if="$tabPanier.length != 0">
      <v-card>
        <v-card-title>
          <v-container text-large-center>
            <h1>Total de la commande : {{totalpanier}} €</h1>
          </v-container>
        </v-card-title>
        <v-card-actions>
          <v-btn
            block
            :loading="loading4"
            :disabled="loading4"
            color="info"
            @click="loader = 'loading4'"
          >
            Commander
            <span slot="loader" class="custom-loader">
              <v-icon light>cached</v-icon>
            </span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import Article from "./ArticleCommande.vue";

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
      this.$tabPanier.length = 0;
      this.getTotalPanier();
    },
    getPanier() {},
    getTotalPanier() {
      console.log("je calcule le total");
      this.totalpanier = 0;
      this.$tabPanier.forEach(element => {
        this.totalpanier = this.totalpanier + element.nb * element.prix;
      });
      //console.log(this.totalpanier);
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
    "app-article-commande": Article
  }
};
</script>

<style>
p {
  font-style: italic;
  color: red;
}
#fils {
  height: 100%;
  width: 100%;
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