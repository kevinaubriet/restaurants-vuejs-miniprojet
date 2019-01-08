<template>
  <div id="user">
    <v-btn :loading="loading4" :disabled="loading4" color="info" @click="loader = 'loading4'">
      Icon Loader
      <span slot="loader" class="custom-loader">
        <v-icon light>cached</v-icon>
      </span>
    </v-btn>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  data() {
    return {
      loader: null,
      loading: false,
      loading2: false,
      loading3: false,
      loading4: false
    };
  },
  methods: {
    commander() {
      console.log("commande passée");
    }
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => {
        this[l] = false;
        this.commander();
      }, 3000);

      this.loader = null;
    }
  },
  created() {
    this.restaurants = this.users;
  },
  mounted() {
    //console.log("AVANT AFFICHAGE")
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
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>