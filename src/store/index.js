import Vue from "vue";
import Vuex from "vuex";


Vue.use(Vuex);


const store = new Vuex.Store({
  state: {
    template: "user-marks"
  },

  mutations: {
    setTemplate(state, payload) {
      state.template = payload;
    }
  },

  actions: {
    setTemplate(state, payload) {
      state.commit('setTemplate', payload);
    }
  },

  getters: {
    template: state => state.template,
  }
});

export default store;