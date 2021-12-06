<template>
  <div class="user-details-container">
    <ProfilePopup 
      :username="username"
      :imageUrl="imageUrl"
      :isImage="true"
      :rating="rating"
      :marksCount="marksCount"/>

    <div class="details-inner">
      <ProfilePopup 
      :username="username"
      :imageUrl="imageUrl"
      :isImage="false"
      :rating="rating"
      :marksCount="marksCount"/>
      <span class="date-posted">{{ dateAdded }}</span>
    </div>
  </div>
</template>

<script>
import ProfilePopup from "./ProfilePopup.vue";


export default {
  name: "MarkUserDetails",

  components: {
    ProfilePopup
  },

  props: {
    username: String,
    dateAdded: String,
    imageUrl: String,
    rating: Number,
    marksCount: Number
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