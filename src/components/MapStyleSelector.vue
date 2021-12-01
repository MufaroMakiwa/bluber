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
          @click="$emit('set-map-type', 'satelite')" class="list-item">
          <v-list-item-title>Satellite</v-list-item-title>
        </v-list-item>
        
        <v-divider></v-divider>

        <v-list-item 
          @click="$emit('set-map-type', 'dark')" class="list-item">
          <v-list-item-title>Dark</v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item 
          @click="$emit('set-map-type', 'street')" class="list-item">
          <v-list-item-title>Street</v-list-item-title>
        </v-list-item>

      </v-list>
    </v-menu>
  </div>
</template>

<script>

export default {
  name: "OptionsMenu",

  data() {
    return {
      options: [
        {
          title: "Satellite",
          type: "satellite"
        },
        {
          title: "Dark",
          type: "dark"
        },
        {
          title: "Streets",
          type: "streets"
        }
      ]
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