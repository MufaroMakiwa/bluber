<template>
  <div class="rating-container">
    <v-tooltip left v-if="addTooltip">
      <template v-slot:activator="{ on, attrs }">
        <div
          @click="$emit('open-rating-dialog')"
          class="rating-wrapper"
          v-on="on"
          v-bind="attrs">
          <v-rating
            class="rating"
            :value="toPrecision(rating)"
            color="yellow darken-3"
            background-color="grey darken-1"
            empty-icon="$ratingFull"
            half-increments
            :hover="hover"
            :readonly="readonly"
            half-icon="$ratingHalf"
            size="16"></v-rating>
        </div>
      </template>
      <span>Rate</span>
    </v-tooltip>

    <v-rating
      v-else
      class="rating"
      :value="toPrecision(rating)"
      color="yellow darken-3"
      background-color="grey darken-1"
      empty-icon="$ratingFull"
      half-increments
      :hover="hover"
      :readonly="readonly"
      half-icon="$ratingHalf"
      size="16"></v-rating>

    <span class="rating-count" v-if="ratingCount === null">({{ toPrecision(rating) }})</span>
    <span class="rating-count" v-else>{{ rating }}</span>
    <span class="rating-count" v-if="ratingCount !== null">({{ ratingCountLabel }})</span>
  </div>
</template>

<script>

import {toPrecision} from "../utils";


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

    rating: {
        type: Number
    },

    ratingCount: {
      default: null,
      type: Number
    },

    addTooltip: {
      default: false,
      type: Boolean
    }
  },

  computed: {
    ratingCountLabel() {
      if (this.ratingCount === null) return 0;
      if (this.ratingCount === 1) return `${this.ratingCount} rating`;
      return `${this.ratingCount} ratings`;
    }
  },

  methods:{
    toPrecision(d){
      return toPrecision(d);
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
  transition: all .3s
}

.rating-count {
  color: gray;
  margin-left: 0.5rem;
}

.rating-wrapper {
  cursor: pointer;
}

</style>
