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
// import 'leaflet-arrowheads';
// import L from "leaflet";
import axios from "axios";
import { latLng } from "leaflet";
import { eventBus } from "../main";
import { formatDate, toPrecision } from "../utils";

export default {
  name: "Map",
  components: {},

  data() {
    return {
      zoom: 13,
      map: null,
      center: latLng(42.373611, -71.110558),
      popup: undefined,
      popupContent: "",
      currentBikePopup: undefined,
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
      mapVectors: {},
      accessToken:
        "pk.eyJ1IjoiaGlsbHp5dGFwcyIsImEiOiJja2MxZ3dtankxNThpMnpsbXo1MG4zdHkzIn0.mxO9d6EI9Xcr6d9RmmR3Jg",
      planningVectors: [],
      navigationControl: null,
      geocoderControl: null,
      routesDisplayed: false,
      point1: [],
      point2: [],
      startMarker: [-71.110558, 42.373611],
      endMarker: [],
      planMarkers: {},
      routes: [],
    };
  },

  beforeMount() {},
  created() {},
  beforeDestroy() {
    eventBus.$off("mark-stations");
    eventBus.$off("fly-to");
  },

  computed: {
    mapStyle() {
      return this.$store.getters.mapStyle;
    }
  },

  watch: {
    mapStyle(val) {
      this.map.setStyle('mapbox://styles/mapbox/' + val);
    }
  },

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

    // add zoom controls
    this.map.addControl(new mapboxgl.NavigationControl(), 'bottom-left');

    // add current location button
    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
      })
    , 'bottom-left');

    this.map.on("click", (e) => {
      const coords = Object.keys(e.lngLat).map((key) => e.lngLat[key]);
      if (this.getMapState() === "planning") {
        if (!this.routesDisplayed) {
          if (
            this.routing_state.length === 0 ||
            this.routing_state.length === 2
          ) {
            if (this.routing_state.length === 2) {
              this.routing_state = [];
              this.point1 = [];
              this.point2 = [];
            }
            this.routing_state.push(coords);
            this.point1 = coords;
            this.$store.dispatch("setPoint1", coords);
            this.$store.dispatch("setPoint2", []);
            eventBus.$emit("setPoint1");

            if (this.map.getLayer("point2")) {
              this.map.removeLayer("point2");
              this.map.removeSource("point2");
            }
            eventBus.$emit("setEndInput","");
            const geojson = {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: this.point1,
                  },
                },
              ],
            };

            if (this.map.getLayer("point1")) {
              this.map.getSource("point1").setData(geojson);
            } else {
              this.map.addLayer({
                id: "point1",
                type: "circle",
                source: {
                  type: "geojson",
                  data: {
                    type: "FeatureCollection",
                    features: [
                      {
                        type: "Feature",
                        properties: {},
                        geometry: {
                          type: "Point",
                          coordinates: coords,
                        },
                      },
                    ],
                  },
                },
                paint: {
                  "circle-radius": 10,
                  "circle-color": "#F84C4C",
                },
              });
            }
          } else if (this.routing_state.length === 1) {
            this.routing_state.push(coords);
            this.point2 = coords;
            this.$store.dispatch("setPoint2", coords);
            eventBus.$emit("setPoint2");
            const geojson = {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: this.point2,
                  },
                },
              ],
            };

            if (this.map.getLayer("point2")) {
              this.map.getSource("point2").setData(geojson);
            } else {
              this.map.addLayer({
                id: "point2",
                type: "circle",
                source: {
                  type: "geojson",
                  data: {
                    type: "FeatureCollection",
                    features: [
                      {
                        type: "Feature",
                        properties: {},
                        geometry: {
                          type: "Point",
                          coordinates: coords,
                        },
                      },
                    ],
                  },
                },
                paint: {
                  "circle-radius": 10,
                  "circle-color": "#3887be",
                },
              });
            }
          }
        }
      } else {
        if (!this.isIntersectionState()) {
          this.$store.dispatch("setEndMarker", coords);
          eventBus.$emit("setEnd");
          const end = {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "Point",
                  coordinates: coords,
                },
              },
            ],
          };
          if (this.map.getLayer("end")) {
            this.map.getSource("end").setData(end);
          } else {
            this.map.addLayer({
              id: "end",
              type: "circle",
              source: {
                type: "geojson",
                data: {
                  type: "FeatureCollection",
                  features: [
                    {
                      type: "Feature",
                      properties: {},
                      geometry: {
                        type: "Point",
                        coordinates: coords,
                      },
                    },
                  ],
                },
              },
              paint: {
                "circle-radius": 10,
                "circle-color": "#3887be",
              },
            });
          }

          this.getRoute(coords);
        }
      }
    });

    eventBus.$on("drawRoutes", (obj) => {

        const marks = obj.marks;
        const centerOnRender = obj.centerOnRender;

        this.routes.forEach((routeId) => {
          if (this.map.getLayer(routeId)) {
            this.map.removeLayer(routeId);
          }

          if (this.map.getSource(routeId)) {
            this.map.removeSource(routeId);
          }

          if (this.map.getLayer("point-" + routeId)) {
            this.map.removeLayer("point-" + routeId);
          }

          if (this.map.getSource("point-" + routeId)) {
            this.map.removeSource("point-" + routeId);
          }
          if (this.map.getLayer("end-" + routeId)) {
            this.map.removeLayer("end-" + routeId);
          }

          if (this.map.getSource("end-" + routeId)) {
            this.map.removeSource("end-" + routeId);
          }

          if (this.planMarkers[routeId]) {
            this.planMarkers[routeId].remove();
          }
        });

        this.planMarkers = [];
        this.routes = [];



      this.routesDisplayed = true;
      const randomColor = (() => {
        "use strict";

        const randomInt = (min, max) => {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        return () => {
          var h = randomInt(0, 255);
          var s = randomInt(90, 100);
          var l = randomInt(40, 50);
          return `hsl(${h},${s}%,${l}%)`;
        };
      })();



      marks.forEach((mark) => {


        if (mark.path.length !== 0) {


          if (!this.map.getLayer(mark._id)){
            this.map.addLayer({
              id: mark._id,
              type: "line",
              source: {
                type: "geojson",
                data: {
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: "LineString",
                    coordinates: mark.path,
                  },
                },
              },
              layout: {
                "line-join": "round",
                "line-cap": "round",
              },
              paint: {
                "line-color": `${randomColor()}`,
                "line-width": 10,
              },
            });
            this.routes.push(mark._id);
        

          const geojsonStart = {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: mark.path[0],
                },
              },
            ],
          };

          if (this.map.getSource("point-" + mark._id)) {
            this.map.getSource("point-" + mark._id).setData(geojsonStart);
          } else {
            this.map.addSource("point-" + mark._id, {
              type: "geojson",
              data: geojsonStart,
            });
          }

          if (this.map.getLayer("point-" + mark._id)) {
            //
          } else {
            this.map.addLayer({
              id: "point-" + mark._id,
              type: "circle",
              source: "point-" + mark._id,
              paint: {
                "circle-radius": 10,
                "circle-color": "#F84C4C", // red color
                "circle-stroke-width": 3,
                "circle-stroke-color": "#ffffff",
              },
            });
          }
          const geojsonEnd = {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: mark.path[mark.path.length - 1],
                },
              },
            ],
          };

          if (this.map.getSource("end-" + mark._id)) {
            this.map.getSource("end-" + mark._id).setData(geojsonEnd);
          } else {
            this.map.addSource("end-" + mark._id, {
              type: "geojson",
              data: geojsonEnd,
            });
          }

          if (this.map.getLayer("end-" + mark._id)) {
            //
          } else {
            this.map.addLayer({
              id: "end-" + mark._id,
              type: "circle",
              source: "end-" + mark._id,
              paint: {
                "circle-radius": 10,
                "circle-color": "#3887be", // blue color
                "circle-stroke-width": 3,
                "circle-stroke-color": "#ffffff",
              },
            });
          }
        }
        } else {
     
          const marker = new mapboxgl.Marker()
            .setLngLat([mark.start.lng, mark.start.lat])
            .addTo(this.map);

          this.planMarkers[mark._id] = marker;
          this.routes.push(mark._id);

          this.map.addLayer({
            id: mark._id,
            type: "circle",
            source: {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: [
                  {
                    type: "Feature",
                    properties: {},
                    geometry: {
                      type: "Point",
                      coordinates: [mark.start.lng, mark.start.lat],
                    },
                  },
                ],
              },
            },
            paint: {
              "circle-radius": 8,
              "circle-color": `${randomColor()}`,
              "circle-stroke-width": 3,
              "circle-stroke-color": "#ffffff",
            },
          });
        }

        // center the camera if centerOnRender is true. This will only be true
        // when displaying one mark
        if (centerOnRender) {
          this.map.flyTo({
            center: [marks[0].start.lng, marks[0].start.lat],
            zoom: 14,
            essential: true, // this animation is considered essential with respect to prefers-reduced-motion
          });
        }

        this.map.on("mouseenter", mark._id, () => {
          this.map.getCanvas().style.cursor = "pointer";
        });
        this.map.on("mouseleave", mark._id, () => {
          this.map.getCanvas().style.cursor = "";
        });

        this.map.on("click", mark._id, (e) => {
          eventBus.$emit("openMarkDetails", mark);
          this.map.flyTo({
            center: [e.lngLat.lng, e.lngLat.lat],
            zoom: 16,
            essential: true, // this animation is considered essential with respect to prefers-reduced-motion
          });
        });
      });
    });

    eventBus.$on("draw-plan-radius", (center, radius) => {
      if (this.map.getLayer("circle-outline")) {
        this.map.removeLayer("circle-outline");
      }
      if (this.map.getSource("circle-outline")) {
        this.map.removeSource("circle-outline");
      }
      if (this.map.getLayer("circleData")) {
        this.map.removeLayer("circleData");
      }
      if (this.map.getSource("circleData")) {
        this.map.removeSource("circleData");
      }

      let center1 = turf.point([center.lng, center.lat]);

      let options = {
        steps: 80,
        units: "kilometers",
      };

      let circle = turf.circle(center1, radius, options);

      if (this.map.getSource("circleData")) {
        this.map.getSource("circleData").setData(circle);
      } else {
        this.map.addSource("circleData", {
          type: "geojson",
          data: circle,
        });
      }

  

      if (this.map.getLayer("circle-outline")){
        this.map.addSource("circleData", {
          type: "geojson",
          data: circle,
        });

      }else{
        this.map.addLayer({
          id: "circle-outline",
          type: "line",
          source: {
            type: "geojson",
            data: circle,
          },
          paint: {
            "line-color": "blue",
            "line-opacity": 0.5,
            "line-width": 10,
            "line-offset": 5,
          },
        });
      }


      //remove the start
      if (this.map.getLayer("point1")) {
        this.map.removeLayer("point1");
      }

      if (this.map.getSource("point1")) {
        this.map.removeSource("point1");
      }

      // remove the ends
      if (this.map.getLayer("point2")) {
        this.map.removeLayer("point2");
      }

      if (this.map.getSource("point2")) {
        this.map.removeSource("point2");
      }

      // this.routing_state = [];
      // this.point1 = [];
      // this.point2 = [];

      // this.$store.dispatch("setPoint1", []);
      // this.$store.dispatch("setPoint2", []);
    });
    /**
     * clear Locator listener
     */
    eventBus.$on("clearLocator", () => {
      //remove locator center
      if (this.map.getLayer("locator-center")) {
        this.map.removeLayer("locator-center");
      }

      if (this.map.getSource("locator-center")) {
        this.map.removeSource("locator-center");
      }

      //remove cluster layers
      if (this.map.getLayer("clusters")) {
        this.map.removeLayer("clusters");
      }
      //remove unclustered point layer
      if (this.map.getLayer("unclustered-point")) {
        this.map.removeLayer("unclustered-point");
      }

      // remove cluster count layer
      if (this.map.getLayer("cluster-count")) {
        this.map.removeLayer("cluster-count");
      }

      // if (this.map.getImage("bicycle")){
      this.map.removeImage("bicycle");
      // }
      // remove source place
      if (this.map.getSource("places")) {
        this.map.removeSource("places");
      }

      // remove the currentselected bluebikes popup
      if (this.currentBikePopup) {
        console.log("has pop up");
        this.currentBikePopup.remove();
      }
    });

    eventBus.$on("clearAddMark", () => {
      //remove the start
      if (this.map.getLayer("point")) {
        this.map.removeLayer("point");
      }

      if (this.map.getSource("point")) {
        this.map.removeSource("point");
      }

      // remove the ends
      if (this.map.getLayer("end")) {
        this.map.removeLayer("end");
      }

      if (this.map.getSource("end")) {
        this.map.removeSource("end");
      }

      this.startMarker = [-71.110558, 42.373611];
      this.$store.dispatch("setMarkType", "intersection");
      this.endMarker = [];
      this.$store.dispatch("setStartMarker", []);
      this.$store.dispatch("setEndMarker", []);

      //remove the route
      if (this.map.getLayer("route")) {
        this.map.removeLayer("route");
      }

      if (this.map.getSource("route")) {
        this.map.removeSource("route");
      }
    });

    eventBus.$on("clearPlan", () => {
      this.point1 = [];
      this.point2 = [];
      this.$store.dispatch("setPoint1", []);
      this.$store.dispatch("setPoint2", []);
      this.routing_state = [];

      //remove the start
      if (this.map.getLayer("point1")) {
        this.map.removeLayer("point1");
      }

      if (this.map.getSource("point1")) {
        this.map.removeSource("point1");
      }

      // remove the ends
      if (this.map.getLayer("point2")) {
        this.map.removeLayer("point2");
      }

      if (this.map.getSource("point2")) {
        this.map.removeSource("point2");
      }

      if (this.map.getLayer("circle-outline")) {
        this.map.removeLayer("circle-outline");
      }
      if (this.map.getSource("circle-outline")) {
        this.map.removeSource("circle-outline");
      }
      if (this.map.getLayer("circleData")) {
        this.map.removeLayer("circleData");
      }
      if (this.map.getSource("circleData")) {
        this.map.removeSource("circleData");
      }

      this.routesDisplayed = false;

      this.routes.forEach((routeId) => {
        if (this.map.getLayer(routeId)) {
          this.map.removeLayer(routeId);
        }

        if (this.map.getSource(routeId)) {
          this.map.removeSource(routeId);
        }

        if (this.map.getLayer("point-" + routeId)) {
          this.map.removeLayer("point-" + routeId);
        }

        if (this.map.getSource("point-" + routeId)) {
          this.map.removeSource("point-" + routeId);
        }
        if (this.map.getLayer("end-" + routeId)) {
          this.map.removeLayer("end-" + routeId);
        }

        if (this.map.getSource("end-" + routeId)) {
          this.map.removeSource("end-" + routeId);
        }

        if (this.planMarkers[routeId]) {
          this.planMarkers[routeId].remove();
        }
      });

      this.planMarkers = [];
      this.routes = [];
    });

    eventBus.$on("switch", () => {
      const geojsonStart = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: this.endMarker,
        },
      };

      const geojsonEnd = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: this.startMarker,
        },
      };

      // if the route already exists on the map, we'll reset it using setData
      if (this.map.getSource("point")) {
        this.map.getSource("point").setData(geojsonStart);
      }
      if (this.map.getSource("end")) {
        this.map.getSource("end").setData(geojsonEnd);
      }

      let temp = this.startMarker;
      this.startMarker = this.endMarker;
      this.endMarker = temp;
    });

    eventBus.$on("removeEnd", () => {
      if (this.map.getLayer("end")) {
        this.map.removeLayer("end");
      }

      if (this.map.getSource("end")) {
        this.map.removeSource("end");
      }

      if (this.map.getLayer("route")) {
        this.map.removeLayer("route");
        this.$store.dispatch("setRoute", []);
      }

      if (this.map.getSource("route")) {
        this.map.removeSource("route");
        this.$store.dispatch("setRoute", []);
      }
    });


    // this.listenForPlanningMarkers()
    // this.listenForMarkers()
    eventBus.$on("marking", this.listenForMarkers);
    // eventBus.$on("planning", this.listenForPlanningMarkers);

    eventBus.$on("fly-to", (coords) => {
      this.map.flyTo({
        center: coords,
        zoom: 20,
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
      });
    });

    eventBus.$on("fly-to-station", (coords) => {
      const geojson = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: coords,
            },
          },
        ],
      };

      if (this.map.getLayer("locator-center")) {
        this.map.getSource("locator-center").setData(geojson);
      } else {
        this.map.addLayer({
          id: "locator-center",
          type: "circle",
          source: {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: "Point",
                    coordinates: coords,
                  },
                },
              ],
            },
          },
          paint: {
            "circle-radius": 10,
            "circle-color": "#F84C4C",
          },
        });
      }
      this.map.flyTo({
        center: coords,
        zoom: 16,
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
        closeOnClick: false,
      });

      this.map.on("mouseenter", "unclustered-point", (e) => {
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
                ${formatDate(e.features[0].properties.lastReported)}</span
              >
              <div class="card-header">
                <span class="name">${e.features[0].properties.name}</span>
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

      this.map.on("mouseleave", "unclustered-point", () => {
        this.map.getCanvas().style.cursor = "";
        popUp.remove();
      });

      this.map.on("click", "unclustered-point", (e) => {
        this.map.flyTo({
          center: [e.lngLat.lng, e.lngLat.lat],
          zoom: 20,
          essential: true, // this animation is considered essential with respect to prefers-reduced-motion
        });

        const coordinates = e.features[0].geometry.coordinates.slice();

        // Ensure that if the map is zoomed out such that
        // multiple copies of the feature are visible, the
        // popup appears over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        if (this.currentBikePopup) {
          this.currentBikePopup = undefined;
        }

        this.currentBikePopup = new mapboxgl.Popup({
          closeButton: false,
        })
          .setLngLat(coordinates)
          .setHTML(
            `
            <div
              class="popup-locator-card"
            >
              <span class="popup-date">
                ${formatDate(e.features[0].properties.lastReported)}</span
              >
              <div class="card-header">
                <span class="name">${e.features[0].properties.name}</span>
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

      eventBus.$on("result", (suggestion) => {
        /* Get the coordinate of the search result */
        const searchResult = suggestion.geometry;

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
          suggestion.place_name,
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
    // this.map.addControl(this.geocoderControl, "top-left");

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
        this.listenForPlanningMarkers()
        // this.listenForMarkers()
    });
  },

  methods: {
    formatDate(d) {
      return formatDate(d);
    },
    toPrecision(d) {
      return toPrecision(d);
    },
    getTemplate() {
      return this.$store.getters.template;
    },

    getMapState() {
      return this.$store.getters.mapState;
    },

    getMarkType() {
      return this.$store.getters.markType;
    },

    isIntersectionState() {
      return this.getMarkType() === "intersection";
    },
    async getRouteStart(start) {
      this.startMarker = start;
      let end = this.endMarker;
      const query = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?steps=false&geometries=geojson&access_token=${mapboxgl.accessToken}`
      );

      const data = query.data.routes;
      if (data.length !== 0) {
        const route = data[0].geometry.coordinates;
        const geojson = {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: route,
          },
        };

        this.$store.dispatch("setRoute", route);
        // if the route already exists on the map, we'll reset it using setData
        if (this.map.getSource("route")) {
          this.map.getSource("route").setData(geojson);
        }
        // otherwise, we'll make a new request
        else {
          this.map.addLayer({
            id: "route",
            type: "line",
            source: {
              type: "geojson",
              data: geojson,
            },
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#3887be",
              "line-width": 5,
              "line-opacity": 0.75,
            },
          });
        }
      }
    },
    async getRoute(end) {
      let start = this.startMarker;
      this.endMarker = end;
      const query = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?steps=false&geometries=geojson&access_token=${mapboxgl.accessToken}`
      );

      const data = query.data.routes;

      if (data.length !== 0) {
        let route = data[0].geometry.coordinates;
        const geojson = {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: route,
          },
        };
        this.$store.dispatch("setRoute", route);
        // if the route already exists on the map, we'll reset it using setData
        if (this.map.getSource("route")) {
          this.map.getSource("route").setData(geojson);
        }
        // otherwise, we'll make a new request
        else {
          this.map.addLayer({
            id: "route",
            type: "line",
            source: {
              type: "geojson",
              data: geojson,
            },
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#3887be",
              "line-width": 5,
              "line-opacity": 0.75,
            },
          });
        }
      }
    },

    getPointFeatureRepresentation(coords) {
      const point = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Point",
              coordinates: coords,
            },
          },
        ],
      };
      return point;
    },

    initializeMarkingMap() {
      // move the map to center on start
      this.map.flyTo({
        center: this.startMarker,
        zoom: 16,
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
      });

      const canvas = this.map.getCanvasContainer();

      const geojson = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-71.110558, 42.373611],
            },
          },
        ],
      };

      if (this.map.getSource("point")) {
        this.map.getSource("point").setData(geojson);
      } else {
        this.map.addSource("point", {
          type: "geojson",
          data: geojson,
        });
      }

      if (this.map.getLayer("point")) {
        //
      } else {
        this.map.addLayer({
          id: "point",
          type: "circle",
          source: "point",
          paint: {
            "circle-radius": 10,
            "circle-color": "#F84C4C", // red color
          },
        });
      }

      this.$store.dispatch("setStartMarker", this.startMarker);
      eventBus.$emit("setStart");


      this.map.on("mouseenter", "point", () => {
        // this.map.setPaintProperty("point", "circle-color", "#3bb2d0");
        canvas.style.cursor = "move";
      });

      this.map.on("mouseleave", "point", () => {
        // this.map.setPaintProperty("point", "circle-color", "#F84C4C");
        canvas.style.cursor = "";
      });

      const onMove = (e) => {
        const coords = e.lngLat;

        // Set a UI indicator for dragging.
        canvas.style.cursor = "grabbing";

        // Update the Point feature in `geojson` coordinates
        // and call setData to the source layer `point` on it.
        geojson.features[0].geometry.coordinates = [coords.lng, coords.lat];
        this.startMarker = [coords.lng, coords.lat];
        this.map.getSource("point").setData(geojson);
      };

      const onUp = () => {
        // const coords = e.lngLat;

        // Print the coordinates of where the point had
        // finished being dragged to on the map.
        // coordinates.style.display = "block";
        // coordinates.innerHTML = `Longitude: ${coords.lng}<br />Latitude: ${coords.lat}`;
        canvas.style.cursor = "";
        // Unbind mouse/touch events
        this.map.off("mousemove", onMove);
        this.map.off("touchmove", onMove);
        if (!this.isIntersectionState()) {
          this.getRouteStart(this.startMarker);
        }
        this.$store.dispatch("setStartMarker", this.startMarker);
        eventBus.$emit("setStart");
      };

      this.map.on("mousedown", "point", (e) => {
        // Prevent the default map drag behavior.
        e.preventDefault();

        canvas.style.cursor = "grab";

        this.map.on("mousemove", onMove);
        this.map.once("mouseup", onUp);
      });

      this.map.on("touchstart", "point", (e) => {
        if (e.points.length !== 1) return;

        // Prevent the default map drag behavior.
        e.preventDefault();

        this.map.on("touchmove", onMove);
        this.map.once("touchend", onUp);
      });
    },

    listenForMarkers() {
      this.initializeMarkingMap();

      eventBus.$on("navigateToStartMark", (coords) => {

        this.startMarker = coords;
        this.$store.dispatch("setStartMarker", coords);
        const geojson = {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: coords,
              },
            },
          ],
        };

        if (this.map.getLayer("point")){
          this.map.removeLayer("point")
        }
        if (this.map.getSource("point")){
          this.map.removeSource("point")
        }

        if (this.map.getLayer("point")) {
          this.map.getSource("point").setData(geojson);
        } else {
          this.map.addLayer({
            id: "point",
            type: "circle",
            source: {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: [
                  {
                    type: "Feature",
                    properties: {},
                    geometry: {
                      type: "Point",
                      coordinates: coords,
                    },
                  },
                ],
              },
            },
            paint: {
              "circle-radius": 10,
              "circle-color": "#F84C4C",
            },
          });
        }

        this.map.flyTo({
          center: coords,
          zoom: 16,
          essential: true, // this animation is considered essential with respect to prefers-reduced-motion
        });
        if (!this.isIntersectionState()) {
          this.getRouteStart(coords);
        }

      });

      eventBus.$on("navigateToEndMark", (coords) => {
        this.$store.dispatch("setEndMarker", coords);
        // this.$store.dispatch('setMarkType', this.startMarker);
        // eventBus.$emit("setEnd");
        const end = {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: coords,
              },
            },
          ],
        };
        if (this.map.getLayer("end")) {
          this.map.getSource("end").setData(end);
        } else {
          this.map.addLayer({
            id: "end",
            type: "circle",
            source: {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: [
                  {
                    type: "Feature",
                    properties: {},
                    geometry: {
                      type: "Point",
                      coordinates: coords,
                    },
                  },
                ],
              },
            },
            paint: {
              "circle-radius": 10,
              "circle-color": "#3887be",
            },
          });
        }
        this.map.flyTo({
          center: coords,
          zoom: 14,
          essential: true, // this animation is considered essential with respect to prefers-reduced-motion
        });
        this.getRoute(coords);
      });
    },

    listenForPlanningMarkers() {
      eventBus.$on("navigateToStart", (coords) => {
        this.point1 = coords;
        this.$store.dispatch("setPoint1", coords);
        this.routing_state = [coords];
        const geojson = {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: coords,
              },
            },
          ],
        };
        if (this.map.getLayer("point1")) {
          this.map.getSource("point1").setData(geojson);
        } else {
          this.map.addLayer({
            id: "point1",
            type: "circle",
            source: {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: [
                  {
                    type: "Feature",
                    properties: {},
                    geometry: {
                      type: "Point",
                      coordinates: coords,
                    },
                  },
                ],
              },
            },
            paint: {
              "circle-radius": 10,
              "circle-color": "#F84C4C",
            },
          });
        }

        this.map.flyTo({
          center: coords,
          zoom: 16,
          essential: true, // this animation is considered essential with respect to prefers-reduced-motion
        });
      });

      eventBus.$on("navigateToEnd", (coords) => {
        this.$store.dispatch("setPoint2", coords);
        this.endMarker = coords;
        this.routing_state.push(coords);
        const end = {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: coords,
              },
            },
          ],
        };
        if (this.map.getLayer("end")) {
          this.map.getSource("end").setData(end);
        } else {
          this.map.addLayer({
            id: "point2",
            type: "circle",
            source: {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: [
                  {
                    type: "Feature",
                    properties: {},
                    geometry: {
                      type: "Point",
                      coordinates: coords,
                    },
                  },
                ],
              },
            },
            paint: {
              "circle-radius": 10,
              "circle-color": "#3887be",
            },
          });
        }
        this.map.flyTo({
          center: coords,
          zoom: 14,
          essential: true, // this animation is considered essential with respect to prefers-reduced-motion
        });
      });
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
