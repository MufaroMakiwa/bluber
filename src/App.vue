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

    <div class="floating-box">
      <MarksList v-bind:marks="marks"/>
    </div> 
    
  </div> 

</template>

<script>

import MarksList from './components/MarksList.vue';
import Menu from "./components/Menu.vue";
import Navigation from "./components/Navigation.vue";
import Map from './components/Map.vue';

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
      marks: [
         {markId: 1, caption: "There is a traffic jam", tag:"busy", time:"posted 30 minutes ago"},
         {markId: 2, caption: "There is an accident and the road is blocked", tag:"blocked", time:"posted 1 hour ago"},
         {markId: 3, caption: "Something is happening here", tag:"not safe", time:"posted yesterday"},
         {markId: 4, caption: "There is a riot going on here", tag:"busy", time:"posted right now"},
      ]
    };
  }

}

</script>

<style scoped>


</style>
