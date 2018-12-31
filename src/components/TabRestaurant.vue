<template>
  <div>
    <md-table v-model="restaurants" md-card md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Restaurants : {{nb}}</h1>
        </div>

        <div class="md-toolbar-section-start">
          <md-button v-on:click="firstPage" class="md-icon-button md-primary">
            <md-icon>first_page</md-icon>
          </md-button>
          <md-button v-on:click="previousPage" class="md-icon-button md-primary">
            <md-icon>navigate_before</md-icon>
          </md-button>
          <md-button v-on:click="nextPage" class="md-icon-button md-primary">
            <md-icon>navigate_next</md-icon>
          </md-button>
          <md-button v-on:click="lastPage" class="md-icon-button md-primary">
            <md-icon>last_page</md-icon>
          </md-button>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input
            placeholder="Recherche par nom..."
            v-model="search"
            @input="rechercherRestaurant"
          />
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state
        md-label="Pas de restaurants trouvés"
        :md-description="`Pas de restaurants trouvé pour la recherche '${search}'. Essayer avec un autre nom de restaurant`"
      ></md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell id="cellNom" md-label="Nom" md-numeric>{{ item.name }}</md-table-cell>
        <md-table-cell id="cellCuisine" md-label="Cuisine">{{ item.cuisine }}</md-table-cell>
        <md-table-cell md-label="Actions">
          <md-button v-on:click="supprimerRestaurant(item)" class="md-fab md-mini md-plain">
            <md-icon>delete</md-icon>
          </md-button>
          <md-button
            @click="activeModifDialog = true; nomModif = item.name; cuisineModif = item.cuisine; idModif = item._id"
            class="md-fab md-mini md-plain"
          >
            <md-icon>edit</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
const toLower = text => {
  return text.toString().toLowerCase();
};

const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.name).includes(toLower(term)));
  }

  return items;
};

import _ from "lodash";

export default {
  name: "TableSearch",
  data: () => ({
    search: "",
    restaurants: [],
    page: 10,
    pageSize: 10,
    nb: 0,
    users: []
  }),
  methods: {
    newUser() {
      window.alert("Noop");
    },
    searchOnTable() {
      this.searched = searchByName(this.users, this.search);
    },
    getRestaurantsFromServer() {
      console.log("je vais chercher les restaurants");
      let url =
        "http://localhost:8081/api/restaurants?page=" +
        this.page +
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
    }
  },
  created() {
    this.restaurants = this.users;
  },
  mounted() {
    //console.log("AVANT AFFICHAGE")
    this.getRestaurantsFromServer();
    
  }
};
</script>

<style lang="css" scoped>
.md-field {
  max-width: 300px;
}
#cellNom {
  width: 40%;
}
#cellCuisine {
  width: 40%;
}
</style>