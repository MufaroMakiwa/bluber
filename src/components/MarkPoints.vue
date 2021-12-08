<template>
  <div class="plan-details">
    <div class="plan-point start">
      <div 
        :class="['point-icon-container', dense ? '' : 'padded', displayEnd ? 'dotted' : '']">
        <div class="point-icon"></div>
      </div>
      <div class="name-container">
        <span class="name">{{ startName }}</span>
      </div>
    </div>
    <div class="plan-point end" v-if="displayEnd">
      <div 
        :class="['point-icon-container', 'padded', displayEnd ? 'dotted' : '']">
        <div class="point-icon"></div>
      </div>
      <div class="name-container">
        <span class="name">{{ endName }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MarkPoints",

  props: {
    startName: String,
    endName: String,
  },

  computed: {
    displayEnd() {
      return this.endName.trim() !== "";
    },
  }
}
</script>

<style scoped>
.plan-details {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

.plan-point {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  overflow: hidden;
}

.plan-point:first-of-type {
  padding-bottom: 1rem;
}

.point-icon-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  height: 100%;
}

.point-icon-container.padded {
  padding-top: 0.25rem;
  padding-bottom: 2rem;
}

.point-icon {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  z-index: 1;
}

.end .point-icon {
  background-color: rgb(57, 135, 190);
}

.start .point-icon {
  background-color: rgb(248, 76, 76);
}

.name-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 2rem;
}

.name-container .name {
  text-align: start;
}
</style>