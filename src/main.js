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
  faTimes,
  faArrowLeft, 
  faFilter,
  faEllipsisH,
  faTrashAlt,
  faEdit,
  faSave,
  faLayerGroup,
  faSignOutAlt,
  faSatellite,
  faStreetView,
  faMoon } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


library.add(
  faStar, faComment, faBars, faUserCircle, faPlus, faMoon,
  faMapMarked, faExchangeAlt, faMinus, faStarHalf, faEdit,
  faStarRegular, faBell, faMapMarker, faMap, faEllipsisH,
  faTimesCircle, faTimes, faArrowLeft, faFilter, faTrashAlt,
  faSignOutAlt, faSave, faLayerGroup, faSatellite, faStreetView
);
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
