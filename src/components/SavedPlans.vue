<template>
  <ViewTemplate>
    <template v-slot:heading>
      Saved Plans
    </template>

    <template v-slot:content>
      <div class="saved-plans-container" v-if="hasSavedPlans">
        <SavedPlanCard 
          v-for="(plan, index) in savedPlans"
          :key="index"
          :plan="plan"/>
      </div>

      <span v-else class="no-plans">You currently do not have any saved plans</span>
    </template>
  </ViewTemplate>
</template>

<script>
import ViewTemplate from "./ViewTemplate.vue";
import SavedPlanCard from "./SavedPlanCard.vue";

export default {
  name: "SavedPlans",

  components: {
    ViewTemplate, SavedPlanCard
  },

  computed: {
    hasSavedPlans() {
      return this.savedPlans.length > 0;
    }
  },

  data() {
    return {
      savedPlans: [
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
    }
  }
}
</script>

<style scoped>
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