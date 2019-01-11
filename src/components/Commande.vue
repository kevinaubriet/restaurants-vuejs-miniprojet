<template>
  <div id="user">
    <h3 v-if="$tabPanier.length == 0">Votre panier est vide</h3>
    <v-container v-for="(article,index) in $tabPanier" :key="index">
      <v-card>
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap>
            <v-flex xs4>
              <v-img :src="article.src"></v-img>
            </v-flex>
            <v-flex xs8>
              <v-card id="fils" dark color="primary">
                <h3>{{article.str}}</h3>
                <h3>x {{article.nb}}</h3>
                <h3>prix unitaire : {{article.prix}} €</h3>
                <h3>prix groupé : {{(article.prix)*(article.nb)}} €</h3>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>

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
      console.log(this.$tabPanier.length);
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