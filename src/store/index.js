import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userId: "gangoffour2",
    template: "plan",
    markType: "intersection",
    mapState: "planning",
    startMarker: [],
    endMarker: [],
    point1: [],
    point2: [],
    bbox: [-73.508142, 41.237964, -69.928393, 42.886589], //xmin	ymin	xmax	ymax
    route: [],
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
    },
  },

  getters: {
    template: (state) => state.template,
    markType: (state) => state.markType,
    mapState: (state) => state.mapState,
    startMarker: (state) => state.startMarker,
    endMarker: (state) => state.endMarker,
    bbox: (state) => state.bbox,
    route: (state) => state.route,
    userId: (state) => state.userId,
    point1: (state) => state.point1,
    point2: (state) => state.point2
  },
});

export default store;
