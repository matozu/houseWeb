<template>
  <div class="schedule">
    <button-glow
      :text="show ? 'Hide Schedule' : 'Show Schedule'"
      @click="show = !show"
    />
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
                @click="save(note._id)"
                v-if="getUsername === note.username && editableId === note._id"
                class="fa fa-save"
              ></i>

              <i
                @click="cancel(note._id)"
                v-if="getUsername === note.username && editableId === note._id"
                class="fa fa-times"
              ></i>

              <i
                @click="editInSchedule(note._id)"
                v-if="getUsername === note.username && editableId != note._id"
                class="fa fa-edit"
              ></i>
              <i
                @click="deleteFromSchedule(note._id)"
                v-if="getUsername === note.username"
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
      editableId: null,
      oldText: "",
    };
  },
  computed: {
    ...mapGetters(["getSchedule", "getUsername"]),
  },
  methods: {
    ...mapActions(["deleteFromSchedule", "editNote"]),
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
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: left;
  align-items: center;
}

.notes {
  border: 1px solid white;
  position: relative;
  width: 100%;
  max-height: 90%;
  padding-left: 10px;
  padding-right: 10px;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-behavior: smooth;
  margin-right: 20px;
  margin-top: 55px;
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
</style>