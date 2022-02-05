<template>
  <div class="login">
    <form action="" v-show="getUsername === ''">
      <input
        type="text"
        name="username"
        v-model="username"
        placeholder="username"
      />
      <input
        type="text"
        name="password"
        v-model="password"
        placeholder="password"
      />
      <button
        @click.prevent="login({ username: username, password: password })"
      >
        log in
      </button>
    </form>
    <div class="user" v-show="getUsername != ''">
      <p>{{ getUsername }}</p>
      <button @click="logout">Log Out</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  computed: {
    ...mapGetters(["getUsername"]),
  },
  methods: {
    ...mapActions(["login", "logout"]),
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
    }
  }
}
</style>