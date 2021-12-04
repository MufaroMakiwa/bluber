<template>
  <MarksList 
    title="My Marks" 
    :marks="marks"
    :displaySaveIcon="false"
    :userMarks="true"/>
</template>

<script>
import MarksList from "./MarksList.vue";
import { eventBus } from "../main";

export default {
  name: "UserMarks",

  components: {
    MarksList
  },

  computed: {
    isSignedIn() {
      return this.$store.getters.isSignedIn;
    },

    user() {
      return this.$store.getters.user;
    },

    marks() {
      return this.isSignedIn ? this.user.marks : []
    }
  },

  mounted() {
    eventBus.$on("refresh", () => {
      this.$store.dispatch('getUser');
    })
  },

  beforeDestroy() {
    // update the user object
    this.$store.dispatch('getUser');
    
    eventBus.$off("refresh");
  }
}
</script>
