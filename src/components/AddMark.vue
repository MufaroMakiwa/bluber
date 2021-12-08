<template>
  <div class="outer">
    <transition name="fade">
      <Search 
        mode="mark" 
        v-if="!addingMarkDetails">
        <template v-slot:heading> Where do you want to mark? </template>
        <template v-slot:content>
          <div class="search-results">
            <SearchSuggestionCard 
              v-for="result in results"
              v-bind:key="result.id"
              :text="result.text"
              :name="result.place_name"
              @click.native="navigateTo(result)"/>
          </div>
        </template>

        <template v-slot:submit>
          <v-btn
            depressed
            rounded
            :disabled="!canSubmit"
            color="primary"
            class="submit-button font-weight-bold"
            @click="handleSubmit">
            Continue
          </v-btn>
        </template>
      </Search>
    </transition>

    <CreateMarkDetails
      v-if="addingMarkDetails"
      :start="start"
      :end="end"
      @back="handleBack"
    />
  </div>
  
</template>

<script>
import Search from "./Search";
import CreateMarkDetails from "./CreateMarkDetails";
import SearchSuggestionCard from "./SearchSuggestionCard";
import { eventBus } from "../main";
import { toPrecision } from "../utils";
import axios from "axios";
import mapboxgl from "mapbox-gl";


export default {
  name: "AddMark",

  components: {
    Search,
    CreateMarkDetails,
    SearchSuggestionCard
  },

  data() {
    return {
      addingMarkDetails: false,
      results: [],
      type: "start",
      start: "",
      end: ""
    };
  },

  mounted() {
    eventBus.$on("searchResultMark", (results, type) => {
      this.type = type;
      this.results = results;
    });

    eventBus.$on("mark-created", () => {
      this.addingMarkDetails = false;
      this.results = [];
    });

    eventBus.$on("inputMark", (text) => {
      if (text.length === 0) {
        this.results = [];
      }
    });

    eventBus.$on("clearSuggestionsMark", () => {
      this.results = [];
    });

  },

  beforeDestroy() {
    // update the user object
    this.$store.dispatch('getUser');
    
    eventBus.$off("mark-created");
    eventBus.$off("inputMark");
    eventBus.$off("clearSuggestionsMark");
    eventBus.$off("searchResultMark");
    eventBus.$emit("clearAddMark");
  },

  computed: {
    markType() {
      return this.$store.getters.markType;
    },

    canSubmit() {
      const hasStart = this.$store.getters.startMarker.length > 0;
      const hasEnd = this.$store.getters.endMarker.length > 0;
      return this.markType === 'intersection' ? hasStart : hasStart && hasEnd;
    }
  },
  methods: {
    getCoordStart() {
      if (this.$store.getters.startMarker.length === 0) return "";
      return `lat: ${toPrecision(this.$store.getters.startMarker[0], 8)} -- 
              lng: ${toPrecision(this.$store.getters.startMarker[1], 8)}`
    },

    getCoordEnd() {
      if (this.$store.getters.endMarker.length === 0) return "";
      return `lat: ${toPrecision(this.$store.getters.endMarker[0], 8)} -- 
              lng: ${toPrecision(this.$store.getters.endMarker[1], 8)}`
    },

    handleBack() {
      this.addingMarkDetails = false;
      this.start = "";
      this.end = "";
      eventBus.$emit("disable-adding-marks", false);
    },

    async handleSubmit() {
      this.addingMarkDetails = true;
      const startLatLng = this.$store.getters.startMarker;
      const endLatLng = this.$store.getters.endMarker;

      if (startLatLng.length !== 0) {
        // get the name
        let startResponse = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${startLatLng[0]},${startLatLng[1]}.json?access_token=${mapboxgl.accessToken}`
        );
        try {
          this.start = startResponse.data.features[0].place_name;
        } catch {
          this.start = this.getCoordStart();
        }
      } 

      if (endLatLng.length !== 0) {
        let endResponse = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${endLatLng[0]},${endLatLng[1]}.json?access_token=${mapboxgl.accessToken}`
        );
        try {
          this.end = endResponse.data.features[0].place_name;
        } catch {
          this.end = this.getCoordEnd();
        }
      }

      eventBus.$emit("disable-adding-marks", true);
    },

    navigateTo(suggestion) {
      this.results = [];
      if (this.type === "start") {
        eventBus.$emit("setStartInput", suggestion.place_name);
        eventBus.$emit("navigateToStartMark", suggestion.center);
      } else {
        eventBus.$emit("navigateToEndMark", suggestion.center);
        eventBus.$emit("setEndInput", suggestion.place_name);
      }
    }
  }
};
</script>

<style scoped>
.outer {
  width: 100%;
  height: 100%;
}
</style>