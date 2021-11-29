<template>
  <div class="add-comment-container">
    <div class="comment-inner">
      <UserIcon v-if="!isReply" username="Mufaro Makiwa" class="icon" />
      <v-textarea
        rows="1"
        dense
        outlined
        rounded
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

      <v-btn depressed small rounded color="primary" @click="handleSubmit">
        {{ buttonLabel }}
      </v-btn>
    </div>
  </div>
</template>

<script>
// import { eventBus } from '../main';
import UserIcon from "./UserIcon.vue";
import axios from "axios";

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
  },

  computed: {
    textFieldLabel() {
      return this.isReply ? "Write a reply..." : "Write a comment...";
    },

    buttonLabel() {
      return this.isReply ? "Reply" : "Comment";
    },
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
            userId2: this.$store.getters.userId,
            content: this.comment,
            markId: this.markId,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .post("/api/reply", {
            userId2: this.$store.getters.userId,
            content: this.comment,
            commentId: this.commentId,
          })
          .then((res) => {
            console.log(res);
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