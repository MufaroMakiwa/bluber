<template>
  <div class="card">
    <div class="header-container">
      <div class="name-date-container">
        <h3>{{ plan.name }}</h3>
        <span class="date">Saved {{ plan.dateAdded }}</span>
      </div>
      <OptionsMenu 
        deleteTitle="Delete plan"
        @edit="editSavedPlan"
        @delete="deleteSavedPlan"/>
    </div>

    <div class="plan-details">
      <div class="plan-point start">
        <div class="point-icon-container">
          <div class="point-icon"></div>
        </div>
        <span class="name">{{ plan.start }}</span>
      </div>
      <div class="plan-point end">
        <div class="point-icon-container">
          <div class="point-icon"></div>
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

.point-icon-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
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

.name {
  padding: 0.5rem 0;
  margin-left: 2rem;
}
</style>