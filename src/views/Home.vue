<template>
  <div class="app-wrapper">  
    <Map class="map"/>  
    <Navigator />   

    <div class="shadow main-app-section">
      <div 
        v-if="!isSignedIn && template !== 'authentication'" 
        class="sign-in-container">
        <h3>Enjoying Bluber?</h3>
        <GoogleLoginButton />
      </div>
      <div class="app-inner">
        <AddMark v-if="template === 'mark'"/>
        <PlanTrip v-if="template === 'plan'"/>
        <MarksList v-if="template === 'user-marks'" title="My Marks"/>
        <SavedPlans v-if="template === 'user-saved'"/>
        <Notifications v-if="template === 'notifications'"/>
        <Locator v-if="template === 'locator'"/>
        <Authentication v-if="template === 'authentication'"/>
      </div>
    </div>   
  </div>
</template>

<script>

import Navigator from "../components/Navigator";
import PlanTrip from "../components/PlanTrip";
import Notifications from "../components/Notifications";
import MarksList from "../components/MarksList";
import SavedPlans from "../components/SavedPlans";
import Authentication from "../components/Authentication";
import AddMark from "../components/AddMark";
import Map from '../components/Map';
import Locator from '../components/Locator'
import { eventBus } from '../main.js';
import GoogleLoginButton from "../components/GoogleLoginButton";


export default {
  name: "App",
  components: {
    Navigator,
    Map,
    PlanTrip,
    AddMark,
    Notifications,
    MarksList,
    Authentication,
    Locator,
    SavedPlans,
    GoogleLoginButton,
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

    isSignedIn() {
      return this.$store.getters.isSignedIn;
    }
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
    // eventBus.$on("get-marks", (params) => {
    //     axios.get("/api/mark",{params:params}).then((res)=>{
    //       console.log(res)
    //       let {marksInSpannedArea, radius, center } = res.data
    //       this.marks = marksInSpannedArea;
    //       eventBus.$emit("get-plan-radius",center,radius)
    //   }).catch((err)=>{
    //     console.log("this is my err",err)
    //   });
    // })
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
  overflow: hidden;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border: none;
}

.app-inner {
  width: 100%;
  flex-grow: 1;
  overflow: scroll;
  position: relative;
}

.sign-in-container {
  width: 100%;
  padding: 0.5rem;
  padding-left: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #d7e6e9;
}

.sign-in-container h3 {
  color: #137d8d;
}

</style>
