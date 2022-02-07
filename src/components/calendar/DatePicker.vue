<template>
  <div v-show="getUsername != ''" class="calendar">
    <div
      :class="['date-picker-container', { 'date-picker-show': showCalendar }]"
    >
      <div class="date-picker-close" @click="showCalendar = false"></div>
      <DatePicker v-model="date" class="date-picker" />
    </div>

    <button-glow
      @click="showCalendar = !showCalendar"
      :text="showCalendar ? 'Close Calendar' : 'Show Calendar'"
    />
  </div>
  <ScheduleInputForm
    :date="date"
    :style="date ? 'transform: scale(1)' : 'transform: scale(0)'"
    @close-form="date = null"
  />
</template>

<script>
import { DatePicker } from "v-calendar";
import ButtonGlow from "../ButtonGlow.vue";
import ScheduleInputForm from "./ScheduleInputForm.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    DatePicker,
    ScheduleInputForm,
    ButtonGlow,
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
  },
};
</script>

<style scoped lang="scss">
.calendar {
  display: flex;
  align-items: center;
}

.date-picker-container {
  display: inline-block;
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