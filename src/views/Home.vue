<template>
  <div class="app-wrapper">  
    <Map class="map"/>  
    <Navigator />   

    <div class="main-app-section shadow">
      <AddMark v-if="template === 'mark'"/>
      <PlanTrip v-if="template === 'plan'"/>
      <MarksList v-if="template === 'user-marks'" title="My Marks"/>
      <SavedPlans v-if="template === 'user-saved'"/>
      <Notifications v-if="template === 'notifications'"/>
      <Locator v-if="template === 'locator'"/>
    </div>   
  </div>
</template>

<script>

import Navigator from "../components/Navigator";
import PlanTrip from "../components/PlanTrip";
import Notifications from "../components/Notifications";
import MarksList from "../components/MarksList";
import SavedPlans from "../components/SavedPlans";
import AddMark from "../components/AddMark";
import Map from '../components/Map';
import Locator from '../components/Locator'
import { eventBus } from '../main.js';
import axios from 'axios';


export default {
  name: "App",
  components: {
    Navigator,
    Map,
    PlanTrip,
    AddMark,
    Notifications,
    MarksList,
    // UserSaved,
    Locator,
    SavedPlans
  },

  data() {
    return {
      username: "Hillary",
      showMarks:false,
      isLoggedIn: false,
      showMarker: false,
      marks: [],
    };
  },

  computed: {
    template() {
      return this.$store.getters.template;
    },
  },


  created() {
    eventBus.$on("toggle-marks", () => {
      this.showMarks = !this.showMarks;
      this.showMarker = false;
    })
    eventBus.$on("toggle-marker", () => {
      this.showMarker = !this.showMarker;
      this.showMarks = false;
    })
    eventBus.$on("signIn", () => {
      this.isLoggedIn = true;
    })
    eventBus.$on("get-marks", (params) => {
        axios.get("/api/mark",{params:params}).then((res)=>{
          console.log(res)
          let {marksInSpannedArea, radius, center } = res.data
          this.marks = marksInSpannedArea;
          eventBus.$emit("get-plan-radius",center,radius)
      }).catch((err)=>{
        console.log("this is my err",err)
      });
    })
  },

}

</script>

<style scoped>

.app-wrapper {
  width: 100%;
  height: 100%;
}

.map {
  z-index: 0;
}

.main-app-section {
  z-index: var(--overlay-z-index);
  position: absolute;
  top: 1rem;
  right: 1rem;
  bottom: 1rem;
  width: 500px;
  background-color: white;
  overflow-y: scroll;
}

</style>
