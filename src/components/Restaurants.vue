<template>
  <div id="user">
    <h3>Listes des restaurants</h3>

    <div>
      <md-dialog :md-active.sync="activeModifDialog" v-model="valueModifDialog">
        <md-dialog-title>Modification du restaurant ...</md-dialog-title>

        <md-dialog-content>
          <md-field>
            <label>Nom</label>
            <md-input type="text" v-model="nomModif"></md-input>
          </md-field>
          <md-field>
            <label>Cuisine</label>
            <md-input type="text" v-model="cuisineModif"></md-input>
          </md-field>
        </md-dialog-content>

        <md-dialog-actions>
          <md-button class="md-primary" @click="activeModifDialog = false">Close</md-button>
          <md-button type="submit" class="md-primary" @click="modifRestaurant()">Save</md-button>
        </md-dialog-actions>
      </md-dialog>
    </div>
    <md-snackbar :md-active.sync="snackbar">{{messageSnackBar}}</md-snackbar>

    <v-layout>
      <v-flex>
        <v-card>
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
                  :note="calculMoy(restaurants[n-1].grades)"
                  :nbnotes="restaurants[n-1].grades.length"
                ></app-restaurant>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Restaurant from "./Restaurant.vue";
import _ from "lodash";

export default {
  data() {
    return {
      userName: "toto",
      search: "",
      restaurants: [],
      page: 0,
      pageSize: 10,
      nb: 0,
      users: [],
      snackbar: false,
      activeModifDialog: false,
      nomModif: "",
      cuisineModif: "",
      idModif: "",
      messageSnackBar: "",
      valueModifDialog: null
    };
  },
  methods: {
    newUser() {
      window.alert("Noop");
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

      let url = "http://localhost:8081/api/restaurants?pages=";
      this.page + "&pagesize=" + this.pageSize + "&name=" + this.search;

      fetch(url, {
        method: "GET"
      })
        .then(responseJSON => {
          return responseJSON.json();
        })
        .then(responseJS => {
          this.restaurants = responseJS.data;
          this.nb = responseJS.count;
          console.log(this.restaurants[0].name);
          console.log(this.restaurants[0].grades);
        })
        .catch(err => {
          console.log("une erreur est intervenue");
        });
    },
    showActiveDialog(resto) {
      this.activeModifDialog = true;
      this.nomModif = resto.name;
      this.cuisineModif = resto.cuisine;
      this.idModif = resto._id;
      console.log(resto.name);
    },
    modifRestaurant() {
      console.log("je vais modifier un restaurant");
      this.activeModifDialog = false;

      var formData = new FormData();

      let url = "http://localhost:8081/api/restaurants/" + this.idModif;

      formData.append("nom", this.nomModif);
      formData.append("cuisine", this.cuisineModif);

      fetch(url, {
        method: "PUT",
        body: formData
      })
        .then(responseJSON => {
          return responseJSON.json();
        })
        .then(responseJS => {
          console.log(responseJS.msg);
          this.apiMessage = responseJS.msg;
          this.showSnackbar = true;
          this.getRestaurantsFromServer();
        })
        .catch(err => {
          console.log("une erreur est intervenue");
        });
    },
    rechercherRestaurant: _.debounce(function() {
      this.page = 0;
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
    },
    calculMoy(tab) {
      var total = 0;
      tab.forEach(element => {
        total = total + parseInt(element.score);
      });
      return (total / tab.length / 4).toFixed(2);
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
    "app-restaurant": Restaurant
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