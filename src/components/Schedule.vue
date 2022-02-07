<template>
  <div class="schedule">
    <button-glow
      :text="show ? 'Hide Schedule' : 'Show Schedule'"
      @click="show = !show"
    />

    <div :class="['show-btn', { 'hide-btn': show }]" @click="show = !show">
      <!-- {{ show ? "Hide Schedule" : "Show Schedule" }} -->
    </div>

    <div :class="['notes', { 'notes-show': show }]">
      <div class="day" v-for="(day, index) in getSchedule">
        <div class="day-date">
          {{ new Date(index).getDate() }}. {{ new Date(index).getMonth() + 1 }}.
          {{ new Date(index).getFullYear() }}.
        </div>

        <div class="note" v-for="note in day">
          <div class="note-header">
            <span class="note-username">{{ note.username }} :</span>
            <span class="note-icons">
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
            </span>
          </div>
          <span class="note-text">
            {{ note.text }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ButtonGlow from "../components/ButtonGlow.vue";
export default {
  name: "Schedule",
  components: {
    ButtonGlow,
  },
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
.schedule {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: left;
  align-items: center;
}

.notes {
  width: 100%;
  height: 90%;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-behavior: smooth;
  margin-right: 20px;
  margin-top: 80px;
  transition: all 0.5s ease-in-out;
  transform: scale(0);
}

.notes-show {
  transform: scale(1);
}

.day {
  margin: 10px auto;
  padding: 10px;
  background: rgb(95, 158, 160, 0.8);
  border-radius: 5px;
}

.note {
  position: relative;
  border: 1px solid black;
  background: rgb(95, 158, 160, 0.3);
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
}

.note-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  .note-username {
    font-weight: bold;
  }

  .note-icons {
    i {
      margin: 0 5px;
    }
  }
}

.note-text {
  word-break: break-all;
}

.day-date {
  font-weight: bold;
  text-align: center;
}
</style>