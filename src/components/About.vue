<template>
  <v-dialog
    :value="dialog"
    overlay-opacity="0.6"
    persistent>

    <div class="about-container">
      <div class="header">
        <h2>About Bluber</h2>
        <v-btn
          v-if="displayCloseIcon"
          icon
          @click="handleClose">
          <font-awesome-icon icon="times"/>
        </v-btn>
      </div>
      <v-divider></v-divider>
    </div>

  </v-dialog>
</template>

<script>
export default {
  name: "About",

  props: {
    dialog: {
      default: true,
      type: Boolean,
    },

    displayCloseIcon: {
      default: true,
      type: Boolean,
    }
  },

  methods: {
    handleClose() {
      this.$emit('close-about');
    }
  }
}
</script>

<style scoped>
.about-container {
  background-color: white;
  height: 80vh;
  width: 80vw;
  padding: 1rem;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.5rem;
}

.header  h2 {
  color: var(--primary);
}
</style>