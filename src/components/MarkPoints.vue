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
        :class="['point-icon-container', dense ? '' : 'padded', displayEnd ? 'dotted' : '']">
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
    dense: {
      default: true,
      type: Boolean,
    }
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

.point-icon-container.padded {
  padding: 1.25rem 0;
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

.point-icon-container.dotted::before {
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-100%);
  border: 1px dashed rgb(57, 135, 190);
  height: 100%;
  z-index: 0;
}

.start .point-icon-container.dotted::before {
  top: 50%;
}

.end .point-icon-container.dotted::before {
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