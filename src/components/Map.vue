<template>
  <div style="height: 100vh; width: 100%" class="map-wrapper">
    <div id="mapContainer" class="basemap"></div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
// import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import * as turf from "@turf/turf";
// import L from "leaflet";
import { latLng } from "leaflet";
import { eventBus } from "../main";
import { formatDate, toPrecision } from "../utils";
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
        zoomControl: false,
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
      geocoderControl: null,
    };
  },

  beforeMount() {},
  created() {},
  beforeDestroy() {
    eventBus.$off("mark-stations");
    eventBus.$off("fly-to");
  },

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

    eventBus.$on("fly-to", (coords) => {
      this.map.flyTo({
        center: coords,
        zoom: 20,
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
      });
    });
    eventBus.$on("mark-stations", (stations) => {
      let layer = {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: stations.map((station) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [station.lng, station.lat],
            },
            properties: {
              featureId: station.stationId,
              name: station.name,
              numBikesAvailable: station.numBikesAvailable,
              numDocksAvailable: station.numDocksAvailable,
              lastReported: station.lastReported,
              active: station.active,
            },
          })),
        },
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      };

      this.map.addSource("places", layer);

      this.map.addLayer({
        id: "clusters",
        type: "circle",
        source: "places",
        filter: ["has", "point_count"],
        paint: {
          // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#51bbd6",
            100,
            "#f1f075",
            750,
            "#f28cb1",
          ],
          "circle-radius": [
            "step",
            ["get", "point_count"],
            20,
            100,
            30,
            750,
            40,
          ],
        },
      });

      this.map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "places",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
      });

      this.map.loadImage(
        "https://img.icons8.com/external-wanicon-lineal-color-wanicon/64/000000/external-bike-healthy-wanicon-lineal-color-wanicon.png",
        (error, image) => {
          if (error) throw error;
          // Add the image to the map style.
          this.map.addImage("bicycle", image);
          this.map.addLayer({
            id: "unclustered-point",
            type: "symbol",
            source: "places",
            layout: {
              "icon-image": "bicycle", // reference the image
              "icon-size": 0.5,
            },
            filter: ["!", ["has", "point_count"]],
          });
        }
      );

      
      let popUp = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
      });


      this.map.on('mouseenter',"unclustered-point", (e)=>{

        const coordinates = e.features[0].geometry.coordinates.slice();
        // Ensure that if the map is zoomed out such that
        // multiple copies of the feature are visible, the
        // popup appears over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
          popUp
          .setLngLat(coordinates)
          .setHTML(
            `
            <div
              class="popup-locator-card"
            >
              <span class="popup-date">
                ${formatDate(e.features[0].properties.lastReported) }</span
              >
              <div class="card-header">
                <span class="name">${e.features[0].properties.name }</span>
              </div>
              <div class="card-body">
                <div class="bikes">
                  <span class="bikes-num">${
                    e.features[0].properties.numBikesAvailable
                  }</span>
                  <span class="bikes-text">Bikes</span>
                </div>
                <div class="docks">
                  <span class="docks-num">${
                    e.features[0].properties.numDocksAvailable
                  }</span>
                  <span class="docks-text">Docks</span>
                </div>
              </div>
            </div>  
        `
          )
          .addTo(this.map);
      });

      this.map.on('mouseleave', 'unclustered-point', () => {
        this.map.getCanvas().style.cursor = '';
        popUp.remove();
      });

      this.map.on("click", "unclustered-point", (e) => {
        this.map.flyTo({
          center: [e.lngLat.lng, e.lngLat.lat],
          zoom: 20,
          essential: true, // this animation is considered essential with respect to prefers-reduced-motion
      });

        const coordinates = e.features[0].geometry.coordinates.slice();

        // console.log(e)
        // Ensure that if the map is zoomed out such that
        // multiple copies of the feature are visible, the
        // popup appears over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // console.log(e)
        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(
            `
            <div
              class="popup-locator-card"
            >
              <span class="popup-date">
                ${formatDate(e.features[0].properties.lastReported) }</span
              >
              <div class="card-header">
                <span class="name">${e.features[0].properties.name }</span>
              </div>
              <div class="card-body">
                <div class="bikes">
                  <span class="bikes-num">${
                    e.features[0].properties.numBikesAvailable
                  }</span>
                  <span class="bikes-text">Bikes</span>
                </div>
                <div class="docks">
                  <span class="docks-num">${
                    e.features[0].properties.numDocksAvailable
                  }</span>
                  <span class="docks-text">Docks</span>
                </div>
              </div>
            </div>  
        `
          )
          .addTo(this.map);
      });

      /**
       * Listen for when a geocoder result is returned. When one is returned:
       * - Calculate distances
       * - Sort stores by distance
       * - Rebuild the listings
       * - Adjust the map camera
       * - Open a popup for the closest store
       * - Highlight the listing for the closest store.
       */
      this.geocoderControl.on("result", (event) => {
        /* Get the coordinate of the search result */
        const searchResult = event.result.geometry;

        /* Get the coordinate of the search result */

        /**
         * Calculate distances:
         * For each store, use turf.disance to calculate the distance
         * in miles between the searchResult and the store. Assign the
         * calculated value to a property called `distance`.
         */
        const options = { units: "miles" };

        layer.data.features.forEach((station) => {
          station.properties.distance = turf.distance(
            searchResult,
            station.geometry,
            options
          );
        });

        /**
         * Sort stores by distance from closest to the `searchResult`
         * to furthest.
         */
        layer.data.features.sort((a, b) => {
          if (a.properties.distance > b.properties.distance) {
            return 1;
          }
          if (a.properties.distance < b.properties.distance) {
            return -1;
          }
          return 0; // a must be equal to b
        });

        eventBus.$emit(
          "bikes-result",
          event.result.place_name,
          layer.data.features.slice(0, 10)
        );
      });
    });

    this.navigationControl = new MapboxDirections({
      accessToken: this.accessToken,
      unit: "metric",
      profile: "mapbox/cycling",
    });

    this.geocoderControl = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: true,
      placeholder: "77 Massachusetts Avenue",
    });

    // this.map.addControl(this.navigationControl, "top-right");
    this.map.addControl(this.geocoderControl, "top-left");

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

  methods: {

    formatDate(d) {
      return formatDate(d);
    },
    toPrecision(d) {
      return toPrecision(d);
    },
  },
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

/* .mapboxgl-control-container
{
  position: absolute;
  top: 64px;
  left: 24px;
  background-color: white;
} */

</style>
