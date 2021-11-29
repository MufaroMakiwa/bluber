<template>
  <ViewTemplate :backButton="true" @back="$emit('back')">
    <template v-slot:heading>
      Mark
    </template>

    <template v-slot:content>
      <div class="mark-header">
        <MarkUserDetails 
          :username="mark.userId"
          :dateAdded="formatDate(mark.dateAdded)"/>

        <OptionsMenu 
          :options="options"
          @delete="deleteMark"
          @rate="rateMark"/>
      </div>

      <div class="mark-details">
        <MarkDescription 
          :caption="mark.caption"
          :tags="mark.tags"/>

        <div class="ratings-container">
          <Rating :rating="mark.rating" :ratingCount="mark.ratingCount"/>
        </div>

        <div class="add-rating" v-if="isRating">
          <span>Rate this mark</span>
          <v-rating
            class="rating"
            :v-model="rating"
            color="yellow darken-3"
            background-color="grey darken-1"
            empty-icon="$ratingFull"
            hover
            size="24"></v-rating>

          <div class="rating-buttons-container">
            <v-btn
              rounded
              outlined
              color="primary"
              small
              @click="stopRating">
              Cancel
            </v-btn>

            <v-btn
              rounded
              depressed
              color="primary"
              small
              @click="submitRating">
              Rate
            </v-btn>
          </div>
        </div>
      </div>
      <v-divider></v-divider>
      <v-divider></v-divider>

      <div class="add-comment">
        <AddComment :markId="mark._id"/>
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

    </template>
  </ViewTemplate>
</template>

<script>
import Rating from "./Rating.vue"
import ViewTemplate from "./ViewTemplate.vue";
import MarkUserDetails from "./MarkUserDetails.vue";
import MarkDescription from "./MarkDescription.vue";
import OptionsMenu from "./OptionsMenu.vue";
import AddComment from "./AddComment.vue";
import Comment from "./Comment.vue";
import { formatDate } from '../utils';


export default {
  name: "MarkDetails",

  components: {
    ViewTemplate, 
    MarkUserDetails, 
    MarkDescription, 
    Rating,
    OptionsMenu,
    AddComment,
    Comment
  },

  props: {
    mark: Object,
  },

  data() {
    return {
      isRating: true,
      rating: 0
    }
  },

  computed: {
    options() {
      return [
        {
          title: "Delete mark",
          icon: "trash-alt",
          event: "delete"
        },

        {
          title: !this.isUserRating ? "Rate this mark" : "Remove rating", // this title will depend on the computed property below
          icon: "star",
          event: "rate"
        }
      ]
    },

    isUserRating() {
      // check if the user is already rating this mark. This will determine the title 
      // above and which axios call is made in the rateMark method (delete or post)
      return true
    }
  },

  beforeMount(){  
    console.log("this is the mark",this.mark);
  },

  methods: {
    rateMark() {
      if (!this.isUserRating) {
        this.isRating = true;
      } else {
        // handle delete
      }
    },

    submitRating() {
      alert('Submiting user rating');
    },

    deleteMark() {
      console.log("Deleting mark")
    },

    formatDate(d){
      return formatDate(d)
    },
    
    stopRating() {
      this.rating = 0;
      this.isRating = false;
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

.rating {
  margin: 0;
  padding: 0;
  display: flex;
}
</style>