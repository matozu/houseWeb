<template>
  <div :class="['show-btn', { 'hide-btn': show }]" @click="show = !show">
    {{ show ? "Hide Schedule" : "Show Schedule" }}
  </div>

  <div :class="['schedule', { 'schedule-show': show }]">
    <div class="day" v-for="(day, index) in getSchedule">
      {{ new Date(index).getDate() }}
      {{ new Date(index).getMonth() + 1 }}
      {{ new Date(index).getFullYear() }}

      <div class="note" v-for="note in day">
        <div class="icons">
          <i
            @click="editInSchedule(note.id)"
            v-if="getUsername === note.username"
            class="fa fa-edit"
          ></i>
          <i
            @click="deleteFromSchedule(note.id)"
            v-if="getUsername === note.username"
            class="fa fa-trash"
          ></i>
        </div>

        {{ note.username }} :
        {{ note.text }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Schedule",
  data() {
    return {
      show: false,
    };
  },
  computed: {
    ...mapGetters(["getSchedule", "getUsername"]),
  },
  methods: {
    ...mapActions(["deleteFromSchedule"]),
  },
};
</script>

<style scoped lang="scss">
.show-btn {
  height: 30px;
  margin: 10px auto;
  background: rgb(95, 158, 160, 0.83);
  text-align: center;
  padding: 5px 10px;
  cursor: pointer;
}

.hide-btn {
}

.schedule {
  margin-bottom: 50px;
}

.schedule-show {
}

.day {
  max-width: 50%;
  margin: 10px auto;
  padding: 10px;
  background: rgb(95, 158, 160, 0.5);
  border-radius: 5px;
}

.note {
  position: relative;
  border: 1px solid black;
  background: rgb(95, 158, 160, 0.3);
  border-radius: 10px;

  margin: 10px;
  padding: 5px;
}

.icons {
  position: absolute;
  bottom: 5px;
  right: 5px;

  i {
    margin-left: 10px;
    cursor: pointer;
  }
}

.day-date {
  font-weight: bold;
}
</style>