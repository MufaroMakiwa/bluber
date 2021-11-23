<template>
  <nav class="navbar">
    <div class="user-container shadow" @click="toggleUserOptions">
      <font-awesome-icon icon="user-circle" class="user-icon"/>
    </div>

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
export default {
  name: "Navigator",

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

.user-icon {
  font-size: 2.5rem;
  color: gray;
}

.nav-button {
  margin-left: 1rem;
  padding: 0 1rem;
  text-align: center;
  transition: all 0.3s;
}

.button-icon {
  color: black;
  margin-right: 0.75rem;
}

.nav-button:hover, 
.user-container:hover {
  background-color: var(--button-color-hover);
}
</style>