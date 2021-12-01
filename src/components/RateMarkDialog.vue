<template>
  <PageModalTemplate
    :display="display">
    <div class="add-rating">
      <h3 class="rate-title">Rate this mark</h3>
      <v-divider></v-divider>
      <v-rating
        class="rating"
        v-model="rating"
        color="yellow darken-3"
        background-color="grey darken-1"
        empty-icon="$ratingFull"
        hover
        size="28"></v-rating>


      <div class="rating-buttons-container">
        <v-btn
          rounded
          outlined
          color="primary"
          small
          class="rating-button"
          @click="$emit('cancel')">
          Cancel
        </v-btn>

        <v-btn
          rounded
          depressed
          color="primary"
          small
          class="rating-button"
          @click="submit">
          Rate
        </v-btn>
      </div>
    </div>
  </PageModalTemplate>
</template>

<script>
import PageModalTemplate from "./PageModalTemplate.vue";

export default {
  name: "RateMarkDialog",

  components: {
    PageModalTemplate
  },

  props: {
    display: Boolean
  },

  data() {
    return {
      rating: 0
    }
  },

  methods: {
    submit() {
      this.$emit('submit-rating', this.rating);
      this.rating = 0;
    }
  }
}
</script>

<style scoped>
.add-rating {
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 1.25rem;
  background-color: white;
  border-radius: 8px;
}

.add-rating > hr {
  width: 100%;
}

.rating {
  margin: 1rem 0;
  padding: 0;
  display: flex;
}

.rate-title {
  padding-bottom: 0.5rem;
}

.rating-buttons-container {
  width: 100%;
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.rating-button {
  flex-grow: 1;
}

.rating-button:first-of-type {
  margin-right: 0.5rem;
}


.rating-button:last-of-type {
  margin-left: 0.5rem;
}
</style>