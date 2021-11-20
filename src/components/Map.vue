<template>
    <div style="height: 100vh; width: 100%" class="map-wrapper">
    <!-- <div style="height: 200px; overflow: auto;">
      <p>First marker is placed at {{ popup }}</p>
      <p>Center is at {{ currentCenter }} and the zoom is: {{ currentZoom }}</p>
      <button @click="showLongText">
        Toggle long popup
      </button>
      <button @click="showMap = !showMap">
        Toggle map
      </button>
    </div> -->
    <l-map 
      ref="myMap"
      v-if="showMap"
      v-on:click="handleClick"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 100%; width:100%;"
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
    
  </div> 

</template>

<script>
import L from 'leaflet';
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LCircle } from "vue2-leaflet";
import { Icon } from 'leaflet';
import {eventBus} from '../main'
import axios from 'axios'

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LCircle
  },

  data() {
    return {
      zoom: 13,
      map: null,
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
      markingState: "intersection",
      mapState: "marking", //planning
      mapVectors: {}

      //latLng(42.373611,  -71.110558)
    };
  },
  beforeCreate() {
    // const map = new L.Map('map', { center: new L.LatLng(%.06f, %.06f), zoom: 13, doubleClickZoom: false });
    // map.on('dblclick', clickHandler);
    eventBus.$on("change",(state)=>{
      if (this.markingState==="path"){
        this.routing_state = this.routing_state.splice(1);
        this.secondPopup =  undefined; //can we try to use null next time?
        this.circleMarker = {}
      }
      this.markingState = state
    });
  
    eventBus.$on("changeMapState",(state)=>{
      this.mapState= state
    });

    eventBus.$on("get-plan-radius",(center,radius)=>{
      console.log(center)
      this.circleMarker = {center: [center.lat,center.lng], radius: radius, color: 'blue'};
    });

    eventBus.$on("render-path",(path,markId)=>{
        let myVector =  L.polyline([path]).arrowheads( {frequency: 'endonly', size: '50%'} )
        this.mapVectors[markId] = myVector
        this.map = this.$refs.myMap.mapObject
        myVector.addTo(this.map)
    })
    eventBus.$on("deRender-path",(markId)=>{
        let myVector = this.mapVectors[markId]
        myVector.remove()
        delete this.mapVectors[markId]
    })
  },
  methods: {

    // changeMarkingState(state){
    //   console.log("thus is the state")
    //   // this.markingState = state;
    // },

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

    isIntersectionState(){
      return this.markingState==="intersection"
    },

    getMarks(){
      eventBus.$emit("get-marks",{
                startLat :  this.popup.lat,
                startLng : this.popup.lng,
                endLat: this.secondPopup.lat, 
                endLng: this.secondPopup.lng
      })
    },

    getPath(){
      axios.get("/api/mark/path",{ params : { 
        startLat :  this.popup.lat,
       startLng : this.popup.lng,
        endLat: this.secondPopup.lat, 
        endLng: this.secondPopup.lng
      }}).then((res)=>{
        let coords = res.data
        let myVector =  L.polyline([coords]).arrowheads( {frequency: 'endonly', size: '50%'} )
        this.map = this.$refs.myMap.mapObject
        myVector.addTo(this.map)
        eventBus.$emit("path",coords)
      }).catch((err)=>{
        console.log("this is my err",err)
      });
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
      if (this.mapState==="marking"){
        if (this.routing_state.length == 0 || this.routing_state.length == 2) {
          if (this.routing_state.length == 2) {
              this.routing_state = [];
              this.popup = undefined;
              this.secondPopup = undefined;
              this.circleMarker = {};
              // console.log("getting path")
              // this.getPath()
          }
            this.routing_state.push([e.latlng.lat, e.latlng.lng]);
            this.popup = e.latlng;
            this.showParagraph = true;
            this.popupContent = "Starting Point for Routing: (" + Math.round(e.latlng.lat*10000)/10000 + ", " + Math.round(e.latlng.lng*10000)/10000 + ")<br/>Double-click somewhere else to find a route to that point.";
        } else if (this.routing_state.length == 1 &&  !this.isIntersectionState()) {
            this.routing_state.push([e.latlng.lat, e.latlng.lng]);
            this.secondPopup = e.latlng;
            this.secondPopupContent = "Finding route";
            let area_x = (this.routing_state[0][0] + this.routing_state[1][0])/2;
            let area_y = (this.routing_state[0][1] + this.routing_state[1][1])/2;
            let distance = this.getDistance(this.routing_state[0], this.routing_state[1])
            this.circleMarker = {center: [area_x, area_y], radius: distance, color: 'blue'};

            this.getPath()
            // create post request 
            // draw connecting lines between points
        } else if (this.routing_state.length == 1 &&  this.isIntersectionState()){// change to another location
            this.routing_state = [e.latlng.lat,e.latlng];
            this.popup = e.latlng;
        }
      }else{
 
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
            this.getMarks();
            // this.secondPopupContent = "Finding route";
            // let area_x = (this.routing_state[0][0] + this.routing_state[1][0])/2;
            // let area_y = (this.routing_state[0][1] + this.routing_state[1][1])/2;
            // let distance = this.getDistance(this.routing_state[0], this.routing_state[1])
            // this.circleMarker = {center: [area_x, area_y], radius: distance, color: 'blue'};
            // create post request 
            // draw connecting lines between points
        }
      }
    }
  }
};
</script>

<style scoped>

/* .map-wrapper {
    height: 50%;
    width: 100%;
} */
</style>