<template>
  <div>
    <h3>DESSERTS</h3>
    <v-container v-bind="{ [`grid-list-xl`]: true }" fluid>
      <v-layout row wrap>
        <v-flex v-for="n in (dessertsProp.length)" :key="`6${n}`" md6>
          <v-hover>
            <v-card slot-scope="{ hover }" class="mx-auto" color="grey lighten-4" max-width="600">
              <v-img :aspect-ratio="16/9" :src="dessertsProp[n-1].src">
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
                    style="height: 100%;"
                  >{{dessertsProp[n-1].prix}} €</div>
                </v-expand-transition>
              </v-img>
              <v-card-text class="pt-4" style="position: relative;">
                <v-btn
                  absolute
                  color="orange"
                  class="white--text"
                  fab
                  large
                  right
                  top
                  @click="$emit('addPanier',dessertsProp[n-1])"
                >
                  <v-icon>shopping_cart</v-icon>
                </v-btn>
                <div class="font-weight-light grey--text title mb-2">For the perfect meal</div>
                <h3 class="display-1 font-weight-light orange--text mb-2">{{dessertsProp[n-1].str}}</h3>
                <div
                  class="font-weight-light title mb-2"
                >Our Vintage kitchen utensils delight any chef.
                  <br>Made of bamboo by hand
                </div>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "toto"
    };
  },
  methods: {},
  components: {},
  props: ["dessertsProp"]
};
</script>

<style>
</style>