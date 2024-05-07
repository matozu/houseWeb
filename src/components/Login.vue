<template>
  <div :class="{ login: true, loginHide: !showLoginInput }">
    <span class="register" @click="toggleShowRegistration()">register</span>

    <form @submit="loginFormSubmit" v-show="username === ''">
      <input
        type="text"
        name="username"
        id="username"
        required
        v-model="inputUsername"
        placeholder="username"
      />
      <input
        type="password"
        name="password"
        id="password"
        required
        v-model="inputPassword"
        placeholder="password"
      />
      <button v-if="showLoginInput" type="submit">login</button>
      <button
        v-else
        class="show-login-btn desktop"
        @click="showLoginInput = true"
      >
        login
      </button>
    </form>
    <button
      class="close"
      v-if="showLoginInput && username === ''"
      @click="showLoginInput = false"
    >
      <span class="fa fa-times"></span>
    </button>
  </div>
  <button
    class="show-login-btn mobile"
    v-if="!showLoginInput && username === ''"
    @click="showLoginInput = true"
  >
    login
  </button>

  <div class="user" v-show="username != ''">
    <p @click="setShowMessages(true)">{{ username }}</p>
    <button
      @click="
        {
          logout();
          showLoginInput = false;
        }
      "
    >
      Log Out
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      inputUsername: "",
      inputPassword: "",
      showLoginInput: false,
    };
  },
  computed: {
    ...mapGetters(["username"]),
  },
  watch: {
    showLoginInput(newValue) {
      if (newValue && window.innerWidth <= 500) {
        this.preventScrolling();
      } else {
        this.enableScrolling();
      }
    },
  },
  methods: {
    ...mapActions(["login", "logout"]),
    ...mapMutations(["setShowMessages", "toggleShowRegistration"]),
    async loginFormSubmit(e) {
      e.preventDefault();
      const usernameInputField = document.getElementById("username");
      const passwordInputField = document.getElementById("password");
      try {
        await this.login({
          username: this.inputUsername,
          password: this.inputPassword,
        });
        this.inputUsername = "";
        this.inputPassword = "";
        this.showLoginInput = false;
      } catch (e) {
        usernameInputField.setCustomValidity(e.request.response);
        usernameInputField.reportValidity();
        usernameInputField.setCustomValidity("");
        passwordInputField.setCustomValidity("");
      }
    },
    preventScroll(e) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    },
    preventScrolling() {
      document
        .getElementsByTagName("BODY")[0]
        .addEventListener("wheel", this.preventScroll, { passive: false });
    },
    enableScrolling() {
      document
        .getElementsByTagName("BODY")[0]
        .removeEventListener("wheel", this.preventScroll);
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  color: white;
  background: rgba($color: black, $alpha: 0.5);
  right: 10px;
  position: absolute;
  left: 15px;
  top: 32px;
  width: fit-content;
  padding: 5px;
  transition: all 0.8s ease-out;
  cursor: pointer;
}

.login {
  position: absolute;
  top: 10px;
  right: 20px;
  transition: all 0.5s ease-in-out;
  z-index: 1;

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

  .close {
    background: none;
    color: whitesmoke;
    border: none;
    cursor: pointer;
    position: absolute;
    top: 31px;
    right: 55px;
  }
}

.user {
  position: absolute;
  top: 10px;
  right: 20px;
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
    margin-top: 5px;
  }
}

button {
  background: rgb(255, 255, 255, 0.2);
  border: 1px solid white;
  color: white;
  border-radius: 3px;
  padding: 3px 5px;
  margin-top: 5px;
  cursor: pointer;
}

.loginHide {
  top: -23px;

  .register {
    opacity: 0;
    transform: scaleZ(0) translateY(-30px);
  }
}

.show-login-btn {
  top: 10px;
  right: 10px;
}

.mobile {
  display: none;
}

@media (min-width: 501px) and (max-width: 900px) {
  .login {
    form {
      width: auto;
      flex-direction: column;
      align-items: flex-end;
      button {
        width: 80%;
      }
    }

    .close {
      top: 61px;
      right: 124px;
    }
  }
  .loginHide {
    top: -60px;
  }
}

@media (max-width: 500px) {
  .login {
    position: absolute;
    top: 44px;
    left: calc((100vw - 200px) / 2);
    width: 200px;
    transition: all 0.8s ease-in-out;

    form {
      border: 1px solid gray;
      background: rgb(245, 245, 245, 0.98);
      padding: 20px;
      flex-direction: column;
      width: 200px;

      input {
        width: 100%;
        text-align: center;
      }
    }
    button {
      color: gray;
      border: 1px solid gray;
      background: whitesmoke;
    }

    .close {
      color: gray;
      top: -5px;
      right: 0;
    }
  }

  .loginHide {
    opacity: 0;
    transform: scale(3);
    // left: 100vh;
    top: -250px;
  }

  .show-login-btn {
    position: absolute;
    top: 12px;
    right: 18px;
  }

  .mobile {
    display: block;
  }

  .desktop {
    display: none;
  }
}
</style>