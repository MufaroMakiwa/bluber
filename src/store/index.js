import Vue from "vue";
import Vuex from "vuex";


Vue.use(Vuex);


const store = new Vuex.Store({
  state: {
    userId: "gangoffour2",
    template: "authentication",
    markType: "intersection",
    mapState: "marking",
    startMarker: [],
    endMarker: [],
    bbox:[ -73.508142,	41.237964,	-69.928393,	42.886589], //xmin	ymin	xmax	ymax
    route: [],
    user: null
  },

  mutations: {
    setTemplate(state, payload) {
      state.template = payload;
    },
    setMarkType(state, payload) {
      state.markType = payload;
    },
    setMapState(state, payload) {
      state.mapState = payload;
    },
    setStartMarker(state, payload) {
      state.startMarker = payload;
    },
    setEndMarker(state, payload) {
      state.endMarker = payload;
    },
    setRoute(state, payload) {
      state.route = payload;
    },
    setUser(state, payload) {
      state.user = payload;

      // if user is signed out, set template to be auth else plan
      state.user === null ? state.template = 'authentication' : state.template = 'plan';   
    }
  },

  actions: {
    setTemplate(state, payload) {
      state.commit('setTemplate', payload);
    },
    setMarkType(state, payload) {
      state.commit('setMarkType', payload);
    },
    setMapState(state, payload) {
      state.commit('setMapState', payload);
    },
    setStartMarker(state, payload) {
      state.commit('setStartMarker', payload);
    },
    setEndMarker(state, payload) {
      state.commit('setEndMarker', payload);
    },
    setRoute(state, payload) {
      state.commit('setRoute', payload);
    },
    setUser(state, payload) {
      state.commit('setUser', payload)
    }
  },

  getters: {
    template: state => state.template,
    markType: state => state.markType,
    mapState: state => state.mapState,
    startMarker: state => state.startMarker,
    endMarker: state => state.endMarker,
    bbox: state => state.bbox,
    route: state => state.route,
    userId: state => state.userId,
    isSignedIn: state => state.user !== null,
    user: state => state.user
  }
});

export default store;