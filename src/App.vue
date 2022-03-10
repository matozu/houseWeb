<template>
  <div class="container">
    <login></login>
    <div class="showcase">
      <div class="datepicker-container">
        <date-picker />
      </div>
      <div class="weather-container">
        <div class="welcome">
          <h1>house web</h1>
        </div>
        <WeatherCard />
      </div>
      <div class="schedule-container">
        <Schedule />
      </div>
    </div>
    <messages />
    <chat />
  </div>
</template>

<script>
import Chat from "./components/messages/Chat.vue";
import WeatherCard from "./components/weather/WeatherCard.vue";
import Schedule from "./components/Schedule.vue";
import DatePicker from "./components/calendar/DatePicker.vue";
import { mapActions, mapMutations } from "vuex";
import axios from "axios";
import Login from "./components/Login.vue";
import Messages from "./components/messages/Messages.vue";

export default {
  components: {
    WeatherCard,
    DatePicker,
    Schedule,
    Login,
    Messages,
    Chat,
  },
  methods: {
    ...mapActions(["fetchSchedule"]),
    ...mapMutations(["setUsername"]),
  },
  created() {
    this.fetchSchedule();
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
  // border: 1px solid black;
  padding: 10px;
  position: relative;
  width: 100vw;
  height: 100vh;
  margin: auto;
  background-color: aqua;
  background-image: url("img/bck.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.showcase {
  width: 100%;
  height: 100%;
  display: flex;
  // justify-content: space-between;
}

.datepicker-container {
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: flex-end;
  justify-content: center;
  width: 33%;
  flex: 1 1 auto;
}

.weather-container {
  // border: 1px solid black;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // width: 300px;
}

.schedule-container {
  // border: 1px solid black;
  display: flex;
  justify-content: center;
  height: 100%;
  width: 33%;
  align-items: flex-start;
  flex: 1 1 auto;
}

.welcome {
  text-align: center;

  h1 {
    color: whitesmoke;
    text-shadow: 1px 1px 1px black;
  }
}
</style>
