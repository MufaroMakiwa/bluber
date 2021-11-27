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

      <div class="comments-section">
        <AddComment />
      </div>
      <v-divider></v-divider>
      <v-divider></v-divider>
      
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


export default {
  name: "MarkDetails",

  components: {
    ViewTemplate, 
    MarkUserDetails, 
    MarkDescription, 
    Rating,
    MarkOptionsMenu,
    AddComment,
  },

  props: {
    mark: Object,
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

.comments-section {
  margin-top: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
</style>