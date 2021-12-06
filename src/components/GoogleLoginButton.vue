<template>
  <GoogleLogin class="login-button" 
    :params="params" 
    :onSuccess="handleLogin" 
    :onFailure="onFailure">
    <v-btn
      rounded
      outlined
      color="primary"
      class="sign-in-button">
      <GoogleIcon class="icon"/>
      Connect with Google
    </v-btn>
  </GoogleLogin>  
</template>

<script>
import GoogleLogin from 'vue-google-login';
import GoogleIcon from "./GoogleIcon";
import axios from "axios";
import { eventBus } from '../main';

export default {
  name: "GoogleLoginButton",

  components: {
    GoogleLogin, GoogleIcon,
  },

  props: {
    redirect: {
      default: null,
      type: String,
    },

    isParentDialog: {
      default: false,
      type: Boolean,
    }
  },

  computed: {
    hasRedirect() {
      return this.redirect !== null;
    }
  },

  data() {
    return {
      params: {
        client_id: '617587199418-i6m15318ai2dbu1sj4a8ec2nrhu0d855.apps.googleusercontent.com'
      }
    }
  },

  methods: {
    handleLogin(user) {
      const body = {
        name: user.getBasicProfile().getName(),
        email: user.getBasicProfile().getEmail(),
        imageUrl: user.getBasicProfile().getImageUrl(),
      }
      axios.post("/api/user", body)
        .then(response => {
          const user = response.data.user;
          
          this.$store.dispatch('setUser', {
            name: user.name,
            email: user.email,
            imageUrl: user.imageUrl,
            userId: user.userId,
            rating: user.rating,
            marks: user.marks,
            saved: user.saved,
            notifications: user.notifications,
          });

          if (this.hasRedirect) {
            this.$store.dispatch('setTemplate', this.redirect);
            
            // if it is marking, emit event to trigger marking
            if (this.redirect === "mark") {
              eventBus.$emit('marking');
            }
          }
        })
        .catch(error => {
          // do not expect an error with google auth yet
          console.log(error)
        })
        .finally(() => {
          this.isParentDialog && this.$emit('auth-complete');
        })
    },

    onFailure(error) {
      this.isParentDialog && this.$emit('auth-complete');
      console.log(error);
    }
  }

}
</script>

<style scoped>
.sign-in-button {
  text-transform: none;
}

.icon {
  margin-right: 1rem;
}
</style>