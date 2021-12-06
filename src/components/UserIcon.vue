<template>
  <div class="user-icon" v-if="!hasImageUrl">
    <span class="icon">{{ userIcon }}</span>
  </div>

  <img
    v-else
    class="image"
    :src="imageUrl"
    alt=""/>
</template>

,<script>
export default {
  name: "UserIcon",

  props: {
    username: String,
    imageUrl: String
  },

  computed: {
    userIcon() {
      return this.username.charAt(0).toUpperCase();
    },

    hasImageUrl() {
      return this.imageUrl !== "";
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
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
}

.user-icon .icon {
  font-size: 1.5rem;
  color: white;
  font-weight: bold;
}

.image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
}
</style>