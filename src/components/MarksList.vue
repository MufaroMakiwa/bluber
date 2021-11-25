<template>
  <div class="outer">
    <transition name="fade">
      <div class="marks-container" v-if="!displayFilters">
        <div class="header-container">
          <div class="header-inner">
            <h2>{{ title }}</h2>
            <v-btn
              icon
              :color="hasFilters ? 'primary' : 'gray'"
              class="side-icon"
              @click="displayFilters=true">
              <font-awesome-icon icon="filter" class="filter-icon"/>
            </v-btn>
          </div>
          
          <v-btn
            v-if="hasFilters"
            rounded
            outlined
            x-small
            color="primary"
            class="clear-filter"
            @click="clearFilters">
            <font-awesome-icon icon="times" class="clear-icon"/>
            Clear Filters
          </v-btn>
        </div>
      </div>
    </transition>

    <Filters 
      v-if="displayFilters" 
      :currentFilters="filters"
      @back="displayFilters=false"
      @update-filters="handleUpdateFilters"/>
  </div>
</template>

<script>
import Filters from "./Filters.vue";


export default {
  name: "MarksList",

  components: {
    Filters
  },

  props: {
    title: String
  },

  computed: {
    hasFilters() {
      const noFilters = this.filters.sortBy === "dateAdded"
                        && this.filters.tags.length === 0
                        && this.filters.sortOrder === "descending"
                        && this.filters.minimumRating === 0
      return !noFilters;
    }
  },

  data() {
    return {
      displayFilters: false,
      marks: [],
      filteredMarks: [],
      filters: {
        sortBy: "dateAdded",
        tags: [],
        sortOrder: "descending",
        minimumRating: 0
      }
    }
  },
  
  methods: {
    clearFilters() {
      this.filters = {
        sortBy: "dateAdded",
        tags: [],
        sortOrder: "descending",
        minimumRating: 0
      }
    },

    handleUpdateFilters(filters) {
      this.displayFilters = false;
      this.filters = filters;
    }
  }
}
</script>

<style scoped>
.outer {
  width: 100%;
  height: 100%;
  overflow: scroll;
}

.marks-container {
  width: 100%;
  height: 100%;
  padding: 1rem;
  flex-direction: column;
}

.header-container {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.header-inner {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.clear-filter {
  margin-top: 0.5rem;
}

.filter-icon {
  font-size: 1.15rem;
}

.clear-icon {
  margin-right: 0.75rem;
}
</style>