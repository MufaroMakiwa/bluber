<template>
  <div class="result-list">
    <div class="result-header">
      <span class="title">10 closest bikestations to </span>
      <span class="location-name">{{ location }}</span>
    </div>
    <div class="result-container">
      <div
        v-bind:key="station.properties.featureId"
        v-for="(station, index) in stations"
        :class="station.properties.className"
        @click="goToStation(index,station.geometry.coordinates)"
      >
        <span class="milage"
          >{{ toPrecision(station.properties.distance) }} mil</span
        >
        <span class="date">
          {{ formatDate(station.properties.lastReported) }}</span
        >
        <div class="card-header">
          <span class="name">{{ station.properties.name }}</span>
        </div>
        <div class="card-body">
          <div class="bikes">
            <span class="bikes-num">{{
              station.properties.numBikesAvailable
            }}</span>
            <span class="bikes-text">Bikes</span>
          </div>
          <div class="docks">
            <span class="docks-num">{{
              station.properties.numDocksAvailable
            }}</span>
            <span class="docks-text">Docks</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../main";
import { formatDate, toPrecision } from "../utils";

export default {
  name: "Locator",
  props: [],
  data() {
    return {
      stations: [],
      location: "",
      className: "locator-card",
      highlightedCard: 0,
    };
  },

  beforeCreate() {
    eventBus.$on("bikes-result", (placeName, stations) => {
      this.location = placeName;
      this.stations = stations.map(station=>{ station.properties.className="locator-card";return station});
    });
  },
  beforeDestroy() {},
  methods: {
    formatDate(d) {
      return formatDate(d);
    },
    toPrecision(d) {
      return toPrecision(d);
    },

    goToStation(index,coords) {
      this.stations[this.highlightedCard].properties.className = "locator-card";
      this.highlightedCard = index;
      this.stations[this.highlightedCard].properties.className = "locator-card click";
      eventBus.$emit("fly-to", coords);
      this.stations = this.stations;
    },
  },
};
</script>

<style scoped>
.result-list {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 16px;
  text-align: center;
}

.result-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  position: sticky;
  top: 0px;
  left: 12px;
  background-color: white;
  z-index: 999;
  width: 100%;
  padding: 12px;
}

.location-name {
  color: #1da1f2;
  font-weight: 700;
  font-size: 12px;
}

.get-data {
  background-color: #2185d0;
  color: white;
  border: none;
  outline: none;
  position: absolute;
  top: 24px;
  right: 32px;
  font-size: 20px;
  font-weight: bold;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
}

.name {
  color: #1ba9bf;
  font-weight: 700;
  font-size: 14px;
}

.locator-card {
  display: flex;
  padding: 16px;
  flex-direction: column;
  width: 450px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
    rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  cursor: pointer;
  position: relative;
  margin: 16px;
}

.card-body {
  display: flex;
  justify-content: center;
  padding-top: 16px;
}

.docks {
  border-left: 1px solid #d2d2d2;
  display: flex;
  flex-direction: column;
  padding: 0 8px;
  align-items: center;
}

.docks-num {
  font-size: 20px;
  font-weight: bold;
}

.bikes-num {
  font-size: 20px;
  font-weight: bold;
}

.bikes {
  display: flex;
  flex-direction: column;
  padding: 0 8px;
  align-items: center;
}

.card-footer {
  padding-top: 6px;
}
.card-header {
  margin-top: 12px;
}
.milage {
  font-size: 12px;
  position: absolute;
  top: 8px;
  left: 8px;
  font-weight: bold;
  color: #808080;
}

.date {
  font-size: 12px;
  position: absolute;
  top: 8px;
  right: 8px;
  font-weight: bold;
  color: #808080;
}

.locator-card:hover {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}


/* 
 * 
 * Class switch
 */

 .click
 {
    background-color: #74adb6;
    color: #fff;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
 }

/* .click .result-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  position: sticky;
  top: 0px;
  left: 12px;
  background-color: #1ba9bf;
  z-index: 999;
  width: 100%;
  padding: 12px;
}  */

/* .click .location-name {
  color: white;
  font-weight: 700;
  font-size: 12px;
} */



.click .name {
  color: #ffea00;
  font-weight: 700;
  font-size: 16px;
}




.click .milage {
  color: #fff;
}

.click .date {

  color: #fff;
}

</style>