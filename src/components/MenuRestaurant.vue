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
import _ from "lodash";

var json = {
  meals: [
    {
      strMeal: "Chilli prawn linguine",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/usywpp1511189717.jpg",
      idMeal: "52839"
    },
    {
      strMeal: "Fettucine alfredo",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/uquqtu1511178042.jpg",
      idMeal: "52835"
    },
    {
      strMeal: "Grilled Mac and Cheese Sandwich",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/xutquv1505330523.jpg",
      idMeal: "52829"
    },
    {
      strMeal: "Lasagne",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg",
      idMeal: "52844"
    },
    {
      strMeal: "Pilchard puttanesca",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/vvtvtr1511180578.jpg",
      idMeal: "52837"
    },
    {
      strMeal: "Venetian Duck Ragu",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/qvrwpt1511181864.jpg",
      idMeal: "52838"
    }
  ]
};

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
    getJson() {
      return json.meals;
    },
    random2elem(tab) {
      var tab2 = [];
      console.log("salut");
      console.log(tab.length);

      var element1 = tab[this._.random(tab.length - 1)];
      var element2 = tab[this._.random(tab.length - 1)];

      tab2.push({
        str: element1.strMeal,
        src: element1.strMealThumb,
        id: element1.idMeal,
        nb: 1,
        prix: this._.random(16)
      });
      tab2.push({
        str: element2.strMeal,
        src: element2.strMealThumb,
        id: element2.idMeal,
        nb: 1,
        prix: this._.random(16)
      });

      return tab2;
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
        this.$tabPanier.push(elem);
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

    var tab = this.getJson();
    this.entrees = this.random2elem(tab);

    /*
    this.getCategoriesFromApi();
    this.getElemFromCategories("Starter", tab => {
      console.log(tab.length);
      this.entrees = random2elem(tab);
      console.log(this.entrees);
    });
    this.getElemFromCategories("Pasta", tab => {
      this.plats = random2elem(tab);
    });
    this.getElemFromCategories("Desert", tab => {
      this.desserts = random2elem(tab);
    });
    */
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