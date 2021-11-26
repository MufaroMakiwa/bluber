<template>
  <div class="mark-details-container">
    <div class="heading-container">
      <BackButton @click.native="$emit('back')"/>
      <h2 class="heading">Mark</h2>
    </div>
  </div>
</template>

<script>
import BackButton from "./BackButton.vue";


export default {
  name: "MarkDetailsContainer",

  components: {
    BackButton
  }
}
</script>

<style scoped>
.mark-details-container {
  width: 100%;
  height: 100%;
  padding: 1rem;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

.filters-container > * {
  width: 100%;
}

.heading-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.heading {
  margin-left: 1rem;
}
</style>