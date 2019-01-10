<template>
  <div>
    <h3>{{this.dessertsProp[0].strMeal}}</h3>
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