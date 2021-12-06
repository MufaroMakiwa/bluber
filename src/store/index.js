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
    user: null,
    mapStyle: 'streets-v11'
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
    setMapStyle(state, payload) {
      state.mapStyle = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    updateNotificationStatus(state, payload) {
      const notifications = state.user.notifications.map(notification => {
        if (payload.notificationIds.includes(notification._id)) {
          notification.notificationStatus = payload.status;
        }
        return notification;
      })
      state.user = { ...state.user, notifications }
    },
    
    setViewedDemo(state, payload) {
      state.user = {...state.user, viewedDemo: payload}
    }
  },

  actions: {
    setTemplate(state, payload) {
      state.commit("setTemplate", payload);
    },
    setMarkType(state, payload) {
      state.commit("setMarkType", payload);
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
    setMapState(state, payload) {
      state.commit('setMapState', payload);
    },
    setStartMarker(state, payload) {
      state.commit('setStartMarker', payload);
    },
    setEndMarker(state, payload) {
      state.commit('setEndMarker', payload);
    },
    setUser(state, payload) {
      state.commit('setUser', payload)
    },
    setMapStyle(state, payload) {
      state.commit('setMapStyle', payload);
    },
    async getUser(state) {
      const response = await axios.get('/api/user/session');
      state.commit('setUser', response.data.user);
    },
    updateNotificationStatus(state, payload) {
      state.commit('updateNotificationStatus', payload)
    },
    deleteNotification(state, payload) {
      state.commit('deleteNotification', payload)
    },
    setViewedDemo(state,payload) {
      state.commit("setViewedDemo", payload)
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
    isSignedIn: state => state.user !== null,
    user: state => state.user,
    point1: state => state.point1,
    point2: state => state.point2,
    mapStyle: state => state.mapStyle
  }
});

export default store;
