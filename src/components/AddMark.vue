<template>
  <div class="outer">
    <transition name="fade">
      <Search 
        mode="mark" 
        v-if="!addingMarkDetails" 
        :searchType="searchType"
        @search-type="updateSearchType">
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
            @click="handleSubmit"
          >
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

export default {
  name: "AddMark",

  beforeMount() {
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
      searchType: "intersection"
    };
  },

  computed: {
    start: function () {
      if (this.$store.getters.startMarker.length === 0) return "";
      return `lat: ${toPrecision(this.$store.getters.startMarker[0], 8)} -- 
              lng: ${toPrecision(this.$store.getters.startMarker[1], 8)}`
    },

    end: function () {
      if (this.$store.getters.endMarker.length === 0) return "";
      return `lat: ${toPrecision(this.$store.getters.endMarker[0], 8)} -- 
              lng: ${toPrecision(this.$store.getters.endMarker[1], 8)}`
    },

    canSubmit() {
      const hasStart = this.$store.getters.startMarker.length > 0;
      const hasEnd = this.$store.getters.endMarker.length > 0;
      return this.searchType === 'intersection' ? hasStart : hasStart && hasEnd;
    }
  },
  methods: {
    handleBack() {
      this.addingMarkDetails = false;
      eventBus.$emit("disable-adding-marks", false);
    },

    handleSubmit() {
      this.addingMarkDetails = true;
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
    },

    updateSearchType(type) {
      this.searchType = type;
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