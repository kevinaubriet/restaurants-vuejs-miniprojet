<template>
  <v-hover>
    <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
      <v-img :aspect-ratio="16/9" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>
      <v-card-title>
        <div>
          <span class="headline">{{nomRestaurant}}</span>
          <div class="d-flex">
            <v-rating :value="value" color="amber" dense half-increments readonly size="14"></v-rating>
            <div class="ml-2 grey--text text--darken-2">
              <span>{{ value }}</span>
              <span>({{ reviews }})</span>
            </div>
          </div>
        </div>
        <v-spacer></v-spacer>
        <v-btn icon class="mr-0">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
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
      reviews: 413,
      value: 4.5
    };
  },
  components: {
    // LOCAL COMPONENTS
  },
  props: {
    nomRestaurant: String,
    typeCuisine: String
  }
};
</script>

<style>
p {
  font-style: italic;
  color: red;
}
</style>