<template>
  <v-dialog
    :value="dialog"
    overlay-opacity="0.6"
    persistent>

    <div class="about-container">
      <div class="header">
        <h2>Bluber</h2>
        <v-btn
          rounded
          depressed
          color="primary"
          v-if="viewedDemo"
          @click="handleClose">
          <font-awesome-icon icon="times" class="close-icon"/>
          Close
        </v-btn>
      </div>
      <v-divider></v-divider>
      <div class="carousel-container">
        <v-carousel
          v-model="currentIndex"
          :continuous="false"
          height="100%">
          <template v-slot:prev="{ on, attrs }">
            <v-btn
              icon
              color="white"
              v-bind="attrs"
              v-on="on">
              <font-awesome-icon icon="chevron-left"/>
            </v-btn>
          </template>
          <template v-slot:next="{ on, attrs }">
            <v-btn
              icon
              color="white"
              v-bind="attrs"
              v-on="on">
              <font-awesome-icon icon="chevron-right"/>
            </v-btn>
          </template>

          <v-carousel-item>
            <div>About Bluber</div>
          </v-carousel-item>

          <v-carousel-item>
            <div>Adding a mark</div>
          </v-carousel-item>

          <v-carousel-item>
            <div>Planning a trip</div>
          </v-carousel-item>

          <v-carousel-item>
            <div>Saving a plan</div>
          </v-carousel-item>

          <v-carousel-item>
            <div>Locator</div>
          </v-carousel-item>
        </v-carousel>
      </div>
    </div>

  </v-dialog>
</template>

<script>
import { eventBus } from "../main";


export default {
  name: "About",

  props: {
    dialog: {
      default: false,
      type: Boolean,
    }
  },

  data() {
    return {
      currentIndex: 0,
      carouselSize: 5, // number of slides in carousel
      viewedSlides: [0]
    }
  },

  watch: {
    currentIndex: function(nextIndex) {
      if (!this.isSignedIn) {
        return;
      }
      if (!this.viewedSlides.includes(nextIndex)) {
        this.viewedSlides.push(nextIndex);
      }
    },

    dialog: function () {
      if (this.dialog) {
        this.currentIndex = 0;
        this.viewedSlides = [0];
      }
    },

    viewedSlides: function() {
      if (this.viewedSlides.length === this.carouselSize) {
        eventBus.$emit("complete-demo");
      }
    }
  },

  computed: {
    isSignedIn() {
      return this.$store.getters.isSignedIn;
    },

    user() {
      return this.$store.getters.user;
    },

    viewedDemo() {
      if (!this.isSignedIn) {
        return true;
      }
      return this.user.viewedDemo;
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

.about-container > * {
  width: 100%;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
}

.close-icon {
  margin-right: 0.5rem;
}

.header  h2 {
  color: var(--primary);
}

.carousel-container {
  margin-top: 1rem;
  flex-grow: 1;
}

</style>