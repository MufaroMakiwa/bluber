<template>
  <div>
    <DemoDialog 
      v-if="!hasViewedDemo"
      :dialog="true" 
      action="rate this mark"
      @close-auth-dialog="displayAuthDialog=false"/>

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
        <UserMarks v-if="template === 'user-marks'" />
        <SavedPlans v-if="template === 'user-saved'"/>
        <Notifications v-if="template === 'notifications'"/>
        <Locator v-if="template === 'locator'"/>
        <Authentication v-if="template === 'authentication'"/>
      </div>
      </div>
    </div>

    <v-snackbar
      v-model="snackbar"
      color="primary"
      :timeout="timeout">
      {{ snackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          icon
          v-bind="attrs"
          @click="snackbar = false">
          <font-awesome-icon icon="times"/>
        </v-btn>
      </template>
    </v-snackbar>  
  </div>
</template>

<script>

import Navigator from "../components/Navigator";
import PlanTrip from "../components/PlanTrip";
import Notifications from "../components/Notifications";
import UserMarks from "../components/UserMarks";
import SavedPlans from "../components/SavedPlans";
import Authentication from "../components/Authentication";
import AddMark from "../components/AddMark";
import Map from '../components/Map';
import Locator from '../components/Locator'
import { eventBus } from '../main.js';
import GoogleLoginButton from "../components/GoogleLoginButton";
import axios from "axios";
import DemoDialog from "../components/DemoDialog.vue";


export default {
  name: "App",
  components: {
    Navigator,
    Map,
    PlanTrip,
    AddMark,
    Notifications,
    UserMarks,
    Authentication,
    Locator,
    SavedPlans,
    GoogleLoginButton,
    DemoDialog
  },

  props: {
    dialog: {
      default: false,
      type: Boolean
    },
  },

  data() {
    return {
      showMarks:false,
      isLoggedIn: false,
      showMarker: false,
      snackbar: false,
      snackbarText: '',
      timeout: 5000,
    };
  },

  computed: {
    template() {
      return this.$store.getters.template;
    },

    isSignedIn() {
      return this.$store.getters.isSignedIn;
    },

    hasViewedDemo() {
      if (this.$store.getters.user) {
        return this.$store.getters.user.viewedDemo;
      }
      return true;
    },
  },

  methods: {
    closeDialog() {
      this.$emit('close-auth-dialog')
    },
    snackbarHandler(text) {
      this.snackbarText = text;
      this.snackbar = true;
    },
    markPlayed() {
      let body = {
          userId: this.$store.getters.user.userId,
      }
      axios.patch("/api/user", body)
        .then(() => {
          this.$store.dispatch("setViewedDemo", true);
        }).catch((err) => console.log(err));
      // this.$store.dispatch("setViewedDemo", true)
    }
  },


  created() {
    eventBus.$on('display-snackbar', this.snackbarHandler);

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

.authentication-container {
  width: 100%;
  height: 100%;
  padding: 1.25rem;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: white;
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

.place-text {
  color: #74adb6;
  font-weight: bold;
  font-size: 18px;
}

.video-player-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
