<template>
  <div class="schedule" id="schedule">
    <transition-group>
      <button-normal
        key="buttonNormal"
        v-if="username"
        text="Pick a Date"
        @click="showDatePicker = !showDatePicker"
      />

      <DatePicker
        key="datePicker"
        v-if="showDatePicker && username"
        v-model="date"
        color="blue"
        is-dark
      />

      <ScheduleInputForm
        key="scheduleInputForm"
        v-if="date && username"
        :date="date"
        @close-form="date = null"
      />
      <div class="notes" key="notes">
        <div class="day" v-for="(day, index) in schedule">
          <div class="day-date">
            {{ new Date(index).getDate() }}.
            {{ new Date(index).getMonth() + 1 }}.
            {{ new Date(index).getFullYear() }}.
          </div>

          <div class="note" v-for="note in day">
            <div class="note-header">
              <span class="note-username">{{ note.username }} :</span>
              <span class="note-icons">
                <i
                  @click="save(note._id)"
                  v-if="username === note.username && editableId === note._id"
                  class="fa fa-save"
                ></i>

                <i
                  @click="cancel(note._id)"
                  v-if="username === note.username && editableId === note._id"
                  class="fa fa-times"
                ></i>

                <i
                  @click="editInSchedule(note._id)"
                  v-if="username === note.username && editableId != note._id"
                  class="fa fa-edit"
                ></i>
                <i
                  @click="deleteFromSchedule(note._id)"
                  v-if="username === note.username"
                  class="fa fa-trash"
                ></i>
              </span>
            </div>
            <span class="note-text" :id="note._id">
              {{ note.text.replace(/&nbsp;/g, " ") }}
            </span>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { DatePicker } from "v-calendar";
import ButtonNormal from "./ButtonNormal.vue";
import ScheduleInputForm from "./calendar/ScheduleInputForm.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "Schedule",
  components: {
    DatePicker,
    ButtonNormal,
    ScheduleInputForm,
  },
  data() {
    return {
      date: null,
      show: false,
      showDatePicker: false,
      editableId: null,
      oldText: "",
    };
  },
  computed: {
    ...mapGetters(["schedule", "username", "getShowSchedule"]),
  },
  methods: {
    ...mapActions(["deleteFromSchedule", "editNote"]),
    ...mapMutations(["setShowSchedule"]),
    editInSchedule(id) {
      const el = document.getElementById(id);
      el.contentEditable = true;
      el.classList.add("note-text-edit");
      this.editableId = id;
      this.oldText = el.innerHTML;
    },
    save(id) {
      const el = document.getElementById(id);
      const newText = el.innerHTML.replace(/\u00a0/g, " ");
      el.contentEditable = false;
      el.classList.remove("note-text-edit");
      this.editableId = null;
      this.oldText = "";
      try {
        this.editNote({ id: id, text: newText });
      } catch (e) {
        console.log(e);
      }
    },
    cancel(id) {
      const el = document.getElementById(id);
      el.innerHTML = this.oldText;
      el.contentEditable = false;
      el.classList.remove("note-text-edit");
      this.editableId = null;
      this.oldText = "";
    },
  },
};
</script>


<style scoped lang="scss">
.schedule {
  margin: auto;
  margin-top: 20px;
  margin-bottom: 0;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}

.notes {
  position: relative;
  max-width: 1200px;
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  -o-transition: all 0.5s;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
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
      cursor: pointer;
    }
  }
}

.note-text {
  word-break: break-all;
}

.note-text-edit {
  background: gainsboro;
}

.day-date {
  font-weight: bold;
  text-align: center;
}

.v-enter-from {
  opacity: 0;
  transform: translateY(-150px) scale(0);
}

.v-enter-active {
  transition: all 0.5s ease-in;
}

.v-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.v-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.v-leave-active {
  transition: all 0.5s ease-in;
  position: absolute;
}

.v-leave-to {
  opacity: 0;
  transform: translateY(-150px) scale(0);
}

.v-move {
  transition: transform 0.5s ease;
}
</style>