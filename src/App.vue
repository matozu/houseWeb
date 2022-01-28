<template>
  <div class="container">
    <div class="welcome">
      <h1>welcome to house web</h1>
    </div>
    <WeatherCard />
    <!-- <Calendar /> -->
    <div :class="['calendar', { 'calendar-show': showCalendar }]">
      <DatePicker v-model="date" class="date-picker" />
      <div class="pull-calendar" @click="showCalendar = !showCalendar">
        {{ showCalendar ? "Hide" : "Show Calendar" }}
      </div>

      <ScheduleInputForm
        :date="date"
        :style="
          date && showCalendar ? 'transform: scale(1)' : 'transform: scale(0)'
        "
        @close-form="date = null"
      />
    </div>

    <Schedule />
  </div>
</template>

<script>
import WeatherCard from "./components/weather/WeatherCard.vue";
import { Calendar, DatePicker } from "v-calendar";
import Schedule from "./components/Schedule.vue";
import ScheduleInputForm from "./components/ScheduleInputForm.vue";
import { mapActions } from "vuex";
import axios from "axios";

export default {
  components: {
    WeatherCard,
    Calendar,
    DatePicker,
    Schedule,
    ScheduleInputForm,
  },
  data() {
    return {
      date: null,
      showCalendar: false,
    };
  },
  watch: {
    showCalendar: function (val) {
      if (!val) {
        this.date = null;
      }
    },
  },
  methods: {
    ...mapActions(["fetchSchedule"]),
  },
  created() {
    this.fetchSchedule();
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
  -ms-overflow-style: none;
  scrollbar-width: none;
}

body {
  background-image: url("img/bck.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  font-family: "Poppins", sans-serif;
}

.container {
  border: 1px solid black;
  min-height: 100vh;
  position: relative;
  width: 100vw;
  margin: auto;
}

.welcome {
  /* border: 1px solid black; */
  margin: 10vh 0 auto;
  text-align: center;

  h1 {
    color: whitesmoke;
    // text-shadow: 1px 1px 1px gray;
  }
}

.pull-calendar {
  z-index: 1;
  width: 250px;
  height: 30px;
  background: rgb(95, 158, 160, 0.83);
  padding: 5px 10px;
  margin: 0 auto;
  text-align: center;
  cursor: pointer;
}

.calendar {
  position: absolute;
  top: -270px;
  left: 50px;
  transition: all 0.5s ease-out;
}

.calendar-show {
  top: 0;
}
</style>
