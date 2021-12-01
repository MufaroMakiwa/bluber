<template>
  <transition name="fade">
    <div
      v-if="display"
      @wheel.prevent 
      @scroll.prevent 
      @touchmove.prevent 
      class="modal">
      
      <slot></slot>

    </div>
  </transition>
</template>

<script>
export default {
  name: "PageModalTemplate",

  props: {
    display: Boolean,
  }
}
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
}
</style>