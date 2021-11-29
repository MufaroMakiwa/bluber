<template>
  <div class="authentication-page-container">
    <div class="title-container">
      <h1>Bluber</h1>
    </div>  

    <div class="login-container">
      <GoogleLoginButton 
        @success="handleLogin"
        @failure="onFailure"/>
    </div>
  </div>
</template>

<script>
import GoogleLoginButton from "./GoogleLoginButton";


export default {
  name: "Notifications",

  components: {
    GoogleLoginButton
  },

  computed: {
    isSignedIn() {
      return this.$store.getters.isSignedIn;
    }
  },

  methods: {
    handleLogin(user) {
      console.log(user)
    },

    onFailure(error) {
      console.log("Auth error");
      console.log(error);
    }
  },

  created() {
    if (this.isSignedIn) {
      this.$store.dispatch("setTemplate", "plan");
    }
  }

}
</script>

<style scoped>
.authentication-page-container {
  width: 100%;
  height: 100%;
  padding: 1.25rem;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

.authentication-page-container > * {
  width: 100%;
}

.title-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 2rem;
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}


</style>
