<template>
  <div class="showcase">
    <login></login>
    <div class="welcome">
      <h1>house web</h1>
    </div>
    <!-- <a href="#sif">sif</a> -->
    <WeatherCard />
    <!-- <Calendar /> -->
    <div v-show="getUsername != ''" class="calendar">
      <div
        :class="['show-calendar-btn', { 'date-picker-show': !showCalendar }]"
        @click="showCalendar = !showCalendar"
      >
        Show Calendar
      </div>
      <div
        v-if="showCalendar"
        :class="['date-picker-container', { 'date-picker-show': showCalendar }]"
      >
        <div class="date-picker-close" @click="showCalendar = false"></div>
        <DatePicker v-model="date" class="date-picker" />
      </div>

      <ScheduleInputForm
        ref="sif"
        :date="date"
        :style="date ? 'transform: scale(1)' : 'transform: scale(0)'"
        @close-form="date = null"
      />
    </div>
  </div>

  <Schedule />
</template>

<script>
import WeatherCard from "./components/weather/WeatherCard.vue";
import { Calendar, DatePicker } from "v-calendar";
import Schedule from "./components/Schedule.vue";
import ScheduleInputForm from "./components/ScheduleInputForm.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import axios from "axios";
import Login from "./components/Login.vue";

export default {
  components: {
    WeatherCard,
    Calendar,
    DatePicker,
    Schedule,
    ScheduleInputForm,
    Login,
  },
  data() {
    return {
      date: null,
      showCalendar: false,
    };
  },
  computed: {
    ...mapGetters(["getUsername"]),
  },
  watch: {
    showCalendar: function (val) {
      if (!val) {
        this.date = null;
      }
    },
    date: function (val) {
      if (val != undefined) {
        const x = this.$refs.sif.$refs.if.offsetTop - 300;
        window.scrollTo(0, x);
        // console.log(x);
        console.log("val != undefined");
      } else {
        console.log("val === undefined");
        window.scrollTo(0, 0);
      }
    },
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

.showcase {
  padding-top: 30px;
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url("img/bck.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.welcome {
  margin-top: 100px;
  text-align: center;

  h1 {
    color: whitesmoke;
    text-shadow: 1px 1px 1px black;
  }
}

.show-calendar-btn {
  display: inline-block;
  padding: 5px;
  background: rgb(100, 149, 237, 0.8);
  text-align: center;
  border-radius: 5px;
  transition: all 0.5s ease-in-out;
  transform: scale(0);
  cursor: pointer;
}

.calendar {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin: 0 auto;
}

.date-picker-container {
  display: inline-block;
  position: relative;
  transition: all 0.5s ease-in-out;
  transform: scale(0);
}

.date-picker {
  position: relative;
}

.date-picker-close {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -12px;
  right: -12px;
  z-index: 1;
  width: 25px;
  height: 25px;
  background: white;
  border-radius: 100%;
  border: 1px solid black;
  cursor: pointer;
}

.date-picker-close::after {
  display: inline-block;
  content: "\00d7";
  font-size: 1.5em;
  color: gray;
}

.date-picker-close:hover::after {
  font-weight: bold;
}

.date-picker-show {
  transform: scale(1);
}
</style>
