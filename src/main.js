import Vue from 'vue';
import App from './App';
import router from './router/index';
import store from './store/index';
import 'leaflet/dist/leaflet.css';
import 'leaflet-arrowheads'


import { library } from '@fortawesome/fontawesome-svg-core'
import {  faBars, faComment, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


library.add(faStar)
library.add(faComment)
library.add(faBars)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

// initialize event bus
export const eventBus = new Vue();



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
