<template>
  <div class="outer">
    <transition name="fade">
      <Search mode="mark" v-if="!addingMarkDetails">
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

export default {
  name: "AddMark",

  beforeCreate() {
    eventBus.$on("searchResult", (results, type) => {
      this.type = type;
      this.results = results;
    });

    eventBus.$on("mark-created", () => {
      console.log("mark created");
      this.addingMarkDetails = false;
      this.results = [];
    });
    eventBus.$on("input", (text) => {
      if (text.length === 0) {
        this.results = [];
      }
    });

    eventBus.$on("clearSuggestions", () => {
      this.results = [];
    });
  },
  beforeDestroy() {
    eventBus.$off("mark-created");
    eventBus.$off("input");
    eventBus.$off("clearSuggestions");
    eventBus.$off("searchResult");
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
    };
  },

  computed: {
    start: function () {
      if (this.$store.getters.startMarker.length === 0) return "";
      return (
        this.$store.getters.startMarker[0] +
        ", " +
        this.$store.getters.startMarker[1]
      );
    },
    end: function () {
      if (this.$store.getters.endMarker.length === 0) return "";
      return (
        this.$store.getters.endMarker[0] +
        ", " +
        this.$store.getters.endMarker[1]
      );
    },
  },
  methods: {
    handleSubmit() {
      this.addingMarkDetails = true;
    },

    navigateTo(suggestion) {
      // console.log("this is my suggestion",suggestion)
      if (this.type === "start") {
        // console.log("navigating", suggestion.center, this.type);
        eventBus.$emit("navigateToStart", suggestion.center);
      } else {
        eventBus.$emit("navigateToEnd", suggestion.center);
      }
    },
  },

  // watch:{

  //   addingMarkDetails: function(val){
  //     this.addingMarkDetails = val;
  //   }
  // }
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
  padding: 8px;
  margin: 8px 0;
  width: 100%;
  cursor: pointer;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
    rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  border-radius: 3px;
}
.result-item:hover {
  background-color: #74adb6;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  transform: scale(1.01);
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