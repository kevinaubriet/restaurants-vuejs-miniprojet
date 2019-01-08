<template>
  <v-hover>
    <v-card
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 12 : 2}`"
      class="mx-auto"
      v-on:click="gotoDetail()"
    >
      <v-img :aspect-ratio="16/9" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>
      <v-card-title>
        <div>
          <span class="headline">{{nomRestaurant}}</span>
          <div class="font-weight-light grey--text title mb-2">{{cuisine}}</div>
          <div class="d-flex">
            <v-rating
              :value="parseFloat(note)"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
            ></v-rating>
            <div class="ml-2 grey--text text--darken-2">
              <span>{{ note }}</span>
              <span>({{ nbnotes }})</span>
            </div>
          </div>
        </div>
        <v-spacer></v-spacer>
      </v-card-title>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  data() {
    return {
      /*
      userName: "toto",
      */
      value: 5
    };
  },
  methods: {
    gotoDetail() {
      this.$router.push({
        name: "restaudetail",
        params: {
          id: this.identifiant
        }
      });
      console.log(this.identifiant);
    }
  },
  components: {
    // LOCAL COMPONENTS
  },
  props: [
    "identifiant",
    "nomRestaurant",
    "cuisine",
    "typeCuisine",
    "note",
    "nbnotes"
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