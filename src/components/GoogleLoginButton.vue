<template>
  <GoogleLogin class="login-button" 
    :params="params" 
    :onSuccess="handleLogin" 
    :onFailure="onFailure">
    <v-btn
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

export default {
  name: "GoogleLoginButton",

  components: {
    GoogleLogin, GoogleIcon,
  },

  data() {
    return {
      params: {
        client_id: '622048437-gdm1h3v3uj49e3nhaj9b7b620i18ni02.apps.googleusercontent.com'
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
          
          // TODO to retrieve the rating from the response
          this.$store.dispatch('setUser', {
            name: user.name,
            email: user.email,
            imageUrl: user.imageUrl,
            userId: user._id,
            rating: 0
          });
        })
        .catch(error => {
          // do not expect an error with google auth yet
          console.log(error)
        })
    },

    onFailure(error) {
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