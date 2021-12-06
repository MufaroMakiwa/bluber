import Vue from 'vue';
import App from './App';
import router from './router/index';
import store from './store/index';
import 'leaflet/dist/leaflet.css';
import 'leaflet-arrowheads'
import VueCookie from 'vue-cookie';
import vuetify from './plugins/vuetify'

import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";


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
  faMoon,
  faComments,
  faInfo,
  faChevronLeft,
  faChevronRight,
  faCircle } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


library.add(
  faStar, faComment, faBars, faUserCircle, faPlus, faMoon,
  faMapMarked, faExchangeAlt, faMinus, faStarHalf, faEdit,
  faStarRegular, faBell, faMapMarker, faMap, faEllipsisH,
  faTimesCircle, faTimes, faArrowLeft, faFilter, faTrashAlt,
  faSignOutAlt, faSave, faLayerGroup, faSatellite, faStreetView,
  faComments, faInfo, faChevronLeft, faChevronRight, faCircle
);

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

// initialize event bus
export const eventBus = new Vue();

Vue.use(VueCookie);

const firebaseConfig = {
  apiKey: "AIzaSyCD-h_T627RrCy3H_G9SiEF6kwzMHJ9rWk",
  authDomain: "bluber-332905.firebaseapp.com",
  projectId: "bluber-332905",
  storageBucket: "bluber-332905.appspot.com",
  messagingSenderId: "617587199418",
  appId: "1:617587199418:web:ba0fe55c4279e230756183",
  measurementId: "G-LTV2X55SVC"
};

export const firebase = initializeApp(firebaseConfig);

Vue.use(firebase);


new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  firebase,
  render: h => h(App)
});

