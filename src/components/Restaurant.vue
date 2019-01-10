<template>
  <v-hover>
    <v-card
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 12 : 2}`"
      class="mx-auto"
      color="grey lighten-4"
      max-width="600"
      height="450"
    >
      <v-img :aspect-ratio="16/9" :src="image">
        <v-btn block fab small left color="red" @click="supprimerRestaurant()">
          <v-icon color="white">clear</v-icon>
        </v-btn>
      </v-img>

      <div>
        <v-card-text class="pt-4" style="position: relative;">
          <v-btn
            absolute
            color="orange"
            class="white--text"
            fab
            right
            top
            @click="$emit('modifRestaurant',restaurant)"
          >
            <v-icon>edit</v-icon>
          </v-btn>
          <div>
            <h3 class="display-1 font-weight-light orange--text mb-2">{{nomRestaurant}}</h3>
            <div class="font-weight-light title mb-2">{{cuisine}}</div>
            <div class="d-flex">
              <v-rating
                :value="parseFloat(calculMoy(restaurant.grades))"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>
              <div class="ml-2 grey--text text--darken-2">
                <span>{{ calculMoy(restaurant.grades) }}</span>
                <span>({{ restaurant.grades.length}})</span>
              </div>
            </div>
          </div>
        </v-card-text>
      </div>

      <v-spacer></v-spacer>
      <div>
        <v-btn @click="gotoDetail()">Acceder au détail</v-btn>
      </div>
    </v-card>
  </v-hover>
</template>

<script>
//restaurant.grades.length
export default {
  data() {
    return {
      /*
      userName: "toto",
      */
      value: 5,
      nomModif: "",
      cuisineModif: ""
    };
  },
  methods: {
    gotoDetail() {
      this.$router.push({
        name: "restaudetail",
        params: {
          id: this.identifiant,
          imagerestaurant: this.image
        }
      });
      console.log(this.identifiant);
    },
    supprimerRestaurant() {
      console.log("je vais supprimer un restaurant");
      console.log(this.restaurant._id);
      let url = "http://localhost:8081/api/restaurants/" + this.restaurant._id;
      fetch(url, {
        method: "DELETE"
      })
        .then(responseJSON => {
          return responseJSON.json();
        })
        .then(responseJS => {
          //this.showSnackbar = true;
          this.$emit("loadRestaurants");
          this.$emit("snackbar", responseJS.msg);
        })
        .catch(err => {
          console.log("une erreur est intervenue");
        });
    },
    calculMoy(tab) {
      var total = 0;
      tab.forEach(element => {
        total = total + parseInt(element.score);
      });
      return (total / tab.length / 4).toFixed(2);
    }
  },
  components: {
    // LOCAL COMPONENTS
  },
  props: [
    "restaurant",
    "identifiant",
    "nomRestaurant",
    "cuisine",
    "typeCuisine",
    "note",
    "nbnotes",
    "image"
  ],
  created() {},
  mounted() {
    //console.log("AVANT AFFICHAGE")
  }
};
</script>

<style>
p {
  font-style: italic;
  color: red;
}
</style>