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
          @delete-mark="deleteMark"
          @remove-rating="removeRating"/>
      </div>

      <div class="mark-details">
        <MarkDescription 
          :caption="mark.caption"
          :tags="mark.tags"/>

        <div class="ratings-container">
    
          <Rating 
            :addTooltip="true"
            :rating="mark.rating" 
            :ratingCount="mark.ratingCount"
            @click.native="isRating=true"/>

          <RateMarkDialog 
            :display="isRating"
            @cancel="isRating=false"
            @submit-rating="submitRating"/>
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
import RateMarkDialog from "./RateMarkDialog.vue";
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
    Comment,
    RateMarkDialog,
  },

  props: {
    mark: Object,
  },

  data() {
    return {
      isRating: false,
    }
  },

  computed: {
    options() {
      return [
        {
          title: "Delete mark",
          icon: "trash-alt",
          event: "delete-mark"
        },

        {
          title: "Remove rating",
          icon: "star",
          event: "remove-rating"
        }
      ]
    },

    isUserRating() {
      // check if the user is already rating this mark. 
      return false;
    }
  },

  beforeMount(){  
    console.log("this is the mark",this.mark);
  },

  methods: {
    submitRating(rating) {
      this.isRating = false;
      alert('Submiting user rating');
      console.log(rating);
    },

    removeRating(){
      alert("Delete users current rating");
    },

    deleteMark() {
      console.log("Deleting mark")
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