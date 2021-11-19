<template>

  <div>
    <div>
      <Map /> 
    </div>

    <div>
      <Navigation/>
    </div>

    <div class="menu"> 
      <Menu />  
    </div>

    <div class="floating-box" v-if="showMarks">
      <MarksList v-bind:marks="marks"/>
    </div> 
    
  </div> 

</template>

<script>

import MarksList from './components/MarksList.vue';
import Menu from "./components/Menu.vue";
import Navigation from "./components/Navigation.vue";
import Map from './components/Map.vue';
import { eventBus } from './main.js';

export default {
  name: "App",
  components: {
    MarksList,
    Menu,
    Navigation,
    Map
  },

  data() {
    return {
      username: "Hillary",
      marks: [
         {markId: 1, caption: "There is a traffic jam", tag:"busy", time:"posted 30 minutes ago", username:"Mufaro"},
         {markId: 2, caption: "There is an accident and the road is blocked", tag:"blocked", time:"posted 1 hour ago", username:"Hillary"},
         {markId: 3, caption: "Something is happening here", tag:"not safe", time:"posted yesterday", username:"Hillary"},
         {markId: 4, caption: "There is a riot going on here", tag:"busy", time:"posted right now", username:"Hillary"},
      ],
      showMarks:false
    };
  },

  mounted() {
    eventBus.$on("toggle-marks", () => {
      this.showMarks = !this.showMarks;
    })
  },

}

</script>

<style scoped>


</style>
