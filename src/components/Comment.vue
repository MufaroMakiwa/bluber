<template>
  <Response
    :response="comment"
    :isLast="isLast"
    :isReply="false"
    :commentId="comment._id"
    :commentUserId="comment.user.userId" >

    <Response 
      v-for="(reply, index) in comment.replies"
      :key="index"
      :response="reply"
      :isReply="true"
      :commentId="comment._id"
      :commentUserId="comment.user.userId"
      :isLast="index === comment.replies.length - 1"/>
  </Response>
</template>

<script>
import Response from "./Response.vue";


export default {
  name: "Comment",

  components: {
    Response
  },

  props: {
    comment: Object,
    isLast: Boolean
  },

  data() {
    return {
      isReplying: false
    }
  },

  computed: {
    hasReplies() {
      return this.comment.replies.length > 0;
    }
  },

  methods: {
    toggleReply() {
      this.isReplying = true;
    },

    cancelReply() {
      this.isReplying = false;
    }
  }
}
</script>

<style scoped>
.comment-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
}

.icon-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
}

.comment-wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.divider {
  flex-grow: 1;
  border: 1px solid lightgray;
}

.comment-details {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 1rem;
  width: 100%;
}

.name-time-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.username {
  font-weight: bold;
}

.date {
  color: gray;
  font-size: 0.8rem;
  margin-left: 0.5rem;
}

.comment {
  font-size: 0.9rem;
  word-break: break-word;
  /* margin-top: 0.5rem; */
}

.reply-container {
  width: 100%;
  margin-top: 0.5rem;
  padding-bottom: 1rem;
}

.reply-button {
  color: var(--primary);
  font-size: 0.9rem;
  transition: all 0.3s;
  cursor: pointer;
}


.reply-button:hover {
  color: gray;
}
</style>