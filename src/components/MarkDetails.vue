<template>
  <ViewTemplate :backButton="true" @back="$emit('back')">
    <template v-slot:heading>
      Mark
    </template>

    <template v-slot:content>
      <div class="mark-header">
        <MarkUserDetails 
          :username="mark.user.name"
          :imageUrl="mark.user.imageUrl"
          :dateAdded="formatDate(mark.dateAdded)"/>

        <OptionsMenu 
          v-if="displayOptions"
          :options="options"
          @delete-mark="deleteMark"
          @remove-rating="removeRating"/>
      </div>

      <div class="mark-details">
        <MarkDescription 
          :caption="mark.caption"
          :tags="mark.tags"/>

        <div class="ratings-container">
    
          <Rating 
            :rating="toPrecision(mark.rating)" 
            :addTooltip="canRate"
            :ratingCount="mark.ratingCount"
            @open-rating-dialog="triggerRating"/>

          <RateMarkDialog 
            :display="isRating"
            @cancel="isRating=false"
            @submit-rating="submitRating"/>
        </div>

      </div>
      <v-divider v-if="isSignedIn"></v-divider>
      <v-divider v-if="isSignedIn"></v-divider>

      <div class="add-comment" v-if="isSignedIn">
        <AddComment 
          :markUserId="mark.user.userId" 
          :markId="mark._id"/>
      </div>
      <v-divider></v-divider>
      <v-divider></v-divider>

      <div class="comments-section">
        <Comment 
          v-for="(comment, index) in mark.comments" 
          :key="index"
          :comment="comment"
          :isLast="index === mark.comments.length - 1"/>
      </div>

      <AuthenticationDialog 
        :dialog="displayAuthDialog" 
        action="rate this mark"
        @close-auth-dialog="displayAuthDialog=false"/>


    </template>
  </ViewTemplate>
</template>

<script>
import Rating from "./Rating.vue"
import ViewTemplate from "./ViewTemplate.vue";
import MarkUserDetails from "./MarkUserDetails.vue";
import RateMarkDialog from "./RateMarkDialog.vue";
import MarkDescription from "./MarkDescription.vue";
import OptionsMenu from "./OptionsMenu.vue";
import AddComment from "./AddComment.vue";
import AuthenticationDialog from "./AuthenticationDialog.vue";
import Comment from "./Comment.vue";
import { formatDate, toPrecision } from '../utils';

import axios from "axios";
import { eventBus } from '../main';


export default {
  name: "MarkDetails",

  components: {
    ViewTemplate, 
    MarkUserDetails, 
    MarkDescription, 
    Rating,
    OptionsMenu,
    AddComment,
    Comment,
    RateMarkDialog,
    AuthenticationDialog
  },

  props: {
    mark: Object,
    userMarks: {
      default: false,
      type: Boolean,
    }
  },

  data() {
    return {
      isRating: false,
      displayAuthDialog: false
    }
  },

  computed: {
    options() {
      return this.isCurrentUserMark 
      ? 
        [
          {
            title: "Delete mark",
            icon: "trash-alt",
            event: "delete-mark"
          }
        ]
      :
        [
          {
            title: "Remove rating",
            icon: "star",
            event: "remove-rating"
          }
        ]
    },

    displayOptions() {
      if (this.isCurrentUserMark) {
        return true;
      } else if (this.mark.isCurrentUserRating) {
        return true;
      } else {
        return false;
      }
    },

    isSignedIn() {
      return this.$store.getters.isSignedIn;
    },

    user() {
      return this.$store.getters.user;
    },
 
    isCurrentUserMark() {
      return this.isSignedIn && this.mark.user.userId === this.user.userId;
    },

    canRate() {
      return !this.isCurrentUserMark && !this.mark.isCurrentUserRating;
    }
  },


  methods: {
    triggerRating() {
      if (!this.canRate) {
        return;
      }
      if (this.isSignedIn) {
        this.isRating = true;
      } else {
        this.displayAuthDialog = true;
      }
    },

    submitRating(rating) {
      this.isRating = false;
      axios.post("/api/rating", {
        markId: this.mark._id,
        rating: rating,
        targetUserId: this.mark.user.userId
      })
      .then(() => {
        this.userMarks 
        ? this.$store.dispatch('getUser')
        : eventBus.$emit("refresh");
      })
      .catch((err) => {
        console.log(err)
      })
    },

    toPrecision(d){
      return toPrecision(d);
    },
    
    removeRating(){
      axios.delete('/api/rating/' + this.mark._id)
        .then(() => {
          this.userMarks 
          ? this.$store.dispatch('getUser')
          : eventBus.$emit("refresh");
        })
        .catch(err => {
          console.log(err)
        })

    },

    deleteMark() {
      axios.delete('/api/mark/' + this.mark._id)
        .then(() => {
          this.userMarks 
          ? this.$store.dispatch('getUser')
          : eventBus.$emit("refresh");
          this.$emit('back');
        })
        .catch((err) => console.log(err))
    },

    formatDate(d){
      return formatDate(d)
    }
  }
}
</script>

<style scoped>
.mark-header {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 1.5rem;
}

.mark-details {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 1.5rem;
}

.ratings-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.add-comment {
  margin-top: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

.comments-section {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
}

.add-rating-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
  margin-right: 1rem
}
</style>