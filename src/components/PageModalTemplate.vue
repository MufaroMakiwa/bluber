<template>
  <transition name="fade">
    <div
      v-if="display"
      @wheel.prevent 
      @scroll.prevent 
      @touchmove.prevent 
      class="modal"
      @click.stop="modalClick">
      
      <div
        @click.stop
        :class="['container', animateModalClick ? 'scale' : '']">
        <slot></slot>
      </div>

    </div>
  </transition>
</template>

<script>
export default {
  name: "PageModalTemplate",

  props: {
    display: Boolean,

    clickToDismiss: {
      default: false,
      type: Boolean,
    }
  },

  data() {
    return {
      animateModalClick: false,
    }
  },

  methods: {
    animateClick() {
      this.animateModalClick = true;
      setTimeout(() => {
        this.animateModalClick = false;
      }, 100);
    },

    closeModal() {
      this.$emit('dismiss-dialog')
    },

    modalClick() {
      return this.clickToDismiss ? this.closeModal() : this.animateClick();
    }
  }
}
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
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

.container {
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scale {
  transform: translateY(-2.5%);
}
</style>