<template>
  <div class="response-container">
    <div class="response-wrapper">
      <div class="icon-wrapper">
        <UserIcon :username="response.username" />
        <hr v-if="!isLast" class="divider"/>
      </div>
      <div class="response-details">
        <div class="name-time-container">
          <span class="username">{{ response.username }}</span>
          <span class="date">{{ response.dateAdded }}</span>
        </div>

        <span class="response">{{ response.content }}</span>

        <div class="reply-container" v-if="!isReply">
          <span 
            class="reply-button" 
            v-if="!isReplying"
            @click="toggleReply">Reply</span>
          <AddComment v-else :isReply="true" @cancel="cancelReply"/>
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
    isReply: Boolean
  },

  data() {
    return {
      isReplying: false
    }
  },

  computed: {
    hasReplies() {
      return !this.isReply && this.response.replies.length > 0;
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

.reply-button {
  text-transform: none;
  color: #1ba9bf;
  font-size: 0.9rem;
  transition: all 0.3s;
  cursor: pointer;
}


.reply-button:hover {
  color: gray;
}

.replies {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
</style>