import Vue from "vue";
import App from "./App.vue";

import VueRouter from "vue-router";
import User from "./components/User.vue";
import Restaurant from "./components/Restaurant.vue";
import Restaurants from "./components/Restaurants.vue";
import RestaurantDetail from "./components/RestaurantDetail.vue";

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
    path: "/restaurant/:id",
    component: RestaurantDetail,
    name: "restaudetail"
  }
];

const router = new VueRouter({
  routes: routes,

  mode: "history"
});

Vue.component("app-user", User);
Vue.component("app-restaurant", Restaurant);
Vue.component("app-restau-detail", RestaurantDetail);

new Vue({
  el: "#app",
  router: router,
  render: h => h(App)
});
