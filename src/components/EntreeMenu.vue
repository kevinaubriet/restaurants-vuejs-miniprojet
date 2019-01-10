<template>
  <div>
    <v-layout>
      <h2>{{this.entreesProp[0].strMeal}}</h2>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: "",
      category: "Starter",
      tabEntree: []
    };
  },
  methods: {
    getEntreeFromApi() {
      console.log("je vais chercher le restaurant");
      let url =
        "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + this.category;

      fetch(url, {
        method: "POST"
      })
        .then(responseJSON => {
          console.log(responseJSON);
          return responseJSON.json();
        })
        .then(responseJS => {
          this.tabEntree = responseJS.meals;
        })
        .catch(err => {
          console.log("une erreur est intervenue");
        });
    }
  },
  components: {},
  mounted() {
    //this.getEntreeFromApi();
  },
  props: ["entreesProp"]
};
</script>

<style>
</style>