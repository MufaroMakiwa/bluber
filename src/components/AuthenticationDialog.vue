<template>
  <v-dialog
    overlay-opacity="0.6"
    :width="400"
    :value="dialog"
    @click:outside="closeDialog">
    <div class="authentication-container">
      <div class="title-container">
        <h1>Bluber</h1>
      </div>  

      <img class="button-bike-icon" alt="" src="https://img.icons8.com/external-wanicon-lineal-color-wanicon/64/000000/external-bike-healthy-wanicon-lineal-color-wanicon.png" />

      <span class="message">You need to be signed in to {{action}}.</span>

      <div class="login-container">
        <GoogleLoginButton 
          :isParentDialog="true"
          :redirect="redirect"
          @auth-complete="closeDialog"/>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import GoogleLoginButton from "./GoogleLoginButton";


export default {
  name: "AuthenticationDialog",

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
    GoogleLoginButton
  },

  methods: {
    closeDialog() {
      this.$emit('close-auth-dialog')
    }
  }
}
</script>

<style scoped>
.dialog-container {
  background-color: white;
}

.authentication-container {
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