import Vue from "vue";
import App from "./App.vue";

import VueRouter from "vue-router";
import Restaurant from "./components/Restaurant.vue";
import Restaurants from "./components/Restaurants.vue";
import RestaurantDetail from "./components/RestaurantDetail.vue";
import Commande from "./components/Commande.vue";
import MenuRestaurant from "./components/MenuRestaurant.vue";

//Map import
import { L, LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css'

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

import Vuetify from "vuetify";
Vue.use(Vuetify);
import "vuetify/dist/vuetify.min.css";

import VueMaterial from "vue-material";
Vue.use(VueMaterial);
import "vue-material/dist/vue-material.min.css";

import VueLodash from "vue-lodash";

Vue.use(VueRouter);

const options = { name: "_" };
Vue.use(VueLodash, options);

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

Vue.component("app-restaurant", Restaurant);
Vue.component("app-restau-detail", RestaurantDetail);
Vue.component("app-commande", Commande);
Vue.component("app-menu-restaurant", MenuRestaurant);

Vue.prototype.$tabPanier = [];

new Vue({
  el: "#app",
  router: router,
  render: h => h(App)
});
