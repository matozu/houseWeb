<template>
  <div class="login">
    <form @submit="loginForm" v-show="getUsername === ''">
      <input
        type="text"
        name="username"
        id="username"
        required
        v-model="username"
        placeholder="username"
      />
      <input
        type="text"
        name="password"
        id="password"
        required
        v-model="password"
        placeholder="password"
      />
      <button type="submit">log in</button>
    </form>
    <div class="user" v-show="getUsername != ''">
      <p @click="setShowMessages(true)">{{ getUsername }}</p>
      <button @click="logout">Log Out</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      username: "user",
      password: "user",
    };
  },
  computed: {
    ...mapGetters(["getUsername"]),
  },
  methods: {
    ...mapActions(["login", "logout"]),
    ...mapMutations(["setShowMessages"]),
    async loginForm(e) {
      e.preventDefault();
      const usernameInput = document.getElementById("username");
      const passwordInput = document.getElementById("password");
      try {
        await this.login({ username: this.username, password: this.password });
      } catch (e) {
        usernameInput.setCustomValidity(e.request.response);
        usernameInput.reportValidity();
        usernameInput.setCustomValidity("");
        passwordInput.setCustomValidity("");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  // border: 1px solid white;
  position: absolute;
  top: 10px;
  right: 20px;

  form {
    display: flex;
    flex-wrap: wrap;
    width: 315px;
    justify-content: right;
    gap: 10px;

    input {
      width: 145px;
    }
  }

  .user {
    display: flex;
    justify-content: right;
    gap: 10px;
    width: 200px;
    color: white;
    font-weight: bold;

    p {
      background-color: rgb(0, 0, 0, 0.5);
      padding: 3px;
      cursor: pointer;
    }
  }
}
</style>