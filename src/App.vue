<template>
  <div class="container">
    <div class="welcome">
      <h1>welcome to house web</h1>
    </div>
    <WeatherCard />
    <!-- <Calendar /> -->
    <DatePicker v-model="date" class="date-picker" />
    <Schedule />
    <ScheduleInputForm :date="date" v-if="date" @close-form="date = null" />
  </div>
</template>

<script>
import WeatherCard from "./components/weather/WeatherCard.vue";
import { Calendar, DatePicker } from "v-calendar";
import Schedule from "./components/Schedule.vue";
import ScheduleInputForm from "./components/ScheduleInputForm.vue";

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
    };
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
  background-size: 100%;
  background-repeat: no-repeat;
  font-family: "Poppins", sans-serif;
}

.container {
  border: 1px solid black;
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

.date-picker {
  margin: 0 30px 50px 100px;
}
</style>
