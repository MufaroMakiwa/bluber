<template>
  <ViewTemplate :backButton="true" @back="$emit('back')">
    <template v-slot:heading>
      Filters
    </template>

    <template v-slot:content>
      <div class="filter-container sort-by">
        <h3>Sort by</h3>
        <v-btn 
          v-for="sort in sortBy"
          :outlined="sort !== selectedSortBy"
          depressed
          color="secondary"
          class="padded"
          :key="sort"
          @click="updateSortBy(sort)">
          {{ sort }}
        </v-btn> 
      </div>
      <v-divider></v-divider>

      <div class="filter-container sort-order">
        <h3>Sort order</h3>
        <v-btn 
          v-for="order in sortOrder"
          :outlined="order !== selectedSortOrder"
          depressed
          color="secondary"
          class="padded"
          :key="order"
          @click="updateSortOrder(order)">
          {{ order }}
        </v-btn>  
      </div>
      <v-divider></v-divider>

      <div class="filter-container tags">
        <h3>Tags</h3>
        <v-btn
          v-for="tag in tags"
          :key="tag"
          depressed
          :outlined="!filterTags.includes(tag)"
          color="secondary"
          class="padded"
          @click="addFilterTag(tag)">
          {{ tag }}
        </v-btn>
      </div>
      <v-divider></v-divider>

      <div class="filter-container rating">
        <h3>Minimum rating</h3>
      
        <v-btn 
          v-for="rating in ratings"
          fab
          :input-value="minimumRating === rating"
          :outlined="minimumRating !== rating"
          depressed
          small
          color="secondary"
          class="padded"
          :key="rating"
          @click="updateRating(rating)">
          {{ rating }}
        </v-btn>  
      </div>
      <v-divider></v-divider>

      <div class="filter-actions">
        <v-btn
          rounded
          depressed
          outlined
          class="action-button left"
          color="primary"
          @click="$emit('back')">
          Cancel
        </v-btn>

        <v-btn
          rounded
          depressed
          class="action-button right"
          @click="applyFilters"
          color="primary">
          Apply
        </v-btn>
      </div>
    </template>
  </ViewTemplate>
</template>

<script>
import ViewTemplate from "./ViewTemplate.vue";

export default {
  name: "Filters",

  components: {
    ViewTemplate
  },

  props: {
    currentFilters: Object
  },

  data() {
    return {
      sortBy: ["Date Added", "Rating"],
      selectedSortBy: this.getInitialSortBy(),
      sortOrder: ["Ascending", "Descending"],
      selectedSortOrder: this.getInitialSortOrder(),
      tags: ["Blocked", "Not Safe", "Busy"],
      filterTags: [...this.currentFilters.tags],
      ratings: [1, 2, 3, 4, 5],
      minimumRating: this.currentFilters.minimumRating,
    }
  },

  methods: {
    getInitialSortBy() {
      return this.currentFilters.sortBy === "rating" ? "Rating" : "Date Added";
    },

    getInitialSortOrder() {
      return this.currentFilters.sortOrder === "descending" ? "Descending" : "Ascending";

    },

    applyFilters() {
      const filters = {};
      filters.sortBy = this.selectedSortBy === "Rating" ? "rating" : "dateAdded";
      filters.sortOrder = this.selectedSortOrder.toLowerCase();
      filters.tags = this.filterTags;
      filters.minimumRating = this.minimumRating;
      this.$emit('update-filters', filters);
    },

    updateRating(rating) {
      if (this.minimumRating === rating) {
        this.minimumRating = 0;
      } else {
        this.minimumRating = rating;
      }
    },

    addFilterTag(tag) {
      const tagIndex = this.filterTags.indexOf(tag);
      tagIndex > -1 ? this.filterTags.splice(tagIndex, 1) : this.filterTags.push(tag);    
    },

    updateSortOrder(order) {
      this.selectedSortOrder = order;
    },

    updateSortBy(sort) {
      this.selectedSortBy = sort;
    }
  }
}
</script>

<style scoped>
.action-button.left {
  margin-right: 0.5rem;
}

.action-button.right {
  margin-left: 0.5rem;
}

.filter-container {
  margin-top: 1rem;
  padding-bottom: 2rem;
}

.filter-container .padded {
  margin-right: 1rem;
  margin-top: 1rem;
}


.filter-actions {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

.action-button {
  flex-grow: 1;
}
</style>