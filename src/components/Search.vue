<template>
  <div class="search-container">
    <div class="search-inner">
      <span class="search-greeting"> Hello, Mufaro </span>

      <h2 class="search-heading">
        <slot name="heading"></slot>
      </h2>

      <div class="input-container start">
        <SearchInputField
          v-model="start"
          :label="startLabel"
          :placeholder="placeholder"
          :type="startInput"
        />

        <v-btn
          :disabled="mode === 'plan'"
          icon
          color="primary"
          class="side-icon"
          @click="setSearchType"
        >
          <font-awesome-icon
            :icon="searchType === 'path' ? 'minus' : 'plus'"
            class="button-icon"
          />
        </v-btn>
      </div>
      <div class="input-container end" v-if="displayEndPointInput">
        <SearchInputField
          v-model="end"
          :label="endLabel"
          :placeholder="placeholder"
          :type="endInput"
        />

        <v-btn
          icon
          :disabled="isSwitchButtonDisabled"
          color="primary"
          class="side-icon fa-rotate-90"
          @click="switchStartEnd"
        >
          <font-awesome-icon icon="exchange-alt" class="button-icon" />
        </v-btn>
      </div>
      <div class="suggestions-container">
        <slot name="content"></slot>
      </div>
    </div>

    <div class="submit-container">
      <slot name="submit"></slot>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../main";
import { toPrecision } from "../utils";
import axios from "axios";

import SearchInputField from "./SearchInputField.vue";

export default {
  name: "Search",

  components: {
    SearchInputField,
  },

  props: {
    mode: String,
  },

  beforeCreate() {
    eventBus.$on("setStart", () => {
      this.start =
        this.$store.getters.startMarker[0] +
        ", " +
        this.$store.getters.startMarker[1];
    });

    eventBus.$on("setEnd", () => {
      this.end =
        this.$store.getters.endMarker[0] +
        ", " +
        this.$store.getters.endMarker[1];
    });

    eventBus.$on("setPoint1", () => {
      this.start =
        this.$store.getters.point1[0] +
        ", " +
        this.$store.getters.point1[1];
    });

    eventBus.$on("setPoint2", () => {
      this.end =
        this.$store.getters.point2[0] +
        ", " +
        this.$store.getters.point2[1];
    });

    eventBus.$on("input", (text, type) => {
      this.handleSuggestion(text, type);
    });
  },
  computed: {
    startLabel() {
      let directive;

      if (this.mode === "plan") {
        directive = "start";
      } else {
        directive =
          this.searchType === "intersection" ? "intersection" : "start";
      }
      return `Enter ${directive} point, or click on the map`;
    },

    endLabel() {
      return "Enter end point...";
    },

    displayEndPointInput() {
      if (this.mode === "plan") {
        return true;
      } else {
        return this.searchType === "path";
      }
    },

    isSwitchButtonDisabled() {
      return this.start.trim() === "" && this.end.trim() === "";
    },
  },

  data() {
    return {
      placeholder: "e.g 189 Vassar Street",
      start: "",
      end: "",
      startInput: "start",
      endInput: "end",
      searchType: "intersection",
    };
  },

  methods: {
    setSearchType() {
      let prevType = this.searchType;
      this.searchType === "intersection"
        ? (this.searchType = "path")
        : (this.searchType = "intersection");
      this.$store.dispatch("setMarkType", this.searchType);
      if (this.searchType === "intersection" && prevType === "path") {
        eventBus.$emit("removeEnd");
        this.end = "";
      }
    },

    switchStartEnd() {
      //store temp
      const previousStart = this.start;
      let storeTemp = this.$store.getters.startMarker;

      //first swap
      this.start = this.end;
      this.$store.dispatch("setStartMarker", this.$store.getters.endMarker);

      //final swa[]
      this.end = previousStart;
      this.$store.dispatch("setEndMarker", storeTemp);

      eventBus.$emit("switch");
    },

    async handleSuggestion(text, type) {
      if (text.length !== 0) {
        let bbox = this.$store.getters.bbox;
        try {
          const query = await axios.get(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?bbox=${bbox[0]},${bbox[1]},${bbox[2]},${bbox[3]}&access_token=pk.eyJ1IjoiaGlsbHp5dGFwcyIsImEiOiJja2MxZ3dtankxNThpMnpsbXo1MG4zdHkzIn0.mxO9d6EI9Xcr6d9RmmR3Jg`
          );
            eventBus.$emit("searchResult", query.data.features, type);
        } catch (error) {
          eventBus.$emit("searchResult", [], type);
        }       
      } else {
        eventBus.$emit("searchResult", [], type);
      }
    },
    toPrecision(x) {
      return toPrecision(x);
    },
  },
};
</script>

<style scoped>
.search-container {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  position: relative;
}

.submit-container {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 1rem;
  height: 80px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
}

.submit-button {
  width: 100%;
  height: 100% !important;
}

.search-inner {
  width: 100%;
  flex-grow: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: scroll;
  margin-bottom: 80px;
}

.search-greeting {
  width: 100%;
}

.search-heading {
  margin: 1rem 0;
}

.input-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.input-container.end {
  margin-top: 1rem;
}

.side-icon {
  margin-left: 1rem;
}

.button-icon {
  font-size: 1.1rem;
}

.suggestions {
  display: flex;
  flex-direction: column;
}
</style>