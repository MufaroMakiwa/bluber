<template>
  <div class="outer">
    <transition name="fade">
      <Search mode="plan" v-if="!displayPlan">
        <template v-slot:heading> Where are you going? </template>
        <template v-slot:content>
          <div class="search-results">
            <SearchSuggestionCard 
              v-for="result in results"
              v-bind:key="result.id"
              :text="result.text"
              :name="result.place_name"/>
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
            Plan Trip
          </v-btn>
        </template>
      </Search>
    </transition>

    <MarksList
      title="Marks in area"
      :marks="marks"
      @back="hidePlan"
      v-if="displayPlan"
      :requiresBackButton="true"
      :center="center"
    />
  </div>
</template>

<script>
import Search from "./Search.vue";
import MarksList from "./MarksList.vue";
import { eventBus } from "../main";
import SearchSuggestionCard from "./SearchSuggestionCard.vue";
import axios from "axios";

export default {
  name: "PlanTrip",

  components: {
    Search,
    MarksList,
    SearchSuggestionCard
  },

  computed: {
    canSubmit() {
      return this.$store.getters.point1.length > 0 && this.$store.getters.point2.length > 0;
    }
  },

  data() {
    return {
      displayPlan: false,
      type: "start",
      results: [],
      marks: [],
      center: undefined
    };
  },

  mounted() {
    eventBus.$on("searchResultPlan", (results, type) => {
      this.type = type;
      this.results = results;
    });

    eventBus.$on("input", (text) => {
      if (text.length === 0) {
        this.results = [];
      }
    });

    eventBus.$on("refresh", () => this.handleSubmit(false));
  },

  beforeDestroy() {
    // update the user object
    this.$store.dispatch('getUser');
    
    eventBus.$off("searchResultPlan");
    eventBus.$off("inputPlan");
    eventBus.$off("refresh");
    eventBus.$emit("clearPlan");
  },

  methods: {
    handleSubmit(drawRadius=true) {
      this.displayPlan = true;

      let params = {
        startLat: this.$store.getters.point1[1],
        startLng: this.$store.getters.point1[0],
        endLat: this.$store.getters.point2[1],
        endLng: this.$store.getters.point2[0],
      };

      axios
        .get("/api/mark", { params: params })
        .then((res) => {
          let { marksInSpannedArea, radius, center } = res.data;
          this.marks = marksInSpannedArea;
          this.center = center;

          eventBus.$emit("drawRoutes", {
            marks: this.marks,
            centerOnRender: false,
            center: this.center
          })
          drawRadius && eventBus.$emit("draw-plan-radius", center, radius);
        })
        .catch((err) => {
          console.log("this is my err", err);
        });
    },

    hidePlan() {
      this.displayPlan = false;
      this.results = [];
      this.marks = [];
      this.center = undefined;
      eventBus.$emit("clearPlan");
    },

    navigateTo(suggestion) {
      this.results = [];
      if (suggestion.center){
        if (this.type === "start") {
          eventBus.$emit("navigateToStart", suggestion.center);
          eventBus.$emit("setStartInput", suggestion.place_name);
        } else {
          eventBus.$emit("navigateToEnd", suggestion.center);
          eventBus.$emit("setEndInput", suggestion.place_name);
        }
      }
    },
  },
};
</script>

<style scoped>
.outer {
  width: 100%;
  height: 100%;
}

</style>