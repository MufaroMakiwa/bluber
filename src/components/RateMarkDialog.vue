<template>
  <transition name="fade">
    <div
      v-if="display"
      @wheel.prevent 
      @scroll.prevent 
      @touchmove.prevent 
      class="modal">
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
            @click="$emit('submit-rating', rating)">
            Rate
          </v-btn>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "RateMarkDialog",

  props: {
    display: Boolean
  },

  data() {
    return {
      rating: 0
    }
  }
}
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
}

.add-rating {
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem;
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