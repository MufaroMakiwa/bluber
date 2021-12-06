<template>
  <div class="dialog-container">
    <v-dialog
      overlay-opacity="0.6"
      :width="1100"
      :persistent='!hasViewedDemo'
      :value="dialog">
      <div class="container-inner">
        <span class="place-text">Finish watching this video to onboard and understand how Bluber works!</span>
        <div  class="video-container">
            <video-player ref="videoPlayer"
                class="video-player-box"
                :options="playerOptions"
                @ended="markPlayed"></video-player>
        </div>
    </div>
    </v-dialog>
  </div>
</template>

<script>
import {videoPlayer} from 'vue-video-player';
import axios from "axios";

export default {
  name: "AuthenticationDialog",

  data() {
    return {
      playerOptions: {
          // videojs options
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: "video/mp4",
            src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
          }],
          poster: "../meeting-notes-2.pdf",
        }
      }
  },

  props: {
    dialog: {
      default: false,
      type: Boolean
    },

    action: String,

    redirect: {
      default: null,
      type: String
    }
  },

  components: {
    videoPlayer
  },

  computed: {
    hasViewedDemo() {
      if (this.$store.getters.user) {
        return this.$store.getters.user.viewedDemo;
      }
      return true;
    },
  },

  methods: {
    // closeDialog() {
    //   this.$emit('close-auth-dialog')
    // },
    markPlayed() {
      let body = {
          userId: this.$store.getters.user.userId,
      }
      axios.patch("/api/user", body)
        .then(() => {
          this.$store.dispatch("setViewedDemo", true);
        }).catch((err) => console.log(err));
      // this.$store.dispatch("setViewedDemo", true)
    }
  }
}
</script>

<style scoped>
.dialog-container {
  background-color: white;
}

.container-inner {
  width: 100%;
  height: 100%;
  padding: 1.25rem;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: white;
}

.video-container {
    flex-grow: 1;
}

.authentication-container > * {
  width: 100%;
}

.title-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 1rem;
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  margin-top: 2rem;
}

.button-bike-icon {
  width: 50px;
  height: 50px;
}

.message {
  margin-top: 2rem;
  text-align: center;
}
</style>