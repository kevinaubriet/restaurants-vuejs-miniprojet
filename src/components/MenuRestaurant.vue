<template>
  <div>
    <template>
      <v-parallax dark src="https://cdn.vuetifyjs.com/images/cards/cooking.png">
        <v-layout align-center column justify-center>
          <h1 class="display-2 font-weight-thin mb-3">Menu</h1>
          <h4 class="subheading">{{this.restaurant.name}}</h4>
        </v-layout>
      </v-parallax>
    </template>
    <app-entree-menu></app-entree-menu>
    <v-spacer></v-spacer>
    <app-plat-menu></app-plat-menu>
    <v-spacer></v-spacer>
    <app-dessert-menu></app-dessert-menu>
  </div>
</template>

<script>
import EntreeMenu from "./EntreeMenu";
import PlatMenu from "./EntreeMenu";
import DessertMenu from "./EntreeMenu";
export default {
  data() {
    return {
      restaurant: "",
      categories: []
    };
  },
  methods: {
    getRestaurantFromServer() {
      console.log("je vais chercher le restaurant");
      let url =
        "http://localhost:8081/api/restaurants/" + this.$route.params.id;
      fetch(url, {
        method: "GET"
      })
        .then(responseJSON => {
          return responseJSON.json();
        })
        .then(responseJS => {
          this.restaurant = responseJS.restaurant;
        })
        .catch(err => {
          console.log("une erreur est intervenue");
        });
    },
    getCategoriesFromApi() {
      console.log("je vais chercher le restaurant");
      let url = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";

      fetch(url, {
        method: "POST"
      })
        .then(responseJSON => {
          return responseJSON.json();
        })
        .then(responseJS => {
          return responseJS.meals;
        })
        .then(responseCate => {
          responseCate.forEach(element => {
            this.categories.push(element.strCategory);
          });
        })
        .catch(err => {
          console.log("une erreur est intervenue");
        });
    }
  },
  mounted() {
    //console.log("AVANT AFFICHAGE")
    this.getRestaurantFromServer();
    this.getCategoriesFromApi();
  },
  components: {
    "app-entree-menu": EntreeMenu,
    "app-plat-menu": PlatMenu,
    "app-dessert-menu": DessertMenu
  }
};
</script>

<style>
#test {
  background: blue;
}
.parallax {
  min-height: 380px;
}
</style>