<template>
  <div class="form-wrap">
    <loading v-if="modalActive"></loading>
    <form class="register">
      <p class="login-register">
        Already have an account?
        <router-link class="router-link" :to="{ name: 'Login' }"
          >Login</router-link
        >
      </p>
      <h2>Create Your FireBlog Account</h2>
      <div class="inputs">
        <div class="input">
          <input
            type="text"
            placeholder="First Name"
            v-model="firstName"
          />
          <user class="icon" />
        </div>
        <div class="input">
          <input
            type="text"
            placeholder="Last Name"
            v-model="lastName"
          />
          <user class="icon" />
        </div>
        <div class="input">
          <input
            type="text"
            placeholder="userName"
            v-model="userName"
          />
          <user class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Email" v-model="email" />
          <email class="icon" />
        </div>
        <div class="input">
          <input
            type="password"
            placeholder="Password"
            v-model="password"
          />
          <password class="icon" />
        </div>
        <div v-show="error" class="error">{{ this.errorMsg }}</div>
      </div>
      <button @click.prevent="register">Sign Up</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import email from "../assets/Icons/envelope-regular.svg";
import password from "../assets/Icons/lock-alt-solid.svg";
import user from "../assets/Icons/user-alt-light.svg";
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";
import Loading from '../components/Loading.vue';
export default {
  name: "Register",
  components: {
    email,
    password,
    user,
    Loading,
  },
  data() {
    return {
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        error: null,
        errorMsg: "",
        modalActive:false
    };
  },
  methods: {
    async register() {
      if (
        this.firstName !== "" &&
        this.lastName !== "" &&
        this.userName !== "" &&
        this.email !== "" &&
        this.password !== ""
      ) {
        const firbaseAuth = await firebase.auth();
        const createUser = await firbaseAuth.createUserWithEmailAndPassword(
          this.email,
          this.password
        );
        const database = db.collection('user').doc(createUser.user.uid)
        this.modalActive=true
        await database.set({
          firstName:this.firstName,
          lastName:this.lastName,
          userName:this.userName,
          email:this.email,
        })
        this.firstName = "" 
        this.lastName = "" 
        this.userName = "" 
        this.email = "" 
        this.password = "" 
        this.$router.push({name:'Home'})
        console.log('OK');

      } else {
        this.error = true;
        this.errorMsg = "Pleace filled all the inputs";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
  }
}
</style>