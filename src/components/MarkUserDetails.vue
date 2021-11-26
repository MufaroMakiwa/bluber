<template>
  <div class="user-details-container">
    <div class="user-icon">
      <span class="icon">{{ userIcon }}</span>
    </div>

    <div class="details-inner">
      <span class="username">{{ username }}</span>
      <span class="date-posted">{{ dateAdded }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "MarkUserDetails",

  props: {
    username: String,
    dateAdded: String
  },

  computed: {
    userIcon() {
      return this.username.charAt(0).toUpperCase();
    }
  }
}
</script>

<style scoped>
.user-details-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-grow: 1;
}

.user-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: lightgray;
  margin-right: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.user-icon .icon {
  font-size: 1.5rem;
  color: white;
  font-weight: bold;
}

.details-inner {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: flex-start;
  align-items: flex-start;
}

.username {
  font-weight: bold;
}

.date-posted {
  color: gray;
}
</style>