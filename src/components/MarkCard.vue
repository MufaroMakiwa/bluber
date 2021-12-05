<template>
  <div class="card">
    <MarkUserDetails 
      :username="mark.user.name"
      :imageUrl="mark.user.imageUrl"
      :dateAdded="formatDate(mark.dateAdded)"/>
    
    <div v-if="mark.imageUrl">
      <v-btn small @click="toggleImage"> See Image </v-btn>
    </div>

    <div class="mark-details">
      <MarkDescription 
        :caption="mark.caption"
        :tags="mark.tags"/>

      <div class="interaction-details">
       <div class="comment-summary">
         <font-awesome-icon icon="comment" class="comment-icon"/>
         <span class="comment-count">{{ commentCount }}</span>
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

import {formatDate} from "../utils";

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
      showImage: false,
    }
  },

  methods:{

    formatDate(d){
      return formatDate(d);
    },

    toggleImage() {
      this.showImage = !this.showImage;
    }

  },
  computed: {
    userIcon() {
      return this.mark.userId.charAt(0).toUpperCase();
    },

    showButtonLabel() {
      if (this.showImage) {
        return "Hide Image"
      } else {
        return "See Image"
      }
    },

    commentCount(){
      const replyCount = this.mark.comments.reduce(
        (prev, curr) => prev + curr.replies.length, 0
      )
      return this.mark.comments.length + replyCount;
    }
  }
}
</script>

<style scoped>
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