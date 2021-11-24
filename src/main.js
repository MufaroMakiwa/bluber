import Vue from 'vue';
import App from './App';
import router from './router/index';
import store from './store/index';
import 'leaflet/dist/leaflet.css';
import 'leaflet-arrowheads'
import VueCookie from 'vue-cookie';
import vuetify from './plugins/vuetify'



import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faBars, 
  faComment, 
  faStar, 
  faMapMarked,
  faPlus,
  faExchangeAlt,
  faUserCircle,
  faMinus,
  faStarHalf,
  faBell,
  faMapMarker,
  faMap, 
  faTimesCircle,
  faTimes } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


library.add(faStar, faComment, faBars, faUserCircle, faPlus, faMapMarked, faExchangeAlt, faMinus, faStarHalf, faStarRegular, faBell, faMapMarker, faMap, faTimesCircle, faTimes);
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

// initialize event bus
export const eventBus = new Vue();

Vue.use(VueCookie);

new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  render: h => h(App)
});
