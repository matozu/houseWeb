<template>
  <transition>
    <div class="registration-container" v-if="showRegistration">
      <i class="fa fa-close" @click="toggleShowRegistration()"></i>
      <form @submit="submitForm" class="registration-form">
        <input
          type="text"
          name="username-input"
          id="username-input"
          v-model="inputUsername"
          placeholder="username"
          required
        />
        <input
          type="password"
          name="password-input"
          id="password-input"
          v-model="inputPassword"
          placeholder="password"
          required
        />
        <input
          type="email"
          name="email-input"
          id="email-input"
          v-model="inputEmail"
          placeholder="email"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      inputUsername: "",
      inputPassword: "",
      inputEmail: "",
    };
  },
  computed: {
    ...mapGetters(["showRegistration"]),
  },
  methods: {
    ...mapActions(["register"]),
    ...mapMutations(["toggleShowRegistration"]),
    async submitForm(e) {
      e.preventDefault();
      const usernameInputField = document.getElementById("username-input");
      const passwordInputField = document.getElementById("password-input");
      const emailInputField = document.getElementById("email-input");
      try {
        await this.register({
          username: this.inputUsername,
          password: this.inputPassword,
          email: this.inputEmail,
        });
        this.toggleShowRegistration();
        alert("Activation link sent to email: " + this.inputEmail);
      } catch (error) {
        if (error.response?.status === 400) {
          const errorMessage = error.response.data;
          usernameInputField.setCustomValidity(errorMessage);
          usernameInputField.reportValidity();
          usernameInputField.setCustomValidity("");
        } else {
          alert("Server error occurred. Please try again later.");
          console.log(error);
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.registration-container {
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: white;
}

.registration-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input {
    margin: 10px 0;
    text-align: center;
  }
}

.fa-close {
  position: absolute;
  top: 5px;
  right: 6px;
  cursor: pointer;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: scale(1.5);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.8s ease-in-out;
  z-index: 3;
}

.v-enter-to,
.v-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>