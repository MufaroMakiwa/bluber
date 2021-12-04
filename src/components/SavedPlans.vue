<template>
  <div class="outer">
    <transition name="fade">
      <ViewTemplate 
        v-if="displayedPlan === null">
        <template v-slot:heading>
          Saved Plans
        </template>

        <template v-slot:content>
          <div class="saved-plans-container" v-if="hasSavedPlans">
            <SavedPlanCard 
              v-for="(plan, index) in user.saved"
              :key="index"
              :plan="plan"
              @click.native="renderPlan(plan)"/>
          </div>

          <NoContent 
            v-else
            message="You currently do not have any saved plans"/>
        </template>
      </ViewTemplate>
    </transition>

    <MarksList 
      v-if="displayedPlan !== null" 
      :requiresBackButton="true" 
      title="Marks in area"
      :marks="marks"
      :displaySaveIcon="false"
      @back="hidePlan"/>
    
  </div>
</template>

<script>
import ViewTemplate from "./ViewTemplate.vue";
import SavedPlanCard from "./SavedPlanCard.vue";
import NoContent from "./NoContent.vue";
import MarksList from "./MarksList.vue";
import axios from 'axios';
import { eventBus } from "../main";

export default {
  name: "SavedPlans",

  components: {
    ViewTemplate, SavedPlanCard, MarksList, NoContent
  },

  computed: {
    hasSavedPlans() {
      return this.isSignedIn ? this.user.saved.length > 0 : false;
    },

    user() {
      return this.$store.getters.user;
    },

    isSignedIn() {
      return this.$store.getters.isSignedIn;
    }
  },

  data() {
    return {
      displayedPlan: null,
      marks: []
    }
  },

  mounted() {
    eventBus.$on("refresh", () => {
      this.displayedPlan !== null && this.renderPlan(this.displayedPlan);
    })
  },

  beforeDestroy() {
    eventBus.$off("refresh");
    eventBus.$emit("clearPlan");
  },

  methods: {
    hidePlan() {
      this.displayedPlan = null;
      this.marks = [];   
      eventBus.$emit("clearPlan");
    },

    renderPlan(plan) {
      let params = {
        startLat: plan.start.lat,
        startLng: plan.start.lng,
        endLat: plan.end.lat, 
        endLng: plan.end.lng,
      }

      axios.get("/api/mark",{params:params})
      .then((res) => {
        this.displayedPlan = plan;
        let {marksInSpannedArea, radius, center } = res.data
        this.marks = marksInSpannedArea;
        eventBus.$emit("drawRoutes", {
            marks: this.marks,
            centerOnRender: false
          })
        eventBus.$emit("draw-plan-radius", center, radius);
      })
      .catch((err) => {
        console.log(err)
      });
    }
  }
}
</script>

<style scoped>
.outer {
  width: 100%;
  height: 100%;
}

.saved-plans-container {
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: flex-start;
  width: 100%;
  margin-top: 1.5rem;
}
</style>