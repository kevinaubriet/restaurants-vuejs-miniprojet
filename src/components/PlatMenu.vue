<template>
  <div>
    <!--
    <h3>{{this.platsProp[0].strMeal}}</h3>
    <v-btn @click="$emit('addToPanier',platsProp[0])">Ajouter au panier</v-btn>
    -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "toto",
      plat: ""
    };
  },
  methods: {},
  components: {},
  props: ["platsProp"]
};
</script>

<style>
</style>