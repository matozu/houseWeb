<template>
  <div :class="['show-btn', { 'hide-btn': show }]" @click="show = !show">
    {{ show ? "Hide Schedule" : "Show Schedule" }}
  </div>

  <div :class="['schedule', { 'schedule-show': show }]">
    <div class="day" v-for="day in getSchedule">
      <div class="day-date">
        {{ String(day.date.getDate()).padStart(2, "0") }}
        {{ String(day.date.getMonth() + 1).padStart(2, "0") }}
        {{ day.date.getFullYear() }}
      </div>
      <div class="day-text">
        {{ day.text }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Schedule",
  data() {
    return {
      show: false,
    };
  },
  computed: {
    ...mapGetters(["getSchedule"]),
  },
};
</script>

<style scoped>
.show-btn {
  position: absolute;
  top: 60px;
  right: -44px;
  height: 30px;
  background: rgb(95, 158, 160, 0.83);
  text-align: center;
  padding: 5px 10px;
  transition: all 0.5s ease-out;
  transform: rotate(90deg);
  cursor: pointer;
}

.hide-btn {
  transform: rotate(0deg);
  top: 20px;
  right: 10px;
}

.schedule {
  position: absolute;
  top: 50px;
  right: -350px;
  transition: all 0.5s ease-out;
}

.schedule-show {
  right: 0;
}

.day {
  width: 300px;
  margin: 10px;
  padding: 10px;
  background: rgb(95, 158, 160, 0.5);
}

.day-date {
  font-weight: bold;
}
</style>