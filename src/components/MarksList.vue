<template>
  <div class="outer">
    <transition name="fade">
      <ViewTemplate 
        v-if="displayAllMarks" 
        :backButton="requiresBackButton"
        @back="$emit('back')">
        <template v-slot:heading>
          {{ title }}
        </template>

        <template v-slot:header-control>
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              :color="hasFilters ? 'primary' : 'gray'"
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
          <div class="marks" v-if="hasDisplayedMarks" >
          <MarkCard 
            v-for="mark in filteredMarks"
            :key="mark.mark_id"
            :mark="mark" 
            @click.native="handleMarkClick(mark)"/>
          </div>

          <div class="no-marks-container" v-else>
            <span class="no-marks">{{ emptyMessage }}</span>
          </div>
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
      :userMarks="userMarks"
      @back="displayedMark=null"/>
  </div>
</template>

<script>
import { eventBus } from '../main';
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
    title: String,
    marks: Array,
    requiresBackButton: {
      default: false,
      type: Boolean,
    },
    userMarks: {
      default: false,
      type: Boolean,
    }
  },
  beforeMount(){
    eventBus.$on("openMarkDetails",(mark)=>{
      this.displayedMark = mark;
    });
  }
  ,
  data() {
    return {
      displayFilters: false,
      displayedMark: null,  
      filters: {
        sortBy: "dateAdded",
        tags: [],
        sortOrder: "descending",
        minimumRating: 0
      },
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

    filteredMarks() {
      return this.filter();
    },

    emptyMessage() {
      return this.hasFilters ? 'There are marks with these filters in area.' : 'There are no marks in this area.'
    },

    displayAllMarks() {
      return !this.displayFilters && this.displayedMark === null;
    }
  }
  ,
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
    },

    filter() {
      const filtered = this.marks.filter(mark => {
        const aboveRatingBound = mark.rating >= this.filters.minimumRating;
        const hasFilterTags = this.filters.tags.length === 0 
                              ? true
                              : mark.tags.some(tag => this.filters.tags.includes(tag));
        return aboveRatingBound && hasFilterTags;
      })
      return filtered;
    }
  },

  watch: {
      marks: function(newMarks){
        if (this.displayedMark){
          this.displayedMark = newMarks.filter((m)=>(this.displayedMark._id===m._id))[0]
        }
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

.no-marks-container {
  display: flex;
  margin-top: 1.5rem;
  width: 100%;
}

.no-marks {
  font-weight: bold;
  color: gray;
}
</style>