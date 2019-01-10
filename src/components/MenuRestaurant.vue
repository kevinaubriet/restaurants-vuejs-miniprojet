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
    <app-entree-menu :entreesProp="this.entrees"></app-entree-menu>
    <v-spacer></v-spacer>
    <app-plat-menu :platsProp="this.plats" v-on:addToPanier="addToPanier($event)"></app-plat-menu>
    <v-spacer></v-spacer>
    <app-dessert-menu :dessertsProp="this.desserts"></app-dessert-menu>
  </div>
</template>

<script>
import EntreeMenu from "./EntreeMenu";
import PlatMenu from "./PlatMenu";
import DessertMenu from "./DessertMenu";
export default {
  data() {
    return {
      restaurant: "",
      categories: [],
      entrees: [],
      plats: [],
      desserts: [],
      elementPanier: { str: "", src: "", id: "", nb: 0, prix: 0 }
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
    },
    getElemFromCategories(category, callback) {
      console.log("je vais chercher le restaurant");
      var listOfCate;
      let url =
        "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + category;

      fetch(url, {
        method: "POST"
      })
        .then(responseJSON => {
          return responseJSON.json();
        })
        .then(responseJS => {
          listOfCate = responseJS.meals;
          callback(listOfCate);
        })
        .catch(err => {
          console.log("une erreur est intervenue");
        });
    },
    addToPanier(elem) {
      var dansPanier = false;
      this.$tabPanier.forEach(function(element) {
        if (element.idMeal == elem.id) {
          element.nb += 1;
          dansPanier == true;
        }
      });
      if (!dansPanier) {
        this.$tabPanier.push({
          str: elem.strMeal,
          src: elem.strMealThumb,
          id: elem.idMeal,
          nb: 1
        });
      }

      console.log(this.$tabPanier.length);
    },
    isInPanier(id) {
      var isIn = false;
      this.$tabPanier.forEach(function(element) {
        if (element.idMeal == id) {
          isIn = true;
        }
      });
      return isIn;
    }
  },

  mounted() {
    //console.log("AVANT AFFICHAGE")
    this.getRestaurantFromServer();
    this.getCategoriesFromApi();
    this.getElemFromCategories("Starter", tab => {
      this.entrees = tab;
    });
    this.getElemFromCategories("Pasta", tab => {
      this.plats = tab;
    });
    this.getElemFromCategories("Desert", tab => {
      this.desserts = tab;
    });
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