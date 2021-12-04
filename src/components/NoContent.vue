<template>
  <div class="no-content-container">
    <span class="no-content">{{ message }}</span>
  </div>
</template>

<script>
export default {
  name: "NoContentContainer",

  props: {
    message: String
  }
}
</script>

<style scoped>
.no-content-container {
  display: flex;
  margin-top: 1.5rem;
  width: 100%;
}

.no-content {
  font-weight: bold;
  color: gray;
}
</style>