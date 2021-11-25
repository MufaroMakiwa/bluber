<template>
  <div style="height: 100vh; width: 100%" class="map-wrapper">
    <div id="mapContainer" class="basemap"></div>
    <div id="cl" ref="control" class="control-class"></div>
    <!-- <MglMap :accessToken="accessToken"  mapStyle="mapbox://styles/mapbox/streets-v11" @load="onMapLoad"/> -->
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
// import { MglMap } from "vue-mapbox";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
// import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

// import L from "leaflet";
import { latLng } from "leaflet";
// import { LMap, LTileLayer, LMarker, LPopup, LCircle, LControlLayers} from "vue2-leaflet";
// import { Icon } from "leaflet";
// import { eventBus } from "../main";
// import axios from "axios";

export default {
  name: "Map",
  components: {
    // LMap,
    // LTileLayer,
    // LMarker,
    // LPopup,
    // LCircle,
    // LControlLayers,
    // MglMap
  },

  data() {
    return {
      zoom: 13,
      map: null,
      center: latLng(42.373611, -71.110558),
      popup: undefined,
      popupContent: "",
      secondPopup: undefined,
      secondPopupContent: "",
      // tooltip: undefined,
      currentZoom: 11.5,
      currentCenter: latLng(42.373611, -71.110558),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5,
      },
      showMap: true,
      routing_state: [],
      circleMarker: {},
      markingState: "path",
      mapState: "marking", //planning
      mapVectors: {},
      accessToken:
        "pk.eyJ1IjoiaGlsbHp5dGFwcyIsImEiOiJja2MxZ3dtankxNThpMnpsbXo1MG4zdHkzIn0.mxO9d6EI9Xcr6d9RmmR3Jg",
      mapStyle: "mapbox://styles/mapbox/streets-v11",
      planningVectors: [],
      navigationControl: null,
      geocoderControl: null
    };
  },

  beforeMount() {},
  created() {},
  beforeCreate() {},

  mounted() {
    mapboxgl.accessToken = this.accessToken;

    this.map = new mapboxgl.Map({
      container: "mapContainer",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-71.110558, 42.373611],
      zoom: 15.5,
      pitch: 45,
      bearing: -17.6,
      antialias: true,
    });

    this.navigationControl = new MapboxDirections({
      accessToken: this.accessToken,
      unit: "metric",
      profile: "mapbox/cycling",
    });

    this.geocoderControl = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    })


    // this.map.addControl(this.navigationControl, "top-right");
    this.map.addControl(this.geocoderControl,"top-left");

    this.map.on("load", () => {
      // Insert the layer beneath any symbol layer.
      const layers = this.map.getStyle().layers;
      const labelLayerId = layers.find(
        (layer) => layer.type === "symbol" && layer.layout["text-field"]
      ).id;

      // The 'building' layer in the Mapbox Streets
      // vector tileset contains building height data
      // from OpenStreetMap.
      this.map.addLayer(
        {
          id: "add-3d-buildings",
          source: "composite",
          "source-layer": "building",
          filter: ["==", "extrude", "true"],
          type: "fill-extrusion",
          minzoom: 15,
          paint: {
            "fill-extrusion-color": "#aaa",

            // Use an 'interpolate' expression to
            // add a smooth transition effect to
            // the buildings as the user zooms in.
            "fill-extrusion-height": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "height"],
            ],
            "fill-extrusion-base": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "min_height"],
            ],
            "fill-extrusion-opacity": 0.6,
          },
        },
        labelLayerId
      );
    });
  },

  methods: {},
};
</script>

<style scoped>
.basemap {
  width: 100%;
  height: 100%;
}
/* .map-wrapper {
    height: 50%;
    width: 100%;
} */
</style>