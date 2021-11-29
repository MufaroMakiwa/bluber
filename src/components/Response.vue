<template>
  <div class="response-container">
    <div class="response-wrapper">
      <div class="icon-wrapper">
        <UserIcon :username="response.userId" />
        <hr v-if="!isLast" class="divider"/>
      </div>
      <div class="response-details">
        <div class="name-time-container">
          <span class="username">{{ response.userId }}</span>
          <span class="date">{{ response.dateAdded }}</span>
        </div>

        <span class="response">{{ response.content }}</span>

        <div class="reply-container" v-if="!isReply">
          <div class="modify-buttons" v-if="!isReplying">
            <span 
              class="modify-button reply"       
              @click="toggleReply">
              Reply
            </span>

            <span 
              v-if="isCurrentUserResponse"
              class="modify-button delete"
              @click="handleDeleteComment">
              Delete
            </span>
          </div>
          
          <AddComment v-else :commentId="commentId" :isReply="true" @cancel="cancelReply"/>
        </div>

        <div v-if="isReply && isCurrentUserResponse" class="modify-reply-container">
          <div class="modify-buttons">
            <span 
              class="modify-button delete"
              @click="handleDeleteReply">
              Delete
            </span>
          </div>
        </div>

        <div v-if="hasReplies" class="replies">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserIcon from "./UserIcon.vue";
import AddComment from "./AddComment.vue";


export default {
  name: "Response",

  components: {
    UserIcon, AddComment
  },

  props: {
    response: Object,
    isLast: Boolean,
    isReply: Boolean,
    commentId: String,
  },

  data() {
    return {
      isReplying: false
    }
  },

  computed: {
    hasReplies() {
      // TODO this is causing an error because the replies field is not in the response
      return !this.isReply && this.response.replies.length > 0;
    },

    isCurrentUserResponse() {
      // TODO. Check against the userId in the reply or comment
      return true;
    }
  },

  methods: {
    toggleReply() {
      this.isReplying = true;
    },

    cancelReply() {
      this.isReplying = false;
    },

    handleDeleteComment() {
      alert("Handle delete comment");
    },

    handleDeleteReply() {
      alert("Handle delete reply");
    }
  }
}
</script>

<style scoped>
.response-container {
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

.response-wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.divider {
  flex-grow: 1;
  border: 1px solid lightgray;
}

.response-details {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 1rem;
  padding-bottom: 1rem;
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

.response {
  font-size: 0.9rem;
  word-break: break-word;
  /* margin-top: 0.5rem; */
}

.reply-container {
  width: 100%;
  margin-top: 0.5rem;
  padding-bottom: 1rem;
}

.modifiy-buttons {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
}

.modify-button {
  text-transform: none;
  font-size: 0.9rem;
  transition: all 0.3s;
  cursor: pointer;
}

.modify-button.reply {
  color: #1ba9bf;
}

.modify-button.reply:hover {
  color: gray;
}

.modify-button.delete {
  color: gray;
  margin-left: 0.5rem;
}

.modify-button.delete:hover {
  color: darkgray;
}

.modify-reply-container {
  width: 100%;
  margin-top: 0.5rem;
}

.modify-reply-container .delete {
  margin-left: 0;
}

.replies {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
</style>