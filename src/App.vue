<template>
  <div class="container">
    <login></login>
    <div class="showcase">
      <h1>house web</h1>
      <WeatherCard />
      <a href="#schedule"><div class="scroll-to-schedule-icon"></div></a>
      <users />
    </div>
    <messages />
    <chat />
    <schedule />
    <image-gallery />
    <div class="footer">
      Copyright &copy; 2022 by
      <a href="https://matozu.github.io">mato</a>
      <br />
      All rights reserved
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import axios from "axios";
import Login from "./components/Login.vue";
import WeatherCard from "./components/weather/WeatherCard.vue";
import Messages from "./components/messages/Messages.vue";
import Chat from "./components/messages/Chat.vue";
import Users from "./components/Users.vue";
import Schedule from "./components/Schedule.vue";
import ImageGallery from "./components/images/ImageGallery.vue";

export default {
  components: {
    WeatherCard,
    Login,
    Messages,
    Chat,
    Users,
    Schedule,
    ImageGallery,
  },
  methods: {
    ...mapActions(["fetchSchedule", "fetchImages"]),
    ...mapMutations(["setUsername"]),
  },
  created() {
    this.fetchSchedule();
    this.fetchImages();
    const token = localStorage.getItem("x-auth-token");
    const username = localStorage.getItem("username");
    if (token && username) {
      this.setUsername(username);
      axios.defaults.headers.post["x-auth-token"] = token;
      axios.defaults.headers.delete["x-auth-token"] = token;
      axios.defaults.headers.put["x-auth-token"] = token;
    }
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  text-decoration: none;
}

::-webkit-scrollbar {
  display: none;
}

html {
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-behavior: smooth;
}

body {
  font-family: "Poppins", sans-serif;
}

.container {
  padding: 10px;
  position: relative;
  width: 100vw;
  height: 100vh;
  margin: auto;
  background-color: aqua;
  background-image: url("assets/img/2.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.showcase {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1 {
    color: whitesmoke;
    text-shadow: 1px 1px 1px black;
  }
}

.scroll-to-schedule-icon {
  height: 50px;
  width: 50px;
  border-style: solid;
  border-color: whitesmoke;
  border-width: 0px 5px 5px 0px;
  transform: rotate(45deg);
}

.scroll-to-schedule-icon:hover {
  border-bottom-width: 4px;
  border-right-width: 4px;
}

.footer {
  text-align: center;
  line-height: 2em;
  margin-top: 20px;
}
</style>
