<template>
  <div id="user">
    <h3>Salut</h3>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  data() {
    return {
      userName: "toto",
      search: "",
      restaurants: [],
      page: 10,
      pageSize: 10,
      nb: 0,
      users: []
    };
  },
  methods: {
    newUser() {
      window.alert("Noop");
    },
    searchOnTable() {
      this.searched = searchByName(this.users, this.search);
    },
    getRestaurantsFromServer() {
      console.log("je vais chercher les restaurants");

      let url =
        "http://localhost:8081/api/restaurants?page=" +
        this.page +
        "&pagesize=" +
        this.pageSize +
        "&name=" +
        this.search;

      fetch(url, {
        method: "GET"
      })
        .then(responseJSON => {
          return responseJSON.json();
        })
        .then(responseJS => {
          this.restaurants = responseJS.data;
          this.nb = responseJS.count;
          console.log(this.restaurants[0].name);
          console.log(this.restaurants[0].grades[0].score);
        })
        .catch(err => {
          console.log("une erreur est intervenue");
        });
    },
    rechercherRestaurant: _.debounce(function() {
      this.page = 0;
      this.getRestaurantsFromServer();
    }, 300),
    previousPage() {
      if (this.page > 0) {
        this.page--;
        this.getRestaurantsFromServer();
      }
      console.log("Précédant");
    },
    nextPage() {
      if (this.page < (this.nb - 1) / this.pageSize) {
        this.page++;
        this.getRestaurantsFromServer();
      }
      console.log("Suivant");
    },
    firstPage() {
      this.page = 0;
      this.getRestaurantsFromServer();
      console.log("Première page");
    },
    lastPage() {
      this.page = (this.nb - 1) / this.pageSize;
      this.getRestaurantsFromServer();
      console.log("Dernière page");
    }
  },

  created() {
    this.restaurants = this.users;
  },
  mounted() {
    //console.log("AVANT AFFICHAGE")
    this.getRestaurantsFromServer();
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