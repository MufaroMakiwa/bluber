<template>
  <div class="menu-container">
    <v-menu
      bottom
      left
      :min-width="175"
      :close-on-content-click="true">
      <template v-slot:activator="{ on: menu, attrs }">
        <v-tooltip left>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn
              icon
              color="gray"
              v-on="{ ...tooltip, ...menu }"
              v-bind="attrs">
              <font-awesome-icon icon="ellipsis-h"/>
            </v-btn>
          </template>
          <span>More</span>
        </v-tooltip>
      </template>

      <v-list class="menu-options">

        <v-list-item 
          v-for="(option, index) in options"
          :key="index"
          @click="$emit(option.event)" class="list-item">
          <v-list-item-avatar class="avatar">
            <font-awesome-icon :icon="option.icon" class="menu-icon"/> 
          </v-list-item-avatar>
          <v-list-item-title>{{ option.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>

export default {
  name: "OptionsMenu",

  props: {
    options: Array
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