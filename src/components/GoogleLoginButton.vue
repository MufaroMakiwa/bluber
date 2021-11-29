<template>
  <GoogleLogin class="login-button" 
    :params="params" 
    :onSuccess="handleLogin" 
    :onFailure="onFailure">
    <v-btn
      class="sign-in-button">
      <GoogleIcon class="icon"/>
      Sign in with Google
    </v-btn>
  </GoogleLogin>  
</template>

<script>
import GoogleLogin from 'vue-google-login';
import GoogleIcon from "./GoogleIcon";


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
      this.$emit('success', user);
    },

    onFailure(error) {
      this.$emit('failure', error)
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