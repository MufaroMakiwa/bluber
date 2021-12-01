<template>
  <div class="user-details-container">
    <UserIcon 
      :username="username"
      :imageUrl="imageUrl"/>

    <div class="details-inner">
      <span class="username">{{ username }}</span>
      <span class="date-posted">{{ dateAdded }}</span>
    </div>
  </div>
</template>

<script>
import UserIcon from "./UserIcon.vue";

export default {
  name: "MarkUserDetails",

  components: {
    UserIcon
  },

  props: {
    username: String,
    dateAdded: String,
    imageUrl: String
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
  align-items: flex-start;
  justify-content: flex-start;
  flex-grow: 1;
}

.details-inner {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 1rem;
}

.username {
  font-weight: bold;
}

.date-posted {
  color: gray;
}
</style>