import Vue from 'vue';
import App from './App';
import router from './router/index';
import store from './store/index';


Vue.config.productionTip = false;

// initialize event bus
export const eventBus = new Vue();



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
