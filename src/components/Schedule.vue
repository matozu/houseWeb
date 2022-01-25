<template>
  <div class="schedule">
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
  computed: {
    ...mapGetters(["getSchedule"]),
  },
};
</script>

<style scoped>
.schedule {
  position: absolute;
  top: 0;
  right: 0;
}

.day {
  width: 300px;
  margin: 10px;
  background: rgb(95, 158, 160, 0.4);
}

.day-date {
  font-weight: bold;
}
</style>