import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    template: "authentication",
    markType: "intersection",
    mapState: "planning",
    startMarker: [],
    endMarker: [],
    point1: [],
    point2: [],
    bbox: [-73.508142, 41.237964, -69.928393, 42.886589], //xmin	ymin	xmax	ymax
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
    setPoint1(state, payload) {
      state.point1 = payload;
    },
    setPoint2(state, payload) {
      state.point2 = payload;
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
    }
  },

  actions: {
    setTemplate(state, payload) {
      state.commit("setTemplate", payload);
    },
    setMarkType(state, payload) {
      state.commit("setMarkType", payload);
    },
    setMapState(state, payload) {
      state.commit("setMapState", payload);
    },
    setStartMarker(state, payload) {
      state.commit("setStartMarker", payload);
    },
    setEndMarker(state, payload) {
      state.commit("setEndMarker", payload);
    },
    setRoute(state, payload) {
      state.commit("setRoute", payload);
    },

    setPoint1(state, payload) {
      state.commit("setPoint1", payload);
    },

    setPoint2(state, payload) {
      state.commit("setPoint2", payload);
      state.commit('setMarkType', payload);
    },
    setUser(state, payload) {
      state.commit('setUser', payload)
    },
    async getUser(state) {
      const response = await axios.get('/api/user/session');
      state.commit('setUser', response.data.user);
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
    user: state => state.user,
    point1: (state) => state.point1,
    point2: (state) => state.point2
  }
});

export default store;
