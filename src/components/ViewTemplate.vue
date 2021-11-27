<template>
  <div class="view-container">
    <div class="heading-container">
      <div class="header-inner">
        <div class="header-main">
          <BackButton v-if="backButton" @click.native="$emit('back')"/>
          <h2 :class="[backButton ? 'heading' : '']">
            <slot name="heading"></slot>
          </h2>
        </div>

        <slot name="header-control"></slot>
      </div>  

      <slot name="header-second-row"></slot>   
    </div>
    <v-divider></v-divider>

    <slot name="content"></slot>
  </div>
</template>

<script>
import BackButton from "./BackButton.vue";
export default {
  name: "ViewTemplate",

  components: {
    BackButton
  },

  props: {
    backButton: {
      default: false,
      type: Boolean,
    }
  }
}
</script>


<style scoped>
.view-container {
  width: 100%;
  height: 100%;
  padding: 1.25rem;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

.view-container > * {
  width: 100%;
}

.heading-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding-bottom: 1rem;
}

.header-inner {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.header-main {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.heading {
  margin-left: 1rem;
}
</style>
