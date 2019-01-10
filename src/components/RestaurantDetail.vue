<template>
  <div id="user">
    <v-layout>
      <v-flex>
        <v-card>
          <v-img :src="this.$route.params.imagerestaurant" aspect-ratio="2.75"></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{restaurant.name}}</h3>
              <div>{{restaurant.address.building}} {{restaurant.address.street}} à {{restaurant.borough}}</div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn round @click="gotoMenu()" color="primary" dark>Consulter la carte du restaurant
              <v-icon medium>keyboard_arrow_right</v-icon>
            </v-btn>
          </v-card-actions>

          <v-card-text>Notes:</v-card-text>
          <v-list two-line>
            <template v-for="n in restaurant.grades.length">
              <app-elem-grade
                :key="n"
                :date="restaurant.grades[n-1].date"
                :grade="restaurant.grades[n-1].grade"
                :score="restaurant.grades[n-1].score"
              ></app-elem-grade>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import _ from "lodash";
import ElementGrade from "./ElementGrade";
export default {
  data() {
    return {
      restaurant: ""
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
    gotoMenu() {
      this.$router.push({
        name: "menurestaurant",
        params: {
          id: this.$route.params.id
        }
      });
    }
  },

  created() {},
  mounted() {
    //console.log("AVANT AFFICHAGE")
    this.getRestaurantFromServer();
  },
  components: {
    // LOCAL COMPONENTS
    "app-elem-grade": ElementGrade
  }
};
</script>

<style>
</style>