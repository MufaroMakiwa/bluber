<template>
  <div class="outer">
    <transition name="fade">
      <ViewTemplate 
        v-if="!displayPlan">
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

          <div v-else class="no-saved-container">
            <span class="no-plans">You currently do not have any saved plans</span>
          </div>
        </template>
      </ViewTemplate>
    </transition>

    <MarksList 
      v-if="displayPlan" 
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
import MarksList from "./MarksList.vue";
import axios from 'axios';
import { eventBus } from "../main";

export default {
  name: "SavedPlans",

  components: {
    ViewTemplate, SavedPlanCard, MarksList
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
      displayPlan: false,
      marks: []
    }
  },

  methods: {
    hidePlan() {
      this.displayPlan=false;
      this.marks = [];
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
        this.displayPlan = true;
        let {marksInSpannedArea, radius, center } = res.data
        this.marks = marksInSpannedArea;
        eventBus.$emit("drawRoutes",this.marks)
        console.log(radius,center)
        // eventBus.$emit("draw-plan-radius",center,radius)
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

.no-saved-container {
  display: flex;
  margin-top: 1.5rem;
  width: 100%;
}

.no-plans {
  font-weight: bold;
  color: gray;
}
</style>