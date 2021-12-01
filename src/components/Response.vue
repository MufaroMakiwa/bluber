<template>
  <div class="response-container">
    <div class="response-wrapper">
      <div class="icon-wrapper">
        <UserIcon 
          :username="response.user.name"
          :imageUrl="response.user.imageUrl" />
        <hr v-if="!isLast" class="divider"/>
      </div>
      <div class="response-details">
        <div class="name-time-container">
          <span class="username">{{ response.user.name }}</span>
          <span class="date">{{ formatDate(response.dateAdded) }}</span>
        </div>

        <span class="response">{{ response.content }}</span>

        <div class="reply-container" v-if="!isReply && isSignedIn">
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
          
          <AddComment v-else :commentId="commentId" :commentUserId="commentUserId" :isReply="true" @cancel="cancelReply"/>
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
import {formatDate} from "../utils";
import axios from "axios";
import { eventBus } from '../main';


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
    commentUserId: String
  },

  data() {
    return {
      isReplying: false
    }
  },

  computed: {
    hasReplies() {
      return !this.isReply && this.response.replies.length > 0;
    },

    isCurrentUserResponse() {
      return this.isSignedIn && this.response.user.userId === this.user.userId;
    },

    user() {
      return this.$store.getters.user;
    },

    isSignedIn() {
      return this.$store.getters.isSignedIn;
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
      axios.delete('/api/comment/'+this.response._id)
        .then(() => { 
          eventBus.$emit("refresh");
        })
        .catch((err) => {
          console.log(err)
        });

    },

    handleDeleteReply() {
      axios.delete('/api/reply/'+this.response._id)
        .then(() => { 
          eventBus.$emit("refresh");
        })
        .catch((err) => {
          console.log(err)
        });
    },

    formatDate(d){
      return formatDate(d);
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

.response-container:last-of-type > .response-wrapper > .response-details {
  padding-bottom: 0;
}

.icon-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
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
}

.reply-container {
  width: 100%;
}

.content-padded {
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
  margin-top: 1rem;
}
</style>