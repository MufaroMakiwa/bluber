<template>
  <div class="app-wrapper">
    <div class="">
      <div class="map">
        <Map />
      </div>
      <div class="overlay">
        <div class="nav">
          <!-- <Navigation /> -->
        </div>
        <div class="side-render">
          <div class="floating-markslist" v-if="showMarks">
            <MarksList v-bind:marks="marks" />
          </div>
          <div v-if="showMarker" class="floating-marker">
            <Marking />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import MarksList from "./components/MarksList.vue";
import Marking from "./components/Marking.vue";
// import Navigation from "./components/Navigation.vue";
import Map from './components/Map.vue';
import { eventBus } from './main.js';
import axios from 'axios';


export default {
  name: "App",
  components: {
    MarksList,
    Marking,
    // Navigation,
    Map,
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

  mounted() {
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
.nav {
  /* position: ; */

  position: absolute;
  top: 2vw;
  left: 4vw;
}
.map {
  z-index: 0;
}
.app-wrapper {
  width: 100%;
  height: 100%;
}

.overlay {
  z-index: 999;
  position: absolute;
  top: 0;
  width: 100%;
}

.floating-markslist {
  position: absolute;
  top: 2vw;
  right: 2vw;
}
</style>
