<template>
  <nav class="navbar">
    <ProfileMenu />

    <v-btn 
      rounded
      class="nav-button" 
      color="white"
      @click="planTrip">
      <font-awesome-icon icon="map-marked" class="button-icon"/>
      Plan Trip
    </v-btn>

    <v-btn 
      rounded
      class="nav-button" 
      color="white"
      @click="addMark">
      <font-awesome-icon icon="plus" class="button-icon"/>
      Add Mark
    </v-btn>
  </nav>
</template>

<script>
import ProfileMenu from './ProfileMenu.vue';

export default {
  name: "Navigator",

  components: {
    ProfileMenu
  },

  methods: {
    toggleUserOptions() {
      alert("Toggle user menu");
    },

    addMark() {
      alert("Toggle add marks");
    },

    planTrip() {
      alert("Toggle planning trip");
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

</style>