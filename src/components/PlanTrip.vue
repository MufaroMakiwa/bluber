<template>
  <div class="outer">
    <transition name="fade">
      <Search mode="plan" v-if="!displayPlan">
        <template v-slot:heading>
          Where are you going?
        </template>

        <template v-slot:submit>
          <v-btn
            depressed
            rounded
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
      @back="hidePlan"
      v-if="displayPlan"
      :requiresBackButton="true"/>
  </div>
</template>

<script>
import Search from "./Search.vue";
import MarksList from "./MarksList.vue";


export default {
  name: "PlanTrip",

  components: {
    Search, MarksList,
  },

  data() {
    return {
      displayPlan: false
    }
  },

  methods: {
    handleSubmit() {
      this.displayPlan = true;
    },

    hidePlan() {
      this.displayPlan = false;
    }
  }
}
</script>

<style scoped>
.outer {
  width: 100%;
  height: 100%;
}
</style>