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

    <span class="rating-count" v-if="ratingCount === null">({{ rating }})</span>
    <span class="rating-count" v-else>{{ rating }}</span>
    <span class="rating-count" v-if="ratingCount !== null">({{ ratingCountLabel }})</span>
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

    rating: Number,

    ratingCount: {
      default: null,
      type: Number
    }
  },

  computed: {
    ratingCountLabel() {
      if (this.ratingCount === null) return "";
      if (this.ratingCount === 1) return `${this.ratingCount} rating`;
      return `${this.ratingCount} ratings`;
    }
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
  display: flex;
}

.rating-count {
  color: gray;
  margin-left: 0.5rem;
}
</style>
