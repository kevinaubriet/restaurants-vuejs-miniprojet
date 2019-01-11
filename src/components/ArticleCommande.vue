<template>
  <div>
    <v-card>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs4>
            <v-img :src="this.article.src"></v-img>
          </v-flex>
          <v-flex xs8>
            <v-card id="fils" dark color="primary">
              <v-container grid-list-md text-md-center>
                <v-layout column wrap>
                  <v-layout wrap md3>
                    <v-flex md6>
                      <h2>{{article.str}}</h2>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="Quantité"
                        v-model="article.nb"
                        prefix="x"
                        @change="reload()"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>

                  <h3>prix unitaire : {{this.article.prix}} €</h3>
                  <h3>prix groupé : {{(this.article.prix)*(this.article.nb)}} €</h3>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import _ from "lodash";
import Article from "./ArticleCommande";

export default {
  //"$emit('loadPanier',this.nb)"
  data() {
    return {
      totalpanier: 0
    };
  },
  methods: {
    getPanier() {},
    getTotalPanier() {
      console.log("je calcule le total");
      this.totalpanier = 0;
      this.$tabPanier.forEach(element => {
        this.totalpanier = this.totalpanier + element.nb * element.prix;
      });
      console.log(this.totalpanier);
    },
    reload() {
      this.$emit("loadPanier", this.article);
    }
  },
  watch: {},
  props: ["article"],
  created() {},
  mounted() {
    //console.log("AVANT AFFICHAGE")
  },
  components: {
    // LOCAL COMPONENTS
  }
};
</script>

<style>
p {
  font-style: italic;
  color: red;
}
#input-usage .v-input__prepend-outer,
#input-usage .v-input__append-outer,
#input-usage .v-input__slot,
#input-usage .v-messages {
  border: 1px dashed red;
}
</style>
