<template>
  <div class="mark-container">
    <div class="user-details-container">
      <div class="user-icon">
        <span class="icon">{{ userIcon }}</span>
      </div>

      <div class="details-inner">
        <span class="username">{{ mark.username }}</span>
        <span class="date-posted">{{ mark.dateAdded }}</span>
      </div>
    </div>

    <div class="mark-details">
      <span class="mark-caption">{{ mark.caption }}</span>

      <div class="tags-container">
        <v-btn
          disabled
          rounded
          small
          color="secondary"
          v-for="tag in mark.tags"
          :key="tag"
          class="padded">
          {{ tag }}
        </v-btn>
      </div>

      <div class="interaction-details">
       <div class="comment-summary">
         <font-awesome-icon icon="comment" class="comment-icon"/>
         <span class="comment-count">{{ mark.comments }}</span>
       </div>
        <Rating :rating="mark.rating"/>
      </div>
    </div>
  </div>
</template>

<script>
import Rating from "./Rating.vue"


export default {
  name: "MarkCard",

  components: {
    Rating
  },

  props: {
    mark: Object
  },

  data() {
    return {
      tags: ["Busy", "Blocked"],
    }
  },

  computed: {
    userIcon() {
      return this.mark.username.charAt(0).toUpperCase();
    }
  }
}
</script>

<style scoped>
.mark-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid lightgray;
  border-radius: 8px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
  margin-top: 1.5rem;
  transition: all 0.3s;
  background-color: whitesmoke;
}

.mark-container:hover {
  cursor: pointer;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.4);
}

.mark-container:first-of-type {
  margin-top: 0;
}

.user-details-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
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

.mark-details {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 1.5rem;
}

.mark-caption {
  word-break: break-all;
}

.tags-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
}

.tags-container .padded {
  margin-top: 0.5rem;
  margin-right: 1rem;
}

.interaction-details {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
}

.comment-summary {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.comment-icon {
  color: gray;
  font-size: 1.2rem;
}

.comment-count {
  color: gray;
  margin-left: 0.5rem;
}
</style>