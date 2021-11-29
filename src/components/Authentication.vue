<template>
  <div class="authentication-page-container">
    <div class="title-container">
      <h1>Bluber</h1>
    </div>  

    <img class="button-bike-icon" alt="" src="https://img.icons8.com/external-wanicon-lineal-color-wanicon/64/000000/external-bike-healthy-wanicon-lineal-color-wanicon.png" />

    <div class="login-container">
      <GoogleLoginButton />
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
  align-items: center;
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
  margin-bottom: 1rem;
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.button-bike-icon {
  width: 50px;
  height: 50px;
  margin-bottom: 3rem;
}
</style>
