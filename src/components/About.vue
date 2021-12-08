<template>
  <v-dialog :value="dialog" overlay-opacity="0.6" persistent>
    <div class="about-container">
      <div class="header">
        <h2>Bluber</h2>
        <v-btn
          rounded
          depressed
          color="primary"
          v-if="viewedDemo"
          @click="handleClose"
        >
          <font-awesome-icon icon="times" class="close-icon" />
          Close
        </v-btn>
      </div>

      <v-divider class="divider"></v-divider>

      <div class="carousel-container">
        <v-carousel v-model="currentIndex" :continuous="false" height="100%">
          <template v-slot:prev="{ on, attrs }">
            <v-btn icon color="white" v-bind="attrs" v-on="on">
              <font-awesome-icon icon="chevron-left" />
            </v-btn>
          </template>
          <template v-slot:next="{ on, attrs }">
            <v-btn icon color="white" v-bind="attrs" v-on="on">
              <font-awesome-icon icon="chevron-right" />
            </v-btn>
          </template>

          <v-carousel-item>
            <Cell header="About" cellName="about" :info="about.info" />
          </v-carousel-item>

          <v-carousel-item>
            <Cell
              header="Marking"
              :info="marking.info"
              :videoUrl="marking.videoUrl"
            />
          </v-carousel-item>
          <v-carousel-item>
            <Cell
              header="My Marks"
              :info="mymarks.info"
              :videoUrl="mymarks.videoUrl"
            />
          </v-carousel-item>
          <v-carousel-item>
            <Cell
              header="Planning a Trip"
              :info="planning.info"
              :videoUrl="planning.videoUrl"
              cellName="plan"
            />
          </v-carousel-item>

          <v-carousel-item>
            <Cell
              header="Rating"
              cellName="rating"
              :info="rating.info"
              :videoUrl="rating.videoUrl"
            />
          </v-carousel-item>

          <v-carousel-item>
            <Cell
              header="Notifications"
              :info="notifications.info"
              :videoUrl="notifications.videoUrl"
              cellName="notifications"
            />
          </v-carousel-item>

          <v-carousel-item>
            <Cell
              header="Locator"
              :info="locator.info"
              cellName="locator"
              :videoUrl="locator.videoUrl"
            />
          </v-carousel-item>
        </v-carousel>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { eventBus } from "../main";
import Cell from "./InfoCell.vue";

export default {
  name: "About",
  components: { Cell },
  props: {
    dialog: {
      default: false,
      type: Boolean,
    },
  },

  data() {
    return {
      currentIndex: 0,
      carouselSize: 5, // number of slides in carousel
      viewedSlides: [0],

      notifications: {
        info: "Notifications help the user stay updated on the status of their marks. A notification is triggered when another user rates one of your marks or comments on one of your marks.",
        videoUrl: "eEB6dS3ecrk",
      },
      about: {
        info: `
        Bluber is an application that is designed to help users to navigate the Cambridge traffic network safely. It gives bikers a platform to comment on
      conditions of roads or bikelanes they have travelled through during their trips.This offers users first-hand information that they can rely on to make
      make better judgements when choosing biking routes when planning new trips in a region.
      `,
      },

      marking: {
        info: "Users can specify the problems they encountered on specific roads or bikelanes they travelled through by marking issues on a map",
        videoUrl: "Eo7bNcicZcY",
      },

      rating: {
        info: "Rating is a metric for a user's credibility or a mark's credibility. A user's rating is the expected average of their marks' ratings",
        videoUrl: "BE4Wt23QeUU",
      },
      planning: {
        info: "Planning a trip helps users see safety concerns or inconveniences raised by other bikers, in a specific area",
        videoUrl: "wPdCCcMSf0g",
      },

      locator: {
        info: `
        The Bluebike locator helps users find the nearest Bluebike stations from a specific location. It also shows the current
        status of each Bluebike stations i.e. the number of bikes and docks available 
      `,
        videoUrl: "mkpqsI_KMrI",
      },

      mymarks: {
        info: "A user has the ability to view their marks separately",
        videoUrl: "3SpAaHPdNzM",
      },
    };
  },

  watch: {
    currentIndex: function (nextIndex) {
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

    viewedSlides: function () {
      if (this.viewedSlides.length === this.carouselSize) {
        eventBus.$emit("complete-demo");
      }
    },
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
    },
  },

  methods: {
    handleClose() {
      this.$emit("close-about");
    },
  },
};
</script>

<style scoped>
.about-container {
  background-color: white;
  height: 88vh;
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

.header h2 {
  color: var(--primary);
}

.carousel-container {
  margin-top: 1rem;
  flex-grow: 1;
}
</style>