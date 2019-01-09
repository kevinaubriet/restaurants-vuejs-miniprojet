import Vue from "vue";
import App from "./App.vue";

import VueRouter from "vue-router";
import User from "./components/User.vue";
import Restaurant from "./components/Restaurant.vue";
import Restaurants from "./components/Restaurants.vue";
import RestaurantDetail from "./components/RestaurantDetail.vue";
import Commande from "./components/Commande.vue";
import MenuRestaurant from "./components/MenuRestaurant.vue";
import DialogModif from "./components/dialogModif.vue";

import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";

Vue.use(VueMaterial);

Vue.use(Vuetify);

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Restaurants, name: "restaurants" },
  { path: "/restaurants", component: Restaurants, name: "restaurants" },
  {
    path: "/restaurants/:id",
    component: RestaurantDetail,
    name: "restaudetail"
  },
  { path: "/panier", component: Commande, name: "panier" },
  {
    path: "/restaurants/:id/menu",
    component: MenuRestaurant,
    name: "menurestaurant"
  }
];

const router = new VueRouter({
  routes: routes,

  mode: "history"
});

Vue.component("app-user", User);
Vue.component("app-restaurant", Restaurant);
Vue.component("app-restau-detail", RestaurantDetail);
Vue.component("app-commande", Commande);
Vue.component("app-menu-restaurant", MenuRestaurant);
Vue.component("app-dialog", DialogModif);

new Vue({
  el: "#app",
  router: router,
  render: h => h(App)
});
