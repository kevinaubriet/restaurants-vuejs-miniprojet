<template>
  <div>
    <v-btn color="primary" dark @click="dialog = true">Open Dialog</v-btn>
    <app-dialog :visible="dialog" v-on:child-hide-event="dialog=false"></app-dialog>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  data() {
    return {
      dialog: false
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