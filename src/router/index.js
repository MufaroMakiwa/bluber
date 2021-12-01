import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';
import store from "../store/index";

Vue.use(VueRouter);


const router = new VueRouter({
  mode: 'history',

  routes: [ 
    {
      path: '/', 
      name: "Home",
      component: Home, 
      props: true,

      beforeEnter: async (to, from, next) => {
        await store.dispatch('getUser');
        next();
      },
    },
  ]
});


export default router;