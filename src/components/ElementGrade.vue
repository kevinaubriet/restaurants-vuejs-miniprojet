<template>
  <div id="user">
    <v-layout row wrap>
      <v-flex xs4>
        <v-rating
          :value="parseFloat(score/4)"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>
      </v-flex>
      <v-flex xs4>
        <h3>{{getDate(date)}}</h3>
      </v-flex>
      <v-flex xs4>
        <h3>Notation : {{grade}}</h3>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "toto"
    };
  },
  methods: {
    getDate(str) {
      var tab = str.split("T");
      return tab[0];
    }
  },

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