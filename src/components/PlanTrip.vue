<template>
  <div class="outer">
    <transition name="fade">
      <Search mode="plan" v-if="!displayPlan">
        <template v-slot:heading>
          Where are you going?
        </template>
        <template v-slot:content>
          <div class="search-results">
            <div
              v-for="result in results"
              v-bind:key="result.id"
              class="result-item"
              v-on:click="navigateTo(result)"
            >
              <span class="place-text">{{ result.text }}</span>
              <span class="place-name">{{ result.place_name }}</span>
            </div>
          </div>
        </template>
        <template v-slot:submit>
          <v-btn
            depressed
            rounded
            color="primary"
            class="submit-button font-weight-bold"
            @click="handleSubmit"> 
            Plan Trip
          </v-btn>
        </template>
      </Search>
    </transition>

    <MarksList 
      title="Marks in area"
      :marks="marks"
      @back="hidePlan"
      v-if="displayPlan"
      :requiresBackButton="true"/>
  </div>
</template>

<script>
import Search from "./Search.vue";
import MarksList from "./MarksList.vue";
import {eventBus} from "../main";
import axios from 'axios';

export default {
  name: "PlanTrip",

  components: {
    Search, MarksList,
  },

  data() {
    return {
      displayPlan: false,
      type: "start",
      results : [],
      marks : [],
    }
  },
  beforeCreate(){
    eventBus.$on("searchResult", (results, type) => {
      this.type = type;
      this.results = results;
    });

    eventBus.$on("input", (text) => {
      if (text.length === 0) {
        this.results = [];
      }
    });

    eventBus.$on("refresh",()=>{
      let params = {
        startLat: this.$store.getters.point1[1] ,
        startLng: this.$store.getters.point1[0] ,
        endLat: this.$store.getters.point2[1] , 
        endLng: this.$store.getters.point2[0],
      }

        axios.get("/api/mark",{params:params}).then((res)=>{
          let {marksInSpannedArea, radius, center } = res.data          
          this.marks = marksInSpannedArea;
          // eventBus.$emit("drawRoutes",this.marks)
          eventBus.$emit("drawCircle",center,radius);
      }).catch((err)=>{
        console.log("this is my err",err)
      });
    })

  },
  
  beforeDestroy(){
      eventBus.$off("searchResult");
      eventBus.$off("input");
      eventBus.$off("refresh");
      eventBus.$emit("clearPlan");
  }
  ,
  methods: {
    handleSubmit() {
      this.displayPlan = true;
      let params = {
        startLat: this.$store.getters.point1[1] ,
        startLng: this.$store.getters.point1[0] ,
        endLat: this.$store.getters.point2[1] , 
        endLng: this.$store.getters.point2[0],
      }

      axios.get("/api/mark",{params:params}).then((res)=>{
        let {marksInSpannedArea, radius, center } = res.data
        this.marks = marksInSpannedArea;
        eventBus.$emit("drawRoutes",this.marks)
        console.log(radius,center)
        // eventBus.$emit("draw-plan-radius",center,radius)
      }).catch((err)=>{
        console.log("this is my err",err)
      });
    },

    hidePlan() {
      this.displayPlan = false;
      this.results = [];
    } 
    ,
    navigateTo(suggestion) {

      if (this.type === "start") {
        eventBus.$emit("navigateToStart", suggestion.center);
        eventBus.$emit("setStartInput",suggestion.place_name);
      } else {
        eventBus.$emit("navigateToEnd", suggestion.center);
        eventBus.$emit("setEndInput",suggestion.place_name);
      }
    },
  }
}
</script>

<style scoped>
.outer {
  width: 100%;
  height: 100%;
}


.search-results {
  width: 100%;
  margin-top: 16px;
}

.result-item {
  display: flex;
  flex-direction: column;
  padding: 8px;
  margin: 8px 0;
  width: 100%;
  cursor: pointer;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
    rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  border-radius: 3px;
}
.result-item:hover {
  background-color: #74adb6;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  transform: scale(1.01);
}

.result-item:hover .place-text {
  color: #ffea00;
}
.result-item:hover .place-name {
  color: #fff;
}

.place-text {
  color: #74adb6;
  font-weight: bold;
  font-size: 18px;
}

.place-name {
  font-weight: bold;
  font-size: 14px;
}

</style>