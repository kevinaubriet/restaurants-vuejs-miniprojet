<template>
  <div id="user">
    <h3>{{date}}</h3>
    <h3>{{grade}}</h3>
    <h3>{{score}}</h3>
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

  created() {},
  mounted() {
    //console.log("AVANT AFFICHAGE")
  },
  props: ["date", "grade", "score"],
  components: {
    // LOCAL COMPONENTS
  }
};
</script>