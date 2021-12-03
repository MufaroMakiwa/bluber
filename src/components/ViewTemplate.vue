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

    <div :class="[contentPadded ? 'content' : '']">
      <slot name="content"></slot>
    </div>
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
    },

    contentPadded: {
      default: true,
      type: Boolean,
    }
  }
}
</script>


<style scoped>
.view-container {
  width: 100%;
  height: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
}

.view-container > * {
  width: 100%;
}

.heading-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 1.25rem;
  padding-bottom: 1rem;
  position: sticky;
  background-color: white;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid lightgray;
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

.content {
  padding: 0 1.5rem;
  padding-bottom: 1.5rem;
}
</style>
