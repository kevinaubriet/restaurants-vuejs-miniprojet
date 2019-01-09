<template>
  <div></div>
</template>

<script>
import _ from "lodash";

export default {
  data() {
    return {
      restaurant: ""
    };
  },
  methods: {
    getMenu() {},
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
    }
  },

  created() {
    this.restaurants = this.users;
  },
  mounted() {
    //console.log("AVANT AFFICHAGE")
    this.getRestaurantFromServer();
  },
  components: {
    // LOCAL COMPONENTS
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