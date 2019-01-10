<template>
  <div id="user">
    <h3>Listes des restaurants</h3>

    <v-layout row justify-center>
      <v-dialog v-model="activeModifDialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Modification du restaurant</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field label="Nom" v-model="nomModif"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Cuisine" v-model="cuisineModif"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="activeModifDialog=false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="modifierRestaurant()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <md-snackbar :md-active.sync="snackbar">{{messageSnackBar}}</md-snackbar>

    <div>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12>
            <v-subheader class="pl-0">Nombre de restaurants affichés</v-subheader>
            <v-slider
              persistent-hint
              thumb-label
              v-model="pageSize"
              @input="rechercherRestaurant()"
            ></v-slider>
          </v-flex>
        </v-layout>
      </v-container>
    </div>

    <v-layout>
      <v-flex>
        <v-card>
          <v-card-title>
            <v-text-field
              solo
              v-model="search"
              @input="rechercherRestaurant()"
              label="Rechercher un restaurant ..."
              append-icon="search"
            ></v-text-field>
          </v-card-title>
          <v-container v-bind="{ [`grid-list-xl`]: true }" fluid>
            <v-layout row wrap>
              <v-flex v-for="n in restaurants.length" :key="`3${n}`" md3>
                <app-restaurant
                  v-on:loadRestaurants="getRestaurantsFromServer()"
                  v-on:snackbar="showSnackbar($event)"
                  v-on:modifRestaurant="showActiveDialog($event)"
                  :restaurant="restaurants[n-1]"
                  :identifiant="restaurants[n-1]._id"
                  :nomRestaurant="restaurants[n-1].name"
                  :cuisine="restaurants[n-1].cuisine"
                  :image="getRandomImage()"
                ></app-restaurant>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <div class="text-center">
          <v-pagination
            v-model="(page)"
            :length="Math.round((this.nb - 1) / this.pageSize,0)-1"
            :total-visible="7"
            @input="getRestaurantsFromServer()"
          ></v-pagination>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Restaurant from "./Restaurant.vue";
import DialogModif from "./dialogModif.vue";
import randomImagesApi from "../api/RandomImages.js";
import _ from "lodash";

export default {
  data() {
    return {
      userName: "toto",
      search: "",
      restaurants: [],
      page: 1,
      pageSize: 10,
      nb: 0,
      users: [],
      snackbar: false,
      activeModifDialog: false,
      nomModif: "",
      cuisineModif: "",
      idModif: "",
      messageSnackBar: "",
      valueModifDialog: null,
      tableauImages: []
    };
  },
  methods: {
    newUser() {
      window.alert("Noop");
    },
    test() {
      console.log(this.pageSize);
    },
    showSnackbar(message) {
      this.messageSnackBar = message;
      this.snackbar = true;
    },
    searchOnTable() {
      this.searched = searchByName(this.users, this.search);
    },
    getRestaurantsFromServer() {
      console.log("je vais chercher les restaurants");
      let url =
        "http://localhost:8081/api/restaurants?page=" +
        (this.page - 1) +
        "&pagesize=" +
        this.pageSize +
        "&name=" +
        this.search;

      fetch(url, {
        method: "GET"
      })
        .then(responseJSON => {
          return responseJSON.json();
        })
        .then(responseJS => {
          this.restaurants = responseJS.data;
          this.nb = responseJS.count;
        })
        .catch(err => {
          console.log("une erreur est intervenue");
        });
      //this.getImagesFromserver();
    },
    getImagesFromserver() {
      randomImagesApi
        .images("restaurant", 50)
        .then(imageResult => {
          imageResult.data.result.items.forEach(item => {
            this.tableauImages.push(item.media);
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    getRandomImage() {
      var random = Math.round(Math.random() * this.tableauImages.length);
      return this.tableauImages[random];
    },
    showActiveDialog(resto) {
      this.activeModifDialog = true;
      this.nomModif = resto.name;
      this.cuisineModif = resto.cuisine;
      this.idModif = resto._id;
      console.log(resto.name);
    },
    modifierRestaurant(restaurant) {
      console.log("je vais modifier un restaurant");

      this.activeModifDialog = false;

      var formData = new FormData();

      let url = "http://localhost:8081/api/restaurants/" + this.idModif;

      formData.append("nom", this.nomModif);
      formData.append("cuisine", this.cuisineModif);
      //formData.append("borough", "salut");

      fetch(url, {
        method: "PUT",
        body: formData
      })
        .then(responseJSON => {
          return responseJSON.json();
        })
        .then(responseJS => {
          console.log(responseJS.msg);
          console.log(responseJS.error);
          this.apiMessage = responseJS.msg;
          this.showSnackbar = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    rechercherRestaurant: _.debounce(function() {
      this.page = 1;
      this.getRestaurantsFromServer();
    }, 300),
    previousPage() {
      if (this.page > 0) {
        this.page--;
        this.getRestaurantsFromServer();
      }
      console.log("Précédant");
    },
    nextPage() {
      if (this.page < (this.nb - 1) / this.pageSize) {
        this.page++;
        this.getRestaurantsFromServer();
      }
      console.log("Suivant");
    },
    firstPage() {
      this.page = 0;
      this.getRestaurantsFromServer();
      console.log("Première page");
    },
    lastPage() {
      this.page = (this.nb - 1) / this.pageSize;
      this.getRestaurantsFromServer();
      console.log("Dernière page");
    }
  },

  created() {
    this.restaurants = this.users;
  },
  mounted() {
    //console.log("AVANT AFFICHAGE")
    this.getRestaurantsFromServer();
  },
  components: {
    // LOCAL COMPONENTS
    "app-restaurant": Restaurant,
    "app-dialog": DialogModif
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
</style>