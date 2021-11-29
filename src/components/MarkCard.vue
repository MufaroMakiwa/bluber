<template>
  <div class="card">
    <MarkUserDetails 
      :username="mark.userId"
      :dateAdded="formatDate(mark.dateAdded)"/>

    <div class="mark-details">
      <MarkDescription 
        :caption="mark.caption"
        :tags="mark.tags"/>

      <div class="interaction-details">
       <div class="comment-summary">
         <font-awesome-icon icon="comment" class="comment-icon"/>
         <span class="comment-count">{{ commentCount}}</span>
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
    }
  },

  methods:{

    formatDate(d){
      return formatDate(d);
    }

  },
  computed: {
    userIcon() {
      return this.mark.userId.charAt(0).toUpperCase();
    },

    commentCount(){
      return this.mark.comments.length
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