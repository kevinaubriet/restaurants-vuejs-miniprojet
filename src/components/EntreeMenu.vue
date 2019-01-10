<template>
  <div>
    <v-layout></v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: "",
      category: ""
    };
  },
  methods: {
    getEntreeFromApi() {
      console.log("je vais chercher le restaurant");
      let url =
        "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + category;

      fetch(url, {
        method: "POST"
      })
        .then(responseJSON => {
          console.log(responseJSON);
          return responseJSON.json();
        })
        .then(responseJS => {
          return responseJS.meals;
        })
        .then(responseCate => {
          categories;
        })
        .catch(err => {
          console.log("une erreur est intervenue");
        });
    }
  },
  components: {},
  mounted() {
    //this.getEntreeFromApi();
  }
};
</script>

<style>
</style>