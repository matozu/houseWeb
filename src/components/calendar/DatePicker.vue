<template>
  <button-normal text="Pick a Date" @click="showDatePicker = !showDatePicker" />
  <transition>
    <DatePicker v-model="date" v-show="showDatePicker" color="blue" is-dark />
  </transition>
  <transition>
    <ScheduleInputForm v-show="date" :date="date" @close-form="date = null" />
  </transition>
</template>

<script>
import { DatePicker } from "v-calendar";
import ButtonNormal from "../ButtonNormal.vue";
import ScheduleInputForm from "./ScheduleInputForm.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    DatePicker,
    ButtonNormal,
    ScheduleInputForm,
  },
  data() {
    return {
      date: null,
      showDatePicker: false,
    };
  },
  computed: {
    ...mapGetters(["username"]),
  },
  watch: {
    showDatePicker(newValue) {
      if (!newValue) {
        this.date = null;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-150px) scale(0);
}

.v-enter-active,
.v-leave-active {
  transition: all 10s ease-in-out;
}

.v-enter-to,
.v-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>