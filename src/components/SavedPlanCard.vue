<template>
  <div class="card">
    <div class="header-container">
      <div class="name-date-container">
        <h3>{{ plan.name }}</h3>
        <span class="date">Saved {{ formatDate(plan.dateAdded) }}</span>
      </div>
      <OptionsMenu 
        :options="options"
        @delete-plan="deleteSavedPlan"/>
    </div>

    <MarkPoints 
      class="mark-points"
      :startName="start"
      :endName="end"/>
  </div>
</template>

<script>
import OptionsMenu from "./OptionsMenu.vue"
import { formatDate, toPrecision } from '../utils';
import MarkPoints from "./MarkPoints.vue";
import axios from "axios";
import mapboxgl from "mapbox-gl";



export default {
  name: "SavedPlanCard",

  components: {
    OptionsMenu, MarkPoints
  },

  props: {
    plan: Object
  },

  data() {
    return {
      start: "",
      end: "",
      options: [
        {
          title: "Delete plan",
          icon: "trash-alt",
          event: "delete-plan",
        }
      ]
    }
  },

  async created() {
    const start = this.plan.start;
    let startResponse = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${start.lng},${start.lat}.json?access_token=${mapboxgl.accessToken}`
    );
    try {
      this.start = startResponse.data.features[0].place_name;
    } catch {
      this.start = this.startName();
    }

    const end = this.plan.end;
    let endResponse = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${end.lng},${end.lat}.json?access_token=${mapboxgl.accessToken}`
    );
    try {
      this.end = endResponse.data.features[0].place_name;
    } catch {
      this.end = this.endName();
    }
  },

  methods: {
    startName() {
      return `lat: ${toPrecision(this.plan.start.lat, 8)} -- lng: ${toPrecision(this.plan.start.lng, 8)}`
    },

    endName() {
      return `lat: ${toPrecision(this.plan.end.lat, 8)} -- lng: ${toPrecision(this.plan.end.lng, 8)}`
    },

    deleteSavedPlan() {
      this.$emit('delete-plan');
    },

    formatDate(d){
      return formatDate(d)
    }
  }
}
</script>

<style scoped>
.header-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: flex-start;
  justify-content: space-between;
}

.name-date-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

.date {
  color: gray;
}

.mark-points {
  margin-top: 1rem;
  padding: 0 1rem;
}
</style>