<template>
  <div class="add-comment-container">
    <div class="comment-inner">
      <UserIcon 
        v-if="!isReply" 
        :imageUrl="imageUrl"
        :username="name" 
        class="icon" />
      <v-textarea
        rows="1"
        dense
        outlined
        rounded
        :autofocus="isReply"
        single-line
        hide-details
        auto-grow
        background-color="input"
        v-model="comment"
        class="comment"
        :label="textFieldLabel"
        :placeholder="textFieldLabel"
      ></v-textarea>
    </div>

    <div class="submit-section">
      <v-btn
        v-if="isReply"
        color="primary"
        outlined
        small
        rounded
        class="cancel"
        @click="$emit('cancel')"
      >
        Cancel
      </v-btn>

      <v-btn 
        depressed 
        small 
        rounded 
        color="primary" 
        :disabled="!canSubmit"
        @click="handleSubmit">
        {{ buttonLabel }}
      </v-btn>
    </div>
  </div>
</template>

<script>
// import { eventBus } from '../main';
import UserIcon from "./UserIcon.vue";
import axios from "axios";
import { eventBus } from '../main';

export default {
  name: "AddComment",

  components: {
    UserIcon,
  },

  props: {
    isReply: {
      default: false,
      type: Boolean,
    },
    markId: String,
    commentId: String,
    markUserId: String, // author of the mark
    commentUserId: String, // author of the comment
  },

  computed: {
    textFieldLabel() {
      return this.isReply ? "Write a reply..." : "Write a comment...";
    },

    buttonLabel() {
      return this.isReply ? "Reply" : "Comment";
    },

    isSignedIn() {
      return this.$store.getters.isSignedIn;
    },

    user() {
      return this.$store.getters.user;
    },

    name() {     
      return this.isSignedIn ? this.user.name : "";
    },

    imageUrl() {
      return this.isSignedIn ? this.user.imageUrl : "";
    },

    canSubmit() {
      return this.comment.trim().length > 0;
    }
  },

  data() {
    return {
      comment: "",
    };
  },
  methods: {
    handleSubmit() {
      if (!this.isReply) {
        axios
          .post("/api/comment", {
            targetUserId: this.markUserId,
            content: this.comment,
            markId: this.markId,
          })
          .then(() => {
            this.comment = "";
            eventBus.$emit("refresh", {drawRoutes: false});
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .post("/api/reply", {
            targetUserId: this.commentUserId,
            content: this.comment,
            commentId: this.commentId,
          })
          .then(() => {
            this.comment = "";
            this.$emit('cancel');
            eventBus.$emit("refresh", {drawRoutes: false});
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
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

.icon {
  margin-right: 1rem;
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

.cancel {
  margin-right: 1rem;
}
</style>