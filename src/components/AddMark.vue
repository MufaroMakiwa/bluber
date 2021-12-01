<template>
  <div class="outer">
    <transition name="fade">
      <Search mode="mark" v-if="!addingMarkDetails" @search-type="updateSearchType">
        <template v-slot:heading> Where do you want to mark? </template>
        <template v-slot:content>
          <div class="search-results">
            <div
              v-for="result in results"
              v-bind:key="result.id"
              class="result-item"
              v-on:click="navigateTo(result)"
            >
              <span class="place-text">{{ result.text }}</span>
              <span class="place-name">{{ result.place_name }}</span>
            </div>
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
      @back="addingMarkDetails = false"
    />
  </div>
</template>

<script>
import Search from "./Search";
import CreateMarkDetails from "./CreateMarkDetails";
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
      this.$store.dispatch('setMapState', 'marking');
      eventBus.$emit("marking");
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
    eventBus.$off("mark-created");
    eventBus.$off("inputMark");
    eventBus.$off("clearSuggestionsMark");
    eventBus.$off("searchResultMark");
    eventBus.$emit("clearAddMark");
  },
  components: {
    Search,
    CreateMarkDetails,
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
    handleSubmit() {
      this.addingMarkDetails = true;
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

.search-results {
  width: 100%;
  margin-top: 16px;
}

.result-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.5rem;
  margin-top: 1rem;
  width: 100%;
  cursor: pointer;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
    rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  border-radius: 3px;
  transition: all 0.3s;
}

.result-item:first-of-type {
  margin-top: 0;
}

.result-item:hover .place-text {
  color: #ffea00;
}
.result-item:hover .place-name {
  color: #fff;
}

.place-text {
  color: #74adb6;
  font-weight: bold;
  font-size: 18px;
}

.place-name {
  font-weight: bold;
  font-size: 14px;
}
</style>