<template>
  <div>
    <!--
      <v-parallax dark src="https://cdn.vuetifyjs.com/images/cards/cooking.png">
        <v-layout align-center column justify-center>
          <h1 class="display-2 font-weight-thin mb-3">Menu</h1>
          <h4 class="subheading">{{this.restaurant.name}}</h4>
        </v-layout>
      </v-parallax>
    -->
    <v-img></v-img>
    <app-entree-menu :entreesProp="this.entrees" v-on:addPanier="addToPanier($event)"></app-entree-menu>
    <v-spacer></v-spacer>
    <app-plat-menu :platsProp="this.plats" v-on:addPanier="addToPanier($event)"></app-plat-menu>
    <v-spacer></v-spacer>
    <app-dessert-menu :dessertsProp="this.desserts" v-on:addPanier="addToPanier($event)"></app-dessert-menu>
  </div>
</template>


<script>
import EntreeMenu from "./EntreeMenu";
import PlatMenu from "./PlatMenu";
import DessertMenu from "./DessertMenu";
import _ from "lodash";

var jsonEntree = {
  meals: [
    {
      strMeal: "Broccoli & Stilton soup",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/tvvxpv1511191952.jpg",
      idMeal: "52842"
    },
    {
      strMeal: "Clam chowder",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/rvtvuw1511190488.jpg",
      idMeal: "52840"
    },
    {
      strMeal: "Cream Cheese Tart",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/wurrux1468416624.jpg",
      idMeal: "52779"
    },
    {
      strMeal: "Creamy Tomato Soup",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/stpuws1511191310.jpg",
      idMeal: "52841"
    }
  ]
};
var jsonPlat = {
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

var jsonDessert = {
  meals: [
    {
      strMeal: "Apple & Blackberry Crumble",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/xvsurr1511719182.jpg",
      idMeal: "52893"
    },
    {
      strMeal: "Apple Frangipan Tart",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg",
      idMeal: "52768"
    },
    {
      strMeal: "Bakewell tart",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/wyrqqq1468233628.jpg",
      idMeal: "52767"
    },
    {
      strMeal: "Banana Pancakes",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/sywswr1511383814.jpg",
      idMeal: "52855"
    },
    {
      strMeal: "Battenberg Cake",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/ywwrsp1511720277.jpg",
      idMeal: "52894"
    },
    {
      strMeal: "BeaverTails",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/ryppsv1511815505.jpg",
      idMeal: "52928"
    },
    {
      strMeal: "Blackberry Fool",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/rpvptu1511641092.jpg",
      idMeal: "52891"
    },
    {
      strMeal: "Bread and Butter Pudding",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/xqwwpy1483908697.jpg",
      idMeal: "52792"
    },
    {
      strMeal: "Canadian Butter Tarts",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/wpputp1511812960.jpg",
      idMeal: "52923"
    },
    {
      strMeal: "Carrot Cake",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/vrspxv1511722107.jpg",
      idMeal: "52897"
    },
    {
      strMeal: "Chelsea Buns",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/vqpwrv1511723001.jpg",
      idMeal: "52898"
    },
    {
      strMeal: "Chinon Apple Tarts",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/qtqwwu1511792650.jpg",
      idMeal: "52910"
    },
    {
      strMeal: "Choc Chip Pecan Pie",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/rqvwxt1511384809.jpg",
      idMeal: "52856"
    },
    {
      strMeal: "Chocolate Avocado Mousse",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/uttuxy1511382180.jpg",
      idMeal: "52853"
    },
    {
      strMeal: "Chocolate Gateau",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/tqtywx1468317395.jpg",
      idMeal: "52776"
    },
    {
      strMeal: "Chocolate Raspberry Brownies",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/yypvst1511386427.jpg",
      idMeal: "52860"
    },
    {
      strMeal: "Chocolate Souffle",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/twspvx1511784937.jpg",
      idMeal: "52905"
    },
    {
      strMeal: "Christmas Pudding Flapjack",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/vvusxs1483907034.jpg",
      idMeal: "52788"
    },
    {
      strMeal: "Dundee cake",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/wxyvqq1511723401.jpg",
      idMeal: "52899"
    },
    {
      strMeal: "Eccles Cakes",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/wtqrqw1511639627.jpg",
      idMeal: "52888"
    },
    {
      strMeal: "Eton Mess",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/uuxwvq1483907861.jpg",
      idMeal: "52791"
    },
    {
      strMeal: "Hot Chocolate Fudge",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/xrysxr1483568462.jpg",
      idMeal: "52787"
    },
    {
      strMeal: "Jam Roly-Poly",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/ysqupp1511640538.jpg",
      idMeal: "52890"
    },
    {
      strMeal: "Key Lime Pie",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/qpqtuu1511386216.jpg",
      idMeal: "52859"
    },
    {
      strMeal: "Madeira Cake",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/urtqut1511723591.jpg",
      idMeal: "52900"
    },
    {
      strMeal: "Nanaimo Bars",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/vwuprt1511813703.jpg",
      idMeal: "52924"
    },
    {
      strMeal: "New York cheesecake",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/swttys1511385853.jpg",
      idMeal: "52858"
    },
    {
      strMeal: "Pancakes",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/rwuyqx1511383174.jpg",
      idMeal: "52854"
    },
    {
      strMeal: "Parkin Cake",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/qxuqtt1511724269.jpg",
      idMeal: "52902"
    },
    {
      strMeal: "Peach & Blueberry Grunt",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/ssxvup1511387476.jpg",
      idMeal: "52862"
    },
    {
      strMeal: "Peanut Butter Cheesecake",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/qtuuys1511387068.jpg",
      idMeal: "52861"
    },
    {
      strMeal: "Peanut Butter Cookies",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/1544384070.jpg",
      idMeal: "52958"
    },
    {
      strMeal: "Pear Tarte Tatin",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/rxvxrr1511797671.jpg",
      idMeal: "52916"
    },
    {
      strMeal: "Pouding chomeur",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/yqqqwu1511816912.jpg",
      idMeal: "52932"
    },
    {
      strMeal: "Pumpkin Pie",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/usuqtp1511385394.jpg",
      idMeal: "52857"
    },
    {
      strMeal: "Rock Cakes",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/tqrrsq1511723764.jpg",
      idMeal: "52901"
    },
    {
      strMeal: "Rocky Road Fudge",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/vtxyxv1483567157.jpg",
      idMeal: "52786"
    },
    {
      strMeal: "Salted Caramel Cheescake",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/xqrwyr1511133646.jpg",
      idMeal: "52833"
    },
    {
      strMeal: "Spotted Dick",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/xqvyqr1511638875.jpg",
      idMeal: "52886"
    },
    {
      strMeal: "Sticky Toffee Pudding",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/xqqqtu1511637379.jpg",
      idMeal: "52883"
    },
    {
      strMeal: "Sticky Toffee Pudding Ultimate",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/xrptpq1483909204.jpg",
      idMeal: "52793"
    },
    {
      strMeal: "Sugar Pie",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/yrstur1511816601.jpg",
      idMeal: "52931"
    },
    {
      strMeal: "Summer Pudding",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/rsqwus1511640214.jpg",
      idMeal: "52889"
    },
    {
      strMeal: "Tarte Tatin",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/ryspuw1511786688.jpg",
      idMeal: "52909"
    },
    {
      strMeal: "Timbits",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/txsupu1511815755.jpg",
      idMeal: "52929"
    },
    {
      strMeal: "Treacle Tart",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/wprvrw1511641295.jpg",
      idMeal: "52892"
    },
    {
      strMeal: "White chocolate creme brulee",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/uryqru1511798039.jpg",
      idMeal: "52917"
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
    getJson(json) {
      return json.meals;
    },
    random2elem(tab) {
      var tab2 = [];

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
      console.log("je vais ajouter au panier");

      var dansPanier = false;
      this.$tabPanier.forEach(function(element) {
        if (element.id == elem.id) {
          element.nb += 1;
          dansPanier = true;
        } else {
          console.log("pas dans panier");
        }
      });
      if (!dansPanier) {
        this.$tabPanier.push(elem);
      }

      console.log(this.$tabPanier.length);
    }
  },

  mounted() {
    //console.log("AVANT AFFICHAGE")
    this.getRestaurantFromServer();

    this.entrees = this.random2elem(this.getJson(jsonEntree));
    this.plats = this.random2elem(this.getJson(jsonPlat));
    this.desserts = this.random2elem(this.getJson(jsonDessert));

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