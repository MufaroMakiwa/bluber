<template>
  <div class="add-comment-container">
    <div class="comment-inner">
      <UserIcon username="Mufaro Makiwa"/>
      <v-textarea
        rows="1"
        dense
        outlined
        hide-details 
        auto-grow
        background-color="input"
        v-model="comment"
        line-height="20"
        class="comment"
        label="Comment"
        placeholder="Write a comment..."></v-textarea>
    </div>
    
    <div class="submit-section">
      <v-btn
        depressed
        small
        color="primary">
        Comment
      </v-btn>
    </div> 
  </div>
</template>

<script>
import UserIcon from "./UserIcon.vue";


export default {
  name: "AddComment",

  components: {
    UserIcon
  },

  data() {
    return {
      comment: ""
    }
  }
}
</script>

<style scoped>
.add-comment-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  padding-bottom: 1rem;
}

.comment-inner {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}

.comment {  
  flex-grow: 1;
}

.submit-section {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1rem;
  width: 100%;
}

</style>