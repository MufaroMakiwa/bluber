<template>
  <ViewTemplate :backButton="true" @back="$emit('back')">
    <template v-slot:heading>
      Mark
    </template>

    <template v-slot:content>
      <div class="mark-header">
        <MarkUserDetails 
          :username="mark.username"
          :dateAdded="mark.dateAdded"/>

        <MarkOptionsMenu 
          @edit="editMark"
          @delete="deleteMark"/>
      </div>

      <div class="mark-details">
        <MarkDescription 
          :caption="mark.caption"
          :tags="mark.tags"/>

        <div class="ratings-container">
          <Rating :rating="mark.rating" :ratingCount="mark.ratingCount"/>
        </div>
      </div>
      <v-divider></v-divider>
      <v-divider></v-divider>

      <div class="add-comment">
        <AddComment />
      </div>
      <v-divider></v-divider>
      <v-divider></v-divider>

      <div class="comments-section">
        <Comment 
          v-for="(comment, index) in comments" 
          :key="index"
          :comment="comment"
          :isLast="index === comments.length - 1"
          :isReply="false"/>
      </div>

    </template>
  </ViewTemplate>
</template>

<script>
import Rating from "./Rating.vue"
import ViewTemplate from "./ViewTemplate.vue";
import MarkUserDetails from "./MarkUserDetails.vue";
import MarkDescription from "./MarkDescription.vue";
import MarkOptionsMenu from "./MarkOptionsMenu.vue";
import AddComment from "./AddComment.vue";
import Comment from "./Comment.vue";


export default {
  name: "MarkDetails",

  components: {
    ViewTemplate, 
    MarkUserDetails, 
    MarkDescription, 
    Rating,
    MarkOptionsMenu,
    AddComment,
    Comment
  },

  props: {
    mark: Object,
  },

  data() {
    return {
      comments: [
        {
          username: "Mufaro Makiwa",
          dateAdded: "Today at 5.42PM",
          content: "I think this place is now okay",
          replies: [
            {
              username: "Hophin Kibona",
              dateAdded: "Today at 6.42PM",
              content: "I will update after I pass by again"
            },
            
            {
              username: "Jianna Liu",
              dateAdded: "Today at 7.20PM",
              content: "This is missleading, I just gave you a low rating"
            }
          ]
        },

        {
          username: "Hillary Tamirepi",
          dateAdded: "Yesterday at 6.02PM",
          content: "I came across this place and I think it is fine now",
          replies: [
            {
              username: "Jianna Liu",
              dateAdded: "Today at 7.20PM",
              content: "This is disgusting"
            }
          ]
        },

        {
          username: "Hophin Kibona",
          dateAdded: "Tuesday at 6.02PM",
          content: "Please update this now",
          replies: []
        }
      ]
    }
  },

  methods: {
    editMark() {
      console.log("Editing mark");
    },

    deleteMark() {
      console.log("Deleting mark")
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
</style>