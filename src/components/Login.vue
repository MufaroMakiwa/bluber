   <template>
    <div class="wrapper">
        <form class="vertical-center inner-block">
            <h3>Sign In</h3>

            <div class="form-group margin-around">
                <label>Email address</label>
                <input v-model="email" type="" class="form-control form-control-lg" />
            </div>

            <div class="form-group margin-around">
                <label>Password</label>
                <input v-model="password" type="password" class="form-control form-control-lg" />
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block margin-around" @click="onSigning">Sign In</button>
            
            <div>
            <p class="forgot-password text-right mt-2 mb-4 ">
                <router-link to="/forgot-password">Forgot password ?</router-link>
            </p>
           
            <p class="forgot-password text-right">
                Don't have an account?
                <router-link :to="{name: 'Home'}">sign in?</router-link>
            </p>

            </div>


            <GoogleLogin class="login-button margin-around" 
                :params="params" 
                :onSuccess="onSigningWithGoogle" 
                :onFailure="onFailure" 
            > Continue with Google </GoogleLogin>

        </form>
    </div>
</template>

<script>
import GoogleLogin from 'vue-google-login';
import axios from 'axios';
import { eventBus } from '../main.js';
export default {
    name: "Login",
    components: {GoogleLogin},
    data() {
        return {
            renderParams: {
                width: 300,
                height: 50,
                longtitle: true
            }, 
            params: {
                client_id: '617587199418-i6m15318ai2dbu1sj4a8ec2nrhu0d855.apps.googleusercontent.com'
            },
            email: "",
            name: "",
            password: ""
        }
    },
    methods: {
        onSigningWithGoogle(googleUser) {
            this.username = googleUser.getBasicProfile().getName();
            this.imageUrl = googleUser.getBasicProfile().getImageUrl();
            this.$cookie.set("username", this.username);
            this.$cookie.set("imageUrl", this.imageUrl);
            this.email = googleUser.getBasicProfile().getEmail();
            this.isSignedIn = !this.isSignedIn;   
            this.logoutButton = !this.logoutButton;
            let userInfo = {
                username: this.username,
                email: this.email,
                imageUrl: this.imageUrl
            }

            axios.post("/api/user/google-auth", userInfo)
                .then(() => {
                    eventBus.emit("on-sign-in", userInfo);
                })
                .catch((err) => {
                    console.log(err)
                })
            },
        onFailure(err) {
            console.log(err);
        },
        onSigning() {
            let userInfo = {
                username: this.username,
                email: this.email,
                password: this.password
            }
            
            let logged = false;
            axios.post("/api/user", userInfo)
              .then(() => {
                  logged = true;
              })
              .catch((err) => {
                  console.log(err)
              })
              if (logged) {
                this.$router.push("/");
              }
              
        }
    }
}
</script>

<style scoped>

.margin-around {
    margin: 10px;
}
.body {
  background: #2554FF !important;
  min-height: 100vh;
  display: flex;
  font-weight: 400;
}
.wrapper,
.vertical-center {
  width: 100%;
  height: 100%;
}
.navbar-light {
  background-color: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
}
.vertical-center {
  display: flex;
  text-align: left;
  justify-content: center;
  flex-direction: column;    
}
.inner-block {
  width: 450px;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all .3s;
}
.vertical-center .form-control:focus {
  border-color: #2554FF;
  box-shadow: none;
}
.vertical-center h3 {
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
}
label {
  font-weight: 500;
}
.forgot-password,
.forgot-password a {
  text-align: right;
  font-size: 13px;
  padding-top: 10px;
  color: #7a7a7a;
  margin: 0;
}
.forgot-password a {
  color: #2554FF;
}
</style>
