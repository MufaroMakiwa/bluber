<template>
  <ViewTemplate>
    <template v-slot:heading>
      Saved Plans
    </template>
  </ViewTemplate>
</template>

<script>
import ViewTemplate from "./ViewTemplate.vue";


export default {
  name: "SavedPlans",

  components: {
    ViewTemplate
  }
}
</script>

<style scoped>
</style>