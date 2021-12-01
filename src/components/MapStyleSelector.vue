<template>
  <div class="menu-container">
    <v-menu
      top
      right
      offset-x
      :min-width="150"
      :close-on-content-click="true">
      <template v-slot:activator="{ on: menu, attrs }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn
              color="white"
              rounded
              v-on="{ ...tooltip, ...menu }"
              v-bind="attrs">
              <font-awesome-icon icon="layer-group"/>
            </v-btn>
          </template>
          <span>Map style</span>
        </v-tooltip>
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
  position: relative;
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
</style>