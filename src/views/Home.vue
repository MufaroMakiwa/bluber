<template>
  <div class="app-wrapper">  
    <Map class="map"/>  
    <Navigator class="overlay"/>     
    <Search class="overlay"/>
  </div>
</template>

<script>

import Navigator from "../components/Navigator";
import Search from "../components/Search";
import Map from '../components/Map';
import { eventBus } from '../main.js';
import axios from 'axios';


export default {
  name: "App",
  components: {
    Navigator,
    Map,
    Search
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

.app-wrapper {
  width: 100%;
  height: 100%;
}

.map {
  z-index: 0;
}

.overlay {
  z-index: var(--overlay-z-index);
  position: absolute;
}

.floating-markslist {
  position: absolute;
  top: 2vw;
  right: 2vw;
}
</style>
