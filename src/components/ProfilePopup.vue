<template>
  <div>
    <v-menu
      open-on-hover
      min-width="250"
      max-width="300"
      offset-y>
      <template v-slot:activator="{ on, attrs }"> 
        <div 
          v-if="isImage"
          v-bind="attrs"
          v-on="on">
          <UserIcon 
            :username="username"
            :imageUrl="imageUrl"/>
        </div>

        <span 
          v-else
          class="username"
          v-bind="attrs"
          v-on="on">
          {{ username }}
        </span>
      </template>

      <v-card>
        <div class="popup-container">
          <font-awesome-icon 
            v-if="imageUrl === ''"
            icon="user-circle" 
            class="user-icon-menu"/> 
          <img 
            v-else
            class="profile-image"
            :src="imageUrl"
            alt=""/> 

          <div class="details-container">
            <span class="popup-name">{{ username }}</span>
            <span class="marks-count">{{ countMessage }}</span>
            <Rating class="rating-margin" :rating="rating"/>
          </div>
        </div>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import UserIcon from "./UserIcon.vue";
import Rating from "./Rating.vue";


export default {
  name: "ProfilePopup",

  components: {
    UserIcon, Rating
  },

  props: {
    username: String,
    isImage: Boolean,
    marksCount: Number,
    rating: Number,
    imageUrl: String
  },

  computed: {
    countMessage() {
      const toAdd = this.marksCount === 1 ? "mark" : "marks";
      return `${this.marksCount} ${toAdd} added`
    }
  }
}
</script>

<style scoped>
.username {
  font-weight: bold;
}

.username:hover {
  text-decoration: underline;
}

.popup-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 1rem;
  --size: 70px;
}

.profile-image {
  border-radius: 50%;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
  width: var(--size);
  height: var(--size);
}

.user-icon-menu {
  width: var(--size);
  height: var(--size);
  color: gray;
}

.details-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: flex-start;
  justify-content: flex-start;
  padding-left: 1rem;
}

.popup-name {
  color: #1ba9bf;
  font-weight: bold;
}

.marks-count {
  color: gray;
}
</style>