<template>
  <div class="user-icon">
    <span class="icon">{{ userIcon }}</span>
  </div>
</template>

,<script>
export default {
  name: "UserIcon",

  props: {
    username: String
  },

  computed: {
    userIcon() {
      return this.username.charAt(0).toUpperCase();
    }
  }
}
</script>

<style scoped>
.user-icon {
  width: 40px;
  height: 40px;
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
</style>