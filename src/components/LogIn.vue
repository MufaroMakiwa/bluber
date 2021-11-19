<template>

  <div class="wrapper">

    <div>
        <span class="title">
            Type your name to sign In
        </span>
    </div>

    <div class="form-wrapper">
        <label class="label" for="username"> Username </label>
        <input class="input" id="username" name="username" v-model="username" />
        <span class="error-msg">{{ usernameResponse }}</span>
        <button class="signin-btn" @click="signin">Sign In</button>
    </div>
</div>


</template>
<script>

import axios from "axios";
import { eventBus } from "../main.js"

export default {
   name: 'LogIn',

   data() {
       return {
           usernameResponse: "",
           username: "",
       }
   },

   methods: {
       signin() {
           let params = {"username": this.username}
           axios.post("/api/user/", params)
                .then((response) => {
                    console.log("response", response.data);
                    this.$cookie.set("username", response.data.user.name);
                    eventBus.$emit("signIn")
                })
                .catch(() => {
                    console.log("could not sign in")
                })
       }
   }
}
</script>

<style scoped>

.wrapper {
    display: flex;
    background: rgb(217, 219, 223);
    height: 500px;
    width: 500px;
    margin: 10%;
    border-radius: 3px;
    justify-content: center;
    align-items: center; 
    flex-direction: column;
}

.form-wrapper {
  display: flex;
}

.label {
  font-size: 18px;
  color: #000000;
  font-weight: bold;
}

.input {
  font-size: 18px;
  margin-top: 8px;
  padding: 6px 8px;
}

.error-msg {
  color: #db2828;
  font-size: 14px;
  font-weight: bold;
  margin: 16px 0;
}

.form-wrapper {
  display: flex;
  flex-direction: column;
  margin-top: 24px;
}

.title {
    font-size: 30px;
}

.signin-btn {
    height: 40px;
    background: #1DA1F2;
    /* color: #fff; */
    border: 1px solid white;
    font-size: 20px
}

</style>