<template>
  <div class="menu-container">
    <v-menu
      top
      right
      offset-x
      :min-width="150"
      :close-on-content-click="true">
      <template v-slot:activator="{ on, attrs }">
        <button
          class="map-style-button"
          v-on="on"
          v-bind="attrs">
          <font-awesome-icon icon="layer-group"/>
        </button>      
      </template>

      <v-list class="menu-options">

        <v-list-item 
          :input-value="style === 'satellite-v9'"
          color="primary"
          @click="updateMapStyle('satellite-v9')" class="list-item">
           <v-list-item-avatar class="avatar">
            <font-awesome-icon icon="satellite" class="menu-icon"/> 
          </v-list-item-avatar>
          <v-list-item-title>Satellite view</v-list-item-title>
        </v-list-item>
        
        <v-divider></v-divider>

        <v-list-item 
          :input-value="style === 'dark-v10'"
          color="primary"
          @click="updateMapStyle('dark-v10')" class="list-item">
          <v-list-item-avatar class="avatar">
            <font-awesome-icon icon="moon" class="menu-icon"/> 
          </v-list-item-avatar>
          <v-list-item-title>Dark overlay</v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item 
          :input-value="style === 'streets-v11'"
          color="primary"
          @click="updateMapStyle('streets-v11')" class="list-item">
          <v-list-item-avatar class="avatar">
            <font-awesome-icon icon="street-view" class="menu-icon"/> 
          </v-list-item-avatar>
          <v-list-item-title>Street view</v-list-item-title>
        </v-list-item>

      </v-list>
    </v-menu>
  </div>
</template>
<script>


export default {
  name: "OptionsMenu",

  computed: {
    style() {
      return this.$store.getters.mapStyle;
    }
  },

  methods: {
    updateMapStyle(style) {
      this.$store.dispatch("setMapStyle", style);
    }
  }
}
</script>

<style scoped>
.menu-container {
  position: fixed;
  left: 10px;
  bottom: 180px;
  float: left;
}

.menu-options {
  margin: 0;
  padding: 0;
}

.list-item {
  padding-left: 0.5rem;
}

.menu-icon {
  color: gray;
}

.avatar {
  margin: 0 !important;
  padding: 0 !important;
}

.map-style-button {
  width: 30px;
  height: 30px;
  background-color: white;
  cursor: pointer;
  outline: none;
  padding: 0;
  border-radius: 4px;
  box-shadow: 0 0 0 2px rgb(0 0 0 / 10%);
}

.map-style-button:hover {
  background-color: rgb(240, 240, 240);
}
</style>