<template>
  <div class="create-mark-container shadow">
    <div class="header-container">
      <v-btn
        icon
        color="gray"
        class="side-icon"
        @click="handleBack">
        <font-awesome-icon icon="arrow-left" class="back-icon"/>
      </v-btn>

      <h2 class="section-heading">Create Mark</h2>
    </div>

    <div class="mark-details">
      <v-textarea
        :auto-grow="true"
        rows="1"
        row-height="28"
        label="Caption"
        placeholder="e.g Restaurant expanded into street"
        class="caption-input">
      </v-textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateMark",

  methods: {
    handleBack() {
      alert("Handle the back arrow");
    }
  },

  data() {
    return {
      
    }
  }
}
</script>

<style scoped>
.create-mark-container {
  width: 100%;
  height: 100%;
  padding: 1rem;
}

.header-container {
  display: flex;
  flex-direction: row;
}

.section-heading {
  margin-left: 1rem;
}

.back-icon {
  color: gray;
  font-size: 1.25rem;
}

.mark-details {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.caption-input {
  width: 100%;
}
</style>