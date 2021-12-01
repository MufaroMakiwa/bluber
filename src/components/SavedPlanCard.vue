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
      :startName="startName"
      :endName="endName"/>
  </div>
</template>

<script>
import OptionsMenu from "./OptionsMenu.vue"
import { formatDate, toPrecision } from '../utils';
import MarkPoints from "./MarkPoints.vue";
import axios from 'axios';


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
      options: [
        {
          title: "Delete plan",
          icon: "trash-alt",
          event: "delete-plan"
        }
      ]
    }
  },

  computed: {
    startName() {
      return `lat: ${toPrecision(this.plan.start.lat, 8)} -- lng: ${toPrecision(this.plan.start.lng, 8)}`
    },

    endName() {
      return `lat: ${toPrecision(this.plan.end.lat, 8)} -- lng: ${toPrecision(this.plan.end.lng, 8)}`
    }
  },

  methods: {
    deleteSavedPlan() {
      this.$emit('delete-plan', this.plan._id)
      axios.delete('/api/saved/' + this.plan._id)
        .then(async () => {
          await this.$store.dispatch('getUser');
        })
        .catch(err => {
          console.log(err);
        })
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