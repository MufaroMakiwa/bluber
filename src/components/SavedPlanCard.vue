<template>
  <div class="card">
    <div class="header-container">
      <div class="name-date-container">
        <h3>{{ plan.name }}</h3>
        <span class="date">Saved {{ plan.dateAdded }}</span>
      </div>
      <OptionsMenu 
        editTitle="Edit plan"
        deleteTitle="Delete plan"
        @edit="editSavedPlan"
        @delete="deleteSavedPlan"/>
    </div>

    <div class="plan-details">
      <div class="plan-point start">
        <div class="point-icon">

        </div>
        <span class="name">{{ plan.start }}</span>
      </div>
      <div class="plan-point end">
        <div class="point-icon">

        </div>
        <span class="name">{{ plan.end }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import OptionsMenu from "./OptionsMenu.vue"


export default {
  name: "SavedPlanCard",

  components: {
    OptionsMenu
  },

  props: {
    plan: Object
  },

  methods: {
    editSavedPlan() {

    },

    deleteSavedPlan() {

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

.point-icon {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  position: relative;
}

.start .point-icon {
  background-color: gray;
}

.point-icon::before {
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-100%);
  border: 1px solid gray;
  height: 100%;
}

.point-icon::before {
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-100%);
  border: 1px solid gray;
  height: 100%;
}

.start .point-icon::before {
  top: 100%;
}

.end .point-icon::before {
  bottom: 100%;
}

.end .point-icon {
  background-color: #1ba9bf;
}

.name {
  padding: 0.5rem 0;
  margin-left: 2rem;
}
</style>