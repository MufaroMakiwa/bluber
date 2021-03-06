<template>
  <nav class="navbar">
    <ProfileMenu class="profile" v-if="isSignedIn"/>

    <v-btn 
      rounded
      class="nav-button" 
      :color="template === 'plan' ? 'secondary' : 'white'"
      @click="planTrip">
      <font-awesome-icon icon="map-marked" class="button-icon"/>
      Plan Trip
    </v-btn>

    <v-btn 
      rounded
      class="nav-button" 
      :color="template === 'mark' ? 'secondary' : 'white'"
      @click="addMark">
      <font-awesome-icon icon="plus" class="button-icon"/>
      Add Mark
    </v-btn>
    
    <v-btn 
      rounded
      class="nav-button" 
      :color="template === 'locator' ? 'secondary' : 'white'"
      @click="getBluebikes">
      <img class="button-bike-icon" alt="" src="https://img.icons8.com/external-wanicon-lineal-color-wanicon/64/000000/external-bike-healthy-wanicon-lineal-color-wanicon.png">
      Bluebikes
    </v-btn>

    <v-tooltip right>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="nav-button"
          rounded
          color="white"
          v-on="on"
          v-bind="attrs"
          @click="displayAbout">
          <font-awesome-icon icon="info"/>
        </v-btn>
      </template>
      <span>Help</span>
    </v-tooltip>

    <AuthenticationDialog 
      :dialog="displayAuthDialog" 
      action="add a mark"
      @close-auth-dialog="displayAuthDialog=false"
      redirect="mark"/>
  </nav>
</template>

<script>
import ProfileMenu from './ProfileMenu.vue';
import axios from 'axios';
import {eventBus} from '../main';
import AuthenticationDialog from "./AuthenticationDialog.vue";


export default {
  name: "Navigator",

  components: {
    ProfileMenu, AuthenticationDialog
  },

  computed: {
    template() {
      return this.$store.getters.template;
    },

    isSignedIn() {
      return this.$store.getters.isSignedIn;
    },

    mapStyle() {
      return this.$store.getters.mapStyle;
    }
  },

  data() {
    return {
      displayAuthDialog: false,
      bikeStations: []
    }
  },

  watch: {
    template: function() {
      if (this.template !== "locator") this.bikeStations = [];
    },

    mapStyle: function() {
      if (this.template === "locator") {
         eventBus.$emit("clearLocator");
        eventBus.$emit("mark-stations", this.bikeStations);
      }
    }
  },

  methods: {
    addMark() {
      if (!this.isSignedIn) {
        this.displayAuthDialog = true;
        return;
      }
      this.$store.dispatch('setTemplate', 'mark');
      eventBus.$emit("disable-adding-marks", false);
      eventBus.$emit("marking");
    },

    planTrip() {
      this.$store.dispatch('setTemplate', 'plan');
      eventBus.$emit("disable-adding-marks", false);
      eventBus.$emit("planning");
    },

    getBluebikes() {
      this.$store.dispatch('setTemplate', 'locator');
      axios
        .get("/api/bluebikes")
        .then((res) => { 
          this.bikeStations = res.data;
          eventBus.$emit("mark-stations", this.bikeStations);
        })
        .catch((err) => {
            console.log(err);
        });
    },

    displayAbout() {
      this.$emit('display-about');
    }

    }
  }
</script>

<style scoped>
.navbar {
  position: absolute;
  z-index: var(--overlay-z-index);
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.padded {
  margin-left: 1rem;
}

.profile {
  margin-right: 1rem;
}

.nav-button {
  margin-left: 1rem;
}

.nav-button:first-of-type {
  margin-left: 0;
}

.button-icon {
  color: black;
  margin-right: 0.75rem;
}

.button-bike-icon {
  margin-right: 0.75rem;
  width: 25px;
  height: 25px;
  padding-bottom: 4px;
}

</style>