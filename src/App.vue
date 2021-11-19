<template>
    <div style="height: 500px; width: 100%" id="map">
    <div style="height: 200px; overflow: auto;">
      <p>First marker is placed at {{ popup }}</p>
      <p>Center is at {{ currentCenter }} and the zoom is: {{ currentZoom }}</p>
      <button @click="showLongText">
        Toggle long popup
      </button>
      <button @click="showMap = !showMap">
        Toggle map
      </button>
    </div>
    <l-map
      v-if="showMap"
      v-on:click="handleClick"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 100%"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <l-marker v-if="popup !== undefined" :lat-lng="popup">
        <l-popup>
          <div @click="innerClick">
            {{ popupContent }}
          </div>
        </l-popup>
      </l-marker>
      <!-- {{circleMarker}} -->
      <l-marker v-if="secondPopup !== undefined" :lat-lng="secondPopup">
        <l-popup>
          <div @click="innerClick">
            {{ secondPopupContent }}
          </div>
        </l-popup>
      </l-marker>
      <l-circle v-if="Object.keys(circleMarker).length>0"
        :lat-lng="circleMarker.center"
        :radius="circleMarker.radius"
        :color="circleMarker.color"
      />
    </l-map>  
     
    <div>
      <Navigation/>
    </div>

    <div class="floating-box">
      <MarksList v-bind:marks="marks"/>
    </div> 

    <div class="menu"> 
      <Menu />  
    </div>

    
  </div> 

  </template>

<script>

// import L from 'leaflet';
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LCircle } from "vue2-leaflet";
import { Icon } from 'leaflet';
import MarksList from './components/MarksList.vue';
import Menu from "./components/Menu.vue";
import Navigation from "./components/Navigation.vue";

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
export default {
  name: "Example",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LCircle,
    MarksList,
    Menu,
    Navigation
    // LTooltip
  },
  data() {
    return {
      zoom: 13,
      center: latLng(42.373611, -71.110558),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      popup: undefined,
      popupContent: "",
      secondPopup: undefined, 
      secondPopupContent: "",
      // tooltip: undefined,
      currentZoom: 11.5,
      currentCenter: latLng(42.373611, -71.110558),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true,
      routing_state: [],
      circleMarker: {},
      marks: [
         {markId: 1, caption: "There is a traffic jam", tag:"busy", time:"posted 30 minutes ago"},
         {markId: 2, caption: "There is an accident and the road is blocked", tag:"blocked", time:"posted 1 hour ago"},
         {markId: 3, caption: "Something is happening here", tag:"not safe", time:"posted yesterday"},
         {markId: 4, caption: "There is a riot going on here", tag:"busy", time:"posted right now"},
      ]
      //latLng(42.373611,  -71.110558)
    };
  },
  beforeCreate() {
    // const map = new L.Map('map', { center: new L.LatLng(%.06f, %.06f), zoom: 13, doubleClickZoom: false });
    // map.on('dblclick', clickHandler);
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick() {
      alert("Click!");
    },

    getDistance(origin, destination) {
      // return distance in meters
      var lon1 = this.toRadian(origin[1]),
          lat1 = this.toRadian(origin[0]),
          lon2 = this.toRadian(destination[1]),
          lat2 = this.toRadian(destination[0]);

      var deltaLat = lat2 - lat1;
      var deltaLon = lon2 - lon1;

      var a = Math.pow(Math.sin(deltaLat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon/2), 2);
      var c = 2 * Math.asin(Math.sqrt(a));
      var EARTH_RADIUS = 6371;
      return c * EARTH_RADIUS * 1000;
    },
    toRadian(degree) {
      return degree*Math.PI/180;
    },
    handleClick(e) {
      if (this.routing_state.length == 0 || this.routing_state.length == 2) {
         if (this.routing_state.length == 2) {
            this.routing_state = [];
            this.popup = undefined;
            this.secondPopup = undefined;
            this.circleMarker = {};
         }
          this.routing_state.push([e.latlng.lat, e.latlng.lng]);
          this.popup = e.latlng;
          this.showParagraph = true;
          this.popupContent = "Starting Point for Routing: (" + Math.round(e.latlng.lat*10000)/10000 + ", " + Math.round(e.latlng.lng*10000)/10000 + ")<br/>Double-click somewhere else to find a route to that point.";
      } else if (this.routing_state.length == 1) {
          this.routing_state.push([e.latlng.lat, e.latlng.lng]);
          this.secondPopup = e.latlng;
          this.secondPopupContent = "Finding route";
          let area_x = (this.routing_state[0][0] + this.routing_state[1][0])/2;
          let area_y = (this.routing_state[0][1] + this.routing_state[1][1])/2;
          let distance = this.getDistance(this.routing_state[0], this.routing_state[1])
          this.circleMarker = {center: [area_x, area_y], radius: distance, color: 'blue'};
          // create post request 
          // draw connecting lines between points
      } 
    }
  }
};
</script>
