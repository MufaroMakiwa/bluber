<template>
  <div class="app-wrapper">  
    <Map class="map"/>  
    <Navigator @display-about="handleDisplayAbout"/>   

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

    <SignoutDialog ref="confirm"/>

    <About 
      @close-about="handleCloseAbout"
      :dialog="displayAbout"/>
  </div>
</template>

<script>

import Navigator from "../components/Navigator";
import PlanTrip from "../components/PlanTrip";
import Notifications from "../components/Notifications";
import UserMarks from "../components/UserMarks";
import SavedPlans from "../components/SavedPlans";
import Authentication from "../components/Authentication";
import SignoutDialog from "../components/SignoutDialog";
import AddMark from "../components/AddMark";
import Map from '../components/Map';
import Locator from '../components/Locator'
import { eventBus } from '../main.js';
import GoogleLoginButton from "../components/GoogleLoginButton";
import About from "../components/About";
import axios from 'axios';


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
    SignoutDialog,
    About
  },

  data() {
    return {
      snackbar: false,
      snackbarText: '',
      timeout: 5000,
      displayAbout: false
    };
  },

  computed: {
    template() {
      return this.$store.getters.template;
    },

    isSignedIn() {
      return this.$store.getters.isSignedIn;
    },
  },

  methods: {
    snackbarHandler(text) {
      this.snackbarText = text;
      this.snackbar = true;
    },

    handleCloseAbout(){
      this.displayAbout = false;
    },

    handleDisplayAbout() {
      this.displayAbout = true;
    }
  },


  mounted() {
    eventBus.$on('display-snackbar', this.snackbarHandler);

    eventBus.$on("sign-out", async () => {
      if (!await this.$refs.confirm.open()) {
        return;
      }

      axios.delete('/api/user/session')
        .then(() => {
          this.$store.dispatch('setUser', null);
          this.$store.dispatch('setTemplate', 'authentication');
        })
        .catch(error => {
          console.log(error);
        })

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
