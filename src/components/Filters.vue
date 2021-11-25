<template>
  <div class="filters-container">
    <div class="heading-container">
       <BackButton @click.native="$emit('back')"/>
      <h2 class="heading">Filters</h2>
    </div>
  </div>
</template>

<script>
import BackButton from "./BackButton.vue";

export default {
  name: "Filters",

  components: {
    BackButton
  }
}
</script>

<style scoped>
.filters-container {
  width: 100%;
  height: 100%;
  padding: 1rem;
}

.heading-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.heading {
  margin-left: 1rem;
}
</style>