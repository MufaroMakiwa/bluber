<template>
  <div class="result-list">
    <div class="result-header">
      <span class="title"> 10 Closest Bike Locations to </span>
      <div class="search-input">
        <SearchInputField
          placeholder="e.g 77 Massachusetts Avenue"
          type="locator"
          :value="value"
          label="Search location..."
        />
      </div>
    </div>
    
    <div class="search-results">
      <SearchSuggestionCard 
        v-for="result in results"
        v-bind:key="result.id"
        :text="result.text"
        :name="result.place_name"
        class="padded-result"
        @click.native="navigateTo(result)"/>
    </div>
    
    <div class="result-container">
      <div
        v-bind:key="station.properties.featureId"
        v-for="(station, index) in stations"
        :class="[station.properties.className, 'card']"
        @click="goToStation(index, station.geometry.coordinates)"
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
import axios from "axios";
import SearchInputField from "./SearchInputField.vue";
import SearchSuggestionCard from "./SearchSuggestionCard.vue";


export default {
  name: "Locator",
  props: [],
  components: { 
    SearchInputField,
    SearchSuggestionCard 
  },
  data() {
    return {
      stations: [],
      location: "",
      className: "locator-card",
      highlightedCard: 0,
      results: [],
      value: "",
    };
  },

  beforeCreate() {
    eventBus.$on("bikes-result", (placeName, stations) => {
      this.location = placeName;
      this.stations = stations.map((station) => {
        station.properties.className = "locator-card";
        return station;
      });
    });

    eventBus.$on("input", async (text, type) => {
      await this.handleSuggestion(text, type);
    });
  },

  beforeDestroy() {
    // update the user object
    this.$store.dispatch('getUser');
    
    eventBus.$off("bikes-result");
    eventBus.$emit("clearLocator");
  },

  methods: {
    formatDate(d) {
      return formatDate(d);
    },

    toPrecision(d) {
      return toPrecision(d);
    },

    goToStation(index, coords) {
      this.stations[this.highlightedCard].properties.className = "locator-card";
      this.highlightedCard = index;
      this.stations[this.highlightedCard].properties.className =
        "locator-card click";
      eventBus.$emit("fly-to", coords);
      this.stations = this.stations;
    },

    async handleSuggestion(text, type) {
      if (type === "locator" && text.length !== 0) {
        let bbox = this.$store.getters.bbox;
        try {
          const query = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?bbox=${bbox[0]},${bbox[1]},${bbox[2]},${bbox[3]}&access_token=pk.eyJ1IjoiaGlsbHp5dGFwcyIsImEiOiJja2MxZ3dtankxNThpMnpsbXo1MG4zdHkzIn0.mxO9d6EI9Xcr6d9RmmR3Jg`
          );
          this.results = query.data.features;
          this.stations = [];
        } catch (error) {
          this.results = [];
          
        }
      } else {
        this.results = [];
        this.stations = [];
      }
    },
    navigateTo(suggestion) {
      eventBus.$emit("fly-to-station", suggestion.center);
      this.value = suggestion.place_name;
      eventBus.$emit("result", suggestion);
      this.results = [];
    },
  },
};
</script>

<style scoped>
.search-input {
  margin-top: 2rem;
}

.title {
  color: #1ba9bf;
}

.result-list {
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  width: 100%;
}

.result-container {
  width: 100%;
  padding: 1.5rem;
}

.search-results {
  padding: 0 1.5rem;
  margin: 0;
  width: 100%;
}

.padded-result:first-of-type {
  margin-top: 1.5rem;
}

.padded-result:last-of-type {
  margin-bottom: 1.5rem;
}

.result-header {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  position: sticky;
  top: 0px;
  background-color: white;
  z-index: 10;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
}

.location-name {
  color: #1da1f2;
  font-weight: bold;
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

.locator-card {
  display: flex;
  padding: 1rem;
  flex-direction: column;
  width: 450px;
  cursor: pointer;
  position: relative;
  border-radius: 8px;
  margin-top: 1rem;
}

.locator-card:first-of-type {
  margin-top: 0;
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

/* 
 * 
 * Class switch
 */

.click {
  background-color: #74adb6;
  color: #fff;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}

.click .name {
  color: #ffea00;
}

.click .milage {
  color: #fff;
}

.click .date {
  color: #fff;
}
</style>