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

    <div class="plan-details">
      <div class="plan-point start">
        <div class="point-icon-container">
          <div class="point-icon"></div>
        </div>
        <div class="name-container">
          <span class="name">{{ startName }}</span>
        </div>
      </div>
      <div class="plan-point end">
        <div class="point-icon-container">
          <div class="point-icon"></div>
        </div>
        <div class="name-container">
          <span class="name">{{ endName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OptionsMenu from "./OptionsMenu.vue"
import { formatDate, toPrecision } from '../utils';
import axios from 'axios';


export default {
  name: "SavedPlanCard",

  components: {
    OptionsMenu
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
      return `lat: ${toPrecision(this.plan.start.lat, 6)} - lng: ${toPrecision(this.plan.start.lng, 6)}`
    },

    endName() {
      return `lat: ${toPrecision(this.plan.end.lat, 6)} - lng: ${toPrecision(this.plan.end.lng, 6)}`
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

.plan-details {
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 1rem;
  padding: 0 1rem;
  align-items: flex-start;
  justify-content: flex-start;
}

.plan-point {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  overflow: hidden;
}

.point-icon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100%;
  padding: 0.75rem 0;
}

.point-icon {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  z-index: 1;
}

.start .point-icon {
  background-color: gray;
}

.end .point-icon {
  background-color: #1ba9bf;
}

.point-icon-container::before {
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-100%);
  border: 1px solid gray;
  height: 100%;
  z-index: 0;
}

.start .point-icon-container::before {
  top: 50%;
}

.end .point-icon-container::before {
  bottom: 50%;
}

.name-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-left: 2rem;
}
</style>