import Vue from 'vue';
import App from './App.vue';

import VueRouter from 'vue-router';
import User from './components/User.vue';
import Restaurant from './components/Restaurant.vue';
import Restaurants from './components/Restaurants.vue';

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';


Vue.use(VueMaterial);
 
Vue.use(Vuetify);

Vue.use(VueRouter);

const routes = [

  {path:'/', component: User},
  {path:'/restaurants', component: Restaurants},

]


const router = new VueRouter({

  routes: routes,

  mode:'history'

})

Vue.component("app-user", User);
Vue.component("app-restaurant", Restaurant);

new Vue({
  el: '#app',
  router:router,
  render: h => h(App)
})
