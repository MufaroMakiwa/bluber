<template>
  <div class="app-wrapper">
    <div class="map">
      <Map />
    </div>
    <div class="overlay">
      <div class="nav">
        <!-- <Navigation /> -->
      </div>
      <div class="menu">
        <Menu />
      </div>
      <!-- <div class="floating-markslist">
        <MarksList v-bind:marks="marks" />
      </div> -->
      <!-- <div class="floating-marker"> -->
        <Marking />
      <!-- </div> -->
    </div>

  </div>
</template>

<script>
// import MarksList from "./components/MarksList.vue";
import Menu from "./components/Menu.vue";
// import Navigation from "./components/Navigation.vue"; 
import Map from "./components/Map.vue";
// import Marker from "./components/Marker.vue";
import Marking from "./components/Marking.vue";

export default {
  name: "App",
  components: {
    // MarksList,
    Menu,
    // Navigation,
    Map,
    // Marker,
    Marking
  },

  data() {
    return {
      marks: [
        {
          markId: 1,
          caption: "There is a traffic jam",
          tag: "busy",
          time: "posted 30 minutes ago",
        },
        {
          markId: 2,
          caption: "There is an accident and the road is blocked",
          tag: "blocked",
          time: "posted 1 hour ago",
        },
        {
          markId: 3,
          caption: "Something is happening here",
          tag: "not safe",
          time: "posted yesterday",
        },
        {
          markId: 4,
          caption: "There is a riot going on here",
          tag: "busy",
          time: "posted right now",
        },
      ],
    };
  },
};
</script>

<style scoped>
 .nav
 {
   /* position: ; */

   position: absolute;
    top:2vw;
    left: 4vw

 }
  .map
  {
    z-index: 0;
  }
 .app-wrapper
 {
   width: 100%;
   height: 100%;
 }
  
  .overlay
  {
    z-index: 999;
    position: absolute;
    top: 0;
    width: 100%;
  }

  .floating-markslist
  {
    position: absolute;
    top:2vw;
    right: 2vw
  }

</style>
