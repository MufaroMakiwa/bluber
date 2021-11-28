<template>
  <nav class="navbar">
    <ProfileMenu />

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
  </nav>
</template>

<script>
import ProfileMenu from './ProfileMenu.vue';
import axios from 'axios';
import {eventBus} from '../main';

export default {
  name: "Navigator",

  components: {
    ProfileMenu
  },

  computed: {
    template() {
      return this.$store.getters.template;
    }
  },

  methods: {
    addMark() {
      this.$store.dispatch('setTemplate', 'mark');
      this.$store.dispatch('setMapState', 'marking');
      eventBus.$emit("marking");
    },

    planTrip() {
      this.$store.dispatch('setTemplate', 'plan');
      this.$store.dispatch('setMapState', 'planning');
      eventBus.$emit("planning");
    },

    getBluebikes() {
      this.$store.dispatch('setTemplate', 'locator');
      axios
            .get("/api/bluebikes")
            .then((res) => { eventBus.$emit("mark-stations",res.data)})
            .catch((err) => {
                console.log(err);
            });
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

.user-container {
  padding: 0.25rem;
  border-radius: 50%;
  cursor: pointer;
  max-width: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: white;
  transition: all 0.3s;
}

.username {
  margin-left: 1rem;
  margin-right: 0.5rem;
}

.nav-button {
  margin-left: 1rem;
}

.button-icon {
  color: black;
  margin-right: 0.75rem;
}

.button-bike-icon
{
  margin-right: 0.75rem;
  width: 30px;
  height: 30px;
  padding-bottom: 4px;
}

</style>