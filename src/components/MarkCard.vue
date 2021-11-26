<template>
  <div class="mark-container">
    <MarkUserDetails 
      :username="mark.username"
      :dateAdded="mark.dateAdded"/>

    <div class="mark-details">
      <MarkDescription 
        :caption="mark.caption"
        :tags="mark.tags"/>

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
import MarkUserDetails from "./MarkUserDetails.vue";
import MarkDescription from "./MarkDescription.vue"

export default {
  name: "MarkCard",

  components: {
    Rating, MarkUserDetails, MarkDescription
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

.mark-details {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 1.5rem;
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