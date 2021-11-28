if (this.mapState === "marking") {

    console.log("always clicking")
    const coords = Object.keys(e.lngLat).map((key) => e.lngLat[key]);
    const point = this.getPointFeatureRepresentation(coords);

    if (
      this.routing_state.length == 0 ||
      this.routing_state.length == 2
    ) {

      if (this.routing_state.length == 2) {
        this.routing_state = [];
        // this.popup = undefined;
        // this.secondPopup = undefined;
        // this.circleMarker = {};
      }

      this.routing_state.push(coords);

      if (this.map.getLayer("start")) {
        this.map.getSource("start").setData(point);
      } else {
        this.map.addLayer({
          id: "start",
          type: "circle",
          source: {
            type: "geojson",
            data: point,
          },
          paint: {
            "circle-radius": 10,
            "circle-color": "#3887be",
          },
        });
      }

      const canvas = this.map.getCanvasContainer();

      // When the cursor enters a feature in
      // the point layer, prepare for dragging.
      this.map.on("mouseenter", "start", () => {
        this.map.setPaintProperty("start", "circle-color", "#3bb2d0");
        canvas.style.cursor = "move";
      });

      this.map.on("mouseleave", "point", () => {
        this.map.setPaintProperty("start", "circle-color", "#3887be");
        canvas.style.cursor = "";
      });

      this.map.on("mousedown", "start", (e) => {
        // Prevent the default map drag behavior.
        e.preventDefault();

        canvas.style.cursor = "grab";

        this.map.on("mousemove", (e) => this.onMove(e, point, canvas));
        this.map.once("mouseup", () => this.onUp(canvas, point));
      });

      this.map.on("touchstart", "start", (e) => {
        if (e.points.length !== 1) return;

        // Prevent the default map drag behavior.
        e.preventDefault();

        this.map.on("touchmove", (e) => this.onMove(e, point, canvas));
        this.map.once("touchend", () => this.onUp(canvas, point));
      });

      // this.popup = e.latlng;
    } else if (
      this.routing_state.length == 1 &&
      !this.isIntersectionState()
    ) {
      this.routing_state.push(coords);
      if (this.map.getLayer("end")) {
        this.map.getSource("end").setData(point);
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
            "circle-color": "#f30",
          },
        });
      }
      // this.secondPopup = e.latlng;
      // this.secondPopupContent = "Finding route";
      // let area_x =
      //   (this.routing_state[0][0] + this.routing_state[1][0]) / 2;
      // let area_y =
      //   (this.routing_state[0][1] + this.routing_state[1][1]) / 2;
      // let distance = this.getDistance(
      //   this.routing_state[0],
      //   this.routing_state[1]
      // );
      // this.circleMarker = {
      //   center: [area_x, area_y],
      //   radius: distance,
      //   color: "blue",
      // };
      // this.getPath();
    } else if (
      this.routing_state.length === 1 &&
      this.isIntersectionState()
    ) {
      // change to another location
        this.routing_state = coords;
        // console.log("always logging");

        const canvas = this.map.getCanvasContainer();

        // When the cursor enters a feature in
        // the point layer, prepare for dragging.
        this.map.on("mouseenter", "start", () => {
          this.map.setPaintProperty("start", "circle-color", "#3bb2d0");
          canvas.style.cursor = "move";
        });

        this.map.on("mouseleave", "point", () => {
          this.map.setPaintProperty("start", "circle-color", "#3887be");
          canvas.style.cursor = "";
        });

        this.map.on("mousedown", "start", (e) => {
          // Prevent the default map drag behavior.
          e.preventDefault();

          canvas.style.cursor = "grab";

          this.map.on("mousemove", (e) => this.onMove(e, point, canvas));
          this.map.once("mouseup", () => this.onUp(canvas, point));
        });

        this.map.on("touchstart", "start", (e) => {
          if (e.points.length !== 1) return;

          // Prevent the default map drag behavior.
          e.preventDefault();

          this.map.on("touchmove", (e) => this.onMove(e, point, canvas));
          this.map.once("touchend", () => this.onUp(canvas, point));
        });
      // this.popup = e.latlng;
    }
  } 
  
  
  else {
    if (
      this.routing_state.length == 0 ||
      this.routing_state.length == 2
    ) {
      if (this.routing_state.length == 2) {
        this.routing_state = [];
        // this.popup = undefined;
        // this.secondPopup = undefined;
        // this.circleMarker = {};
      }
      this.routing_state.push([e.latlng.lat, e.latlng.lng]);
      // this.popup = e.latlng;
    } else if (this.routing_state.length == 1) {
      this.routing_state.push([e.latlng.lat, e.latlng.lng]);
      // this.secondPopup = e.latlng;
      // this.getMarks();
    }
  }



const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [0, 0],
        },
      },
    ],
};

  // let point = this.getPointFeatureRepresentation([-71.110558, 42.373611]);

  this.map.addSource("start", {
    type: "geojson",
    data: geojson ,
  });

  this.map.addLayer({
    id: "start",
    type: "circle",
    source: "start",
    paint: {
      "circle-radius": 10,
      "circle-color": "#F84C4C", // red color
    },
  });

  const canvas = this.map.getCanvasContainer();

  // When the cursor enters a feature in
  // the point layer, prepare for dragging.
  this.map.on("mouseenter", "start", () => {
    this.map.setPaintProperty("start", "circle-color", "#3bb2d0");
    canvas.style.cursor = "move";
  });

  this.map.on("mouseleave", "point", () => {
    this.map.setPaintProperty("start", "circle-color", "#3887be");
    canvas.style.cursor = "";
  });

  this.map.on("mousedown", "start", (e) => {
    // Prevent the default map drag behavior.
    e.preventDefault();

    canvas.style.cursor = "grab";

    this.map.on("mousemove", (event) => {
      const coordinates = event.lngLat;

      // Set a UI indicator for dragging.
      canvas.style.cursor = "grabbing";

      // Update the Point feature in `geojson` coordinates
      // and call setData to the source layer `point` on it.
      geojson.features[0].geometry.coordinates = [
        coordinates.lng,
        coordinates.lat,
      ];
      this.map.getSource("start").setData(geojson);
    });

    this.map.once("mouseup", (event) => {
      const coordinates = event.lngLat;

      // Set a UI indicator for dragging.
      canvas.style.cursor = "grabbing";

      // Update the Point feature in `geojson` coordinates
      // and call setData to the source layer `point` on it.
      geojson.features[0].geometry.coordinates = [
        coordinates.lng,
        coordinates.lat,
      ];
      this.map.getSource("start").setData(geojson);
    });
  });

  this.map.on("touchstart", "start", (e) => {
    if (e.points.length !== 1) return;

    // Prevent the default map drag behavior.
    e.preventDefault();

    this.map.on("touchmove", (event) => {
      const coordinates = event.lngLat;

      // Set a UI indicator for dragging.
      canvas.style.cursor = "grabbing";

      // Update the Point feature in `geojson` coordinates
      // and call setData to the source layer `point` on it.
      geojson.features[0].geometry.coordinates = [
        coordinates.lng,
        coordinates.lat,
      ];
      this.map.getSource("start").setData(geojson);
    });

    this.map.once("touchend", () => {
      canvas.style.cursor = "";

      // Unbind mouse/touch events
      this.map.off("mousemove", (event) => {
        const coordinates = event.lngLat;

        // Set a UI indicator for dragging.
        canvas.style.cursor = "grabbing";

        // Update the Point feature in `geojson` coordinates
        // and call setData to the source layer `point` on it.
        geojson.features[0].geometry.coordinates = [
          coordinates.lng,
          coordinates.lat,
        ];
        this.map.getSource("start").setData(geojson);
      });

      this.map.off("touchmove", (event) => {
        const coordinates = event.lngLat;

        // Set a UI indicator for dragging.
        canvas.style.cursor = "grabbing";

        // Update the Point feature in `geojson` coordinates
        // and call setData to the source layer `point` on it.
        geojson.features[0].geometry.coordinates = [
          coordinates.lng,
          coordinates.lat,
        ];
        this.map.getSource("start").setData(geojson);
      });
    });
  });


  this.map.addSource("route-point", {
    type: "geojson",
    data: point,
  });

  this.map.addLayer({
    id: "route-point",
    source: "route-point",
    type: "symbol",
    layout: {
      // This icon is a part of the Mapbox Streets style.
      // To view all images available in a Mapbox style, open
      // the style in Mapbox Studio and click the "Images" tab.
      // To add a new image to the style at runtime see
      // https://docs.mapbox.com/mapbox-gl-js/example/add-image/
      "icon-image": "bicycle-15",
      "icon-rotate": ["get", "bearing"],
      "icon-rotation-alignment": "map",
      "icon-allow-overlap": true,
      "icon-ignore-placement": true,
    },
  });
  // Calculate the distance in kilometers between route start/end point.

  // console.log("this is my route",route,data[0])
  // const lineDistance = parseInt(data[0].distance);

  const arc = [];

  // Number of steps to use in the arc and animation, more steps means
  // a smoother arc and animation, but too many steps will result in a
  // low frame rate
  const steps = 100;

  // console.log("line distance",lineDistance)
  const lineDistance = turf.length({
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: [this.startMarker, this.endMarker],
    },
  });
  // Draw an arc between the `origin` & `destination` of the two points
  for (let i = 0; i < lineDistance; i += lineDistance / steps) {
    const segment = turf.along(
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [this.startMarker, this.endMarker],
        },
      },
      i
    );
    arc.push(segment.geometry.coordinates);
  }

  console.log("this is my arc", arc);

  // Update the route with calculated arc coordinates
  route = arc;

  // Used to increment the value of the point measurement against the route.
  let counter = 0;

  const animate = () => {
    console.log("animating");
    const start = route[counter >= steps ? counter - 1 : counter];
    const end = route[counter >= steps ? counter : counter + 1];
    if (!start || !end) return;

    // Update point geometry to a new position based on counter denoting
    // the index to access the arc
    point.features[0].geometry.coordinates = route[counter];

    // Calculate the bearing to ensure the icon is rotated to match the route arc
    // The bearing is calculated between the current point and the next point, except
    // at the end of the arc, which uses the previous point and the current point
    point.features[0].properties.bearing = turf.bearing(
      turf.point(start),
      turf.point(end)
    );

    // Update the source with this new data
    this.map.getSource("route-point").setData(point);

    // Request the next frame of animation as long as the end has not been reached
    if (counter < steps) {
      requestAnimationFrame(animate);
    }

    counter = counter + 1;
  };

  animate(counter);

  const point = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: this.startMarker,
        },
      },
    ],
  };