<template>
  <div class="rating-container">
    <v-rating
      class="rating"
      :value="rating"
      color="yellow darken-3"
      background-color="grey darken-1"
      empty-icon="$ratingFull"
      half-increments
      :hover="hover"
      :readonly="readonly"
      half-icon="$ratingHalf"
      size="16"></v-rating>

    <span class="rating-count">({{ rating }})</span>
  </div>
</template>

<script>
export default {
  name: "Rating",

  props: {
    hover: {
      default: false,
      type: Boolean
    },

    readonly: {
      default: true,
      type: Boolean
    },

    rating: Number
  }
}
</script>


<style scoped>
.rating-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.rating {
  margin: 0;
  padding: 0;
}

.rating-count {
  color: gray;
  margin-left: 0.5rem;
}
</style>
