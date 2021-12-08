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
          <div class="control-container">
            <v-tooltip z-index="999" bottom v-if="isSignedIn && canSaveThisPlan"> 
              <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                color="gray"
                @click="displaySaveDialog=true"
                v-on="on"
                class="left-header-icon"
                v-bind="attrs">
                <font-awesome-icon icon="save" class="header-control-icon"/>
              </v-btn>
              </template>
              <span>Save</span>
            </v-tooltip>

            <v-tooltip z-index="999" bottom> 
              <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                :color="hasFilters ? 'primary' : 'gray'"
                @click="displayFilters=true"
                v-on="on"
                v-bind="attrs">
                <font-awesome-icon icon="filter" class="header-control-icon"/>
              </v-btn>
              </template>
              <span>Filter</span>
            </v-tooltip>
          </div>
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

          <NoContent :message="emptyMessage" v-else/>
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
      @back="handleBack"/>

    <SavePlanDialog 
      :display="displaySaveDialog"
      @cancel="displaySaveDialog=false"
      @save-plan="handleSavePlan"/>
  </div>
</template>

<script>
import { eventBus } from '../main';
import Filters from "./Filters.vue";
import MarkCard from "./MarkCard.vue";
import NoContent from "./NoContent.vue";
import MarkDetails from "./MarkDetails.vue";
import ViewTemplate from "./ViewTemplate.vue";
import SavePlanDialog from "./SavePlanDialog.vue";
import axios from 'axios';

export default {
  name: "MarksList",

  components: {
    Filters, MarkCard, MarkDetails, ViewTemplate, SavePlanDialog, NoContent
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
    },

    displaySaveIcon: {
      default: true,
      type: Boolean,
    },

    center: {
      default: undefined,
      type: Object
    }
  },

  beforeMount(){
    eventBus.$on("openMarkDetails",(mark) => {
      if (this.displayFilters) this.displayFilters = false;
      this.displayedMark = mark;
    }); 
  },

  data() {
    return {
      displayFilters: false,
      displaySaveDialog: false,
      displayedMark: null,  
      filters: {
        sortBy: "dateAdded",
        tags: [],
        sortOrder: "descending",
        minimumRating: 0
      },
      planSaved: false,
    }    
  },

  created() {
    eventBus.$emit("drawRoutes", {
      marks: this.filteredMarks,
      centerOnRender: false,
      center: this.center
    })
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
      const filtered = this.marks.filter(mark => {
        const aboveRatingBound = mark.rating >= this.filters.minimumRating;
        const hasFilterTags = this.filters.tags.length === 0 
                              ? true
                              : mark.tags.some(tag => this.filters.tags.includes(tag));
        return aboveRatingBound && hasFilterTags;
      })
      
      // sort the marks
      const sortDirection = this.filters.sortOrder === "descending" ? -1 : 1;
      const property = this.filters.sortBy;
      return filtered.sort((a, b) => (a[property] > b[property] ? sortDirection : -sortDirection));  
    },

    emptyMessage() {
      if (this.userMarks) {
        return this.hasFilters ? 'You do not have any marks with these filters.' : 'You have not added any marks yet.'
      } else {
        return this.hasFilters ? 'There are marks with these filters in area.' : 'There are no marks in this area.'
      }
    },

    displayAllMarks() {
      return !this.displayFilters && this.displayedMark === null;
    },

    canSaveThisPlan() {
      return this.displaySaveIcon && this.hasDisplayedMarks && !this.planSaved;
    },

    isSignedIn() {
      return this.$store.getters.isSignedIn;
    }
  }
  ,
  methods: {
    handleBack() {
      this.displayedMark = null;
      if (this.userMarks) {
        eventBus.$emit('clearPlan');

      } else {
        eventBus.$emit('drawRoutes', {
          marks: this.filteredMarks,
          centerOnRender: false,
          center: this.center
        });
      }
      
    },

    clearFilters() {
      this.filters = {
        sortBy: "dateAdded",
        tags: [],
        sortOrder: "descending",
        minimumRating: 0
      };

      if (!this.userMarks) {
        eventBus.$emit("drawRoutes", {
          marks: this.filteredMarks,
          centerOnRender: false
        });
      }
    },

    handleSavePlan(name) {
      this.displaySaveDialog = false;
      const body = {
        name: name,
        start: {
          lat: this.$store.getters.point1[1],
          lng: this.$store.getters.point1[0],
        },
        end: {
          lat: this.$store.getters.point2[1],
          lng: this.$store.getters.point2[0]
        }
      };

      axios.post('/api/saved', body)
        .then(() => {
          this.planSaved = true;
          this.$store.dispatch('getUser');
          eventBus.$emit("display-snackbar", "Plan saved successfully");
        })
        .catch(err => {
          console.log(err);
        })
    },

    handleUpdateFilters(filters) {
      this.displayFilters = false;
      this.filters = filters;

      if (!this.userMarks) {
        eventBus.$emit("drawRoutes", {
          marks: this.filteredMarks,
          centerOnRender: false
        });
      }
    },

    handleMarkClick(mark) {
      this.displayedMark = mark;
    }
  },

  watch: {
      marks: function(newMarks, oldMarks) {
        if (this.displayedMark) {
          this.displayedMark = newMarks.filter((m) => this.displayedMark._id===m._id)[0]
        }

        if (!this.userMarks && oldMarks.length !== newMarks.length) {
          eventBus.$emit("drawRoutes", {
            marks: this.filteredMarks,
            centerOnRender: false,
            center: this.center
          })
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

.header-control-icon {
  font-size: 1rem;
}

.left-header-icon {
  margin-right: 1rem
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

.control-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>