<template>
  <div class="outer">
    <transition name="fade">
      <ViewTemplate v-if="displayAllMarks">
        <template v-slot:heading>
          {{ title }}
        </template>

        <template v-slot:header-control>
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
        </template>

        <template v-slot:header-second-row>
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
        </template>

        <template v-slot:content>
          <div class="marks" v-if="hasDisplayedMarks">
          <MarkCard 
            v-for="mark in filteredMarks"
            :key="mark.markId"
            :mark="mark" 
            @click.native="handleMarkClick(mark)"/>
          </div>

          <span v-else class="no-marks">{{ emptyMessage }}</span>
        </template>
      </ViewTemplate>
    </transition>

    <Filters 
      v-if="displayFilters" 
      :currentFilters="filters"
      @back="displayFilters=false"
      @update-filters="handleUpdateFilters"/>

    <MarkDetails 
      v-if="displayedMark !== null"
      :mark="displayedMark"
      @back="displayedMark=null"/>
  </div>
</template>

<script>
import Filters from "./Filters.vue";
import MarkCard from "./MarkCard.vue";
import MarkDetails from "./MarkDetails.vue";
import ViewTemplate from "./ViewTemplate.vue";

export default {
  name: "MarksList",

  components: {
    Filters, MarkCard, MarkDetails, ViewTemplate
  },

  props: {
    title: String
  },

  data() {
    const dummyMarks = [
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
    ];
    
    return {
      displayFilters: false,
      displayedMark: null,   
      marks: [...dummyMarks],
      filteredMarks: [...dummyMarks],
      filters: {
        sortBy: "dateAdded",
        tags: [],
        sortOrder: "descending",
        minimumRating: 0
      }
    }    
  },

  computed: {
    hasFilters() {
      const noFilters = this.filters.sortBy === "dateAdded"
                        && this.filters.tags.length === 0
                        && this.filters.sortOrder === "descending"
                        && this.filters.minimumRating === 0
      return !noFilters;
    },

    hasDisplayedMarks() {
      return this.filteredMarks.length > 0;
    },

    emptyMessage() {
      return this.hasFilters ? 'There are marks with these filters in area.' : 'There are no marks in this area.'
    },

    displayAllMarks() {
      return !this.displayFilters && this.displayedMark === null;
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
      this.displayedMark = mark;
    }
  }
}
</script>

<style scoped>
.outer {
  width: 100%;
  height: 100%;
}

.clear-filter {
  margin-top: 0.5rem;
}

.filter-icon {
  font-size: 1rem;
}

.clear-icon {
  margin-right: 0.75rem;
}

.marks {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-top: 1.5rem;
}

.no-marks {
  margin-top: 1rem;
  font-weight: bold;
  color: gray;
}
</style>