<template>
  <div class="outer">
    <transition name="fade">
      <div class="marks-container" v-if="!displayFilters">
        <div class="header-container">
          <div class="header-inner">
            <h2>{{ title }}</h2>
            <v-tooltip left>
               <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  :color="hasFilters ? 'primary' : 'gray'"
                  class="side-icon"
                  @click="displayFilters=true"
                  v-on="on"
                  v-bind="attrs">
                  <font-awesome-icon icon="filter" class="filter-icon"/>
                </v-btn>
               </template>
               <span>Filter</span>
            </v-tooltip>
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

        <div class="marks">
          <MarkCard 
            v-for="mark in marks"
            :key="mark.markId"
            :mark="mark" 
            @click.native="handleMarkClick(mark)"/>
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
import MarkCard from "./MarkCard.vue";

export default {
  name: "MarksList",

  components: {
    Filters, MarkCard
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
      marks: [
        { 
          markId: 0,
          username: "Mufaro Makiwa",
          dateAdded: "Nov 8",
          comments: 2,
          rating: 2.1,
          caption: "I hate this place because I cannot navigate well",
          tags: ["Blocked"]
        },

        {
          markId: 1,
          username: "Hillary Tamirepi",
          dateAdded: "Dec 1",
          comments: 17,
          rating: 4,
          caption: "I do not know why this has not been fixed yet",
          tags: ["Busy", "Not Safe"]
        }
      ],
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
    },

    handleMarkClick(mark) {
      alert(`Clicking ${mark.toString()}`);
    }
  }
}
</script>

<style scoped>
.outer {
  width: 100%;
  height: 100%;
}

.marks-container {
  width: 100%;
  height: 100%;
  padding: 1rem;
  flex-direction: column;
  display: flex;
  overflow: scroll;
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

.marks {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-top: 2rem;
}
</style>