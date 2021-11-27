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
              v-for="(plan, index) in savedPlans"
              :key="index"
              :plan="plan"
              @click.native="displayPlan=true"/>
          </div>

          <span v-else class="no-plans">You currently do not have any saved plans</span>
        </template>
      </ViewTemplate>
    </transition>

    <MarksList 
      v-if="displayPlan" 
      :requiresBackButton="true" 
      title="Marks in area"
      @back="displayPlan=false"/>
    
  </div>
</template>

<script>
import ViewTemplate from "./ViewTemplate.vue";
import SavedPlanCard from "./SavedPlanCard.vue";
import MarksList from "./MarksList.vue";

export default {
  name: "SavedPlans",

  components: {
    ViewTemplate, SavedPlanCard, MarksList
  },

  computed: {
    hasSavedPlans() {
      return this.savedPlans.length > 0;
    }
  },

  data() {
    const savedPlans = [
        {
          start: "77 Massachusetts Avenue",
          end: "189 Vassar Street",
          name: "Home Route",
          dateAdded: "Nov 8"
        },

        {
          start: "Stata Center",
          end: "Maseeh Hall",
          name: "6.036 route",
          dateAdded: "Jan 4"
        },

        {
          start: "New House",
          end: "McGregor",
          name: "Dininghall Route",
          dateAdded: "Jan 1"
        }
      ]
    return {
      savedPlans: [...savedPlans],
      displayPlan: false
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

.no-plans {
  margin-top: 1rem;
  font-weight: bold;
  color: gray;
}
</style>