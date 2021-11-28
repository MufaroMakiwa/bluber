<template>
  <Search mode="plan">
    <template v-slot:heading>
      Where are you going?
    </template>
    <template v-slot:content>
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
</template>

<script>
import Search from "./Search.vue";

export default {
  name: "PlanTrip",

  components: {
    Search
  },

  methods: {
    handleSubmit() {
      alert('To hanlde plan trip');
    }
  }
}
</script>