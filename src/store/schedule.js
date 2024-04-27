import axios from "axios";
import config from "../../backend.config.json";

export default {
  state: {
    schedule: {},
  },
  getters: {
    schedule: (state) => {
      return state.schedule;
    },
    scheduleById: (state) => (id) => {
      let note = null;
      Object.entries(state.schedule).forEach(([key, value]) => {
        value.forEach((item) => {
          if (item._id === id) {
            note = item;
          }
        });
      });
      return note;
    },
  },

  actions: {
    async fetchSchedule({ commit }) {
      try {
        const result = await axios.get(`${config.host}api/schedule`);
        commit("addSchedule", result.data);
      } catch (e) {
        console.log(e.message);
      }
    },
    async addToSchedule({ commit }, data) {
      try {
        data.date.setHours(0, 0, 0, 0);
        const day = {
          ...data,
          username: this.state.username,
        };
        const result = await axios.post(`${config.host}api/schedule`, day);
        commit("addToSchedule", result.data);
      } catch (e) {
        console.log("addToSchedule error -> " + e.message);
      }
    },
    async editNote({ commit }, note) {
      try {
        const result = await axios.put(`${config.host}api/schedule`, note);
      } catch (e) {
        console.log("editNote error -> " + e);
      }
    },
    async deleteFromSchedule({ commit }, id) {
      if (confirm("are you shure?")) {
        try {
          const result = await axios.delete(`${config.host}api/schedule/${id}`);
          commit("deleteFromSchedule", id);
        } catch (e) {
          console.log(`deleteFromSchedule error -> ${e.message}`);
        }
      }
    },
  },
  mutations: {
    addSchedule(state, schedule) {
      const groupBy = (items, key) =>
        items.reduce(
          (result, item) => ({
            ...result,
            [item[key]]: [...(result[item[key]] || []), item],
          }),
          {}
        );

      state.schedule = groupBy(schedule, "date");
    },
    addToSchedule(state, note) {
      if (Object.keys(state.schedule).includes(note.date)) {
        state.schedule[note.date].push(note);
      } else {
        state.schedule[note.date] = [note];
      }
    },
    editSchedule(state, note) {
      let noteInSchedule = this.scheduleById(note.id);
      noteInSchedule.text = note.tex;
    },
    deleteFromSchedule(state, id) {
      Object.entries(state.schedule).forEach(([key, value]) => {
        value.forEach((item) => {
          if (item._id === id) {
            state.schedule[key].splice(value.indexOf(item), 1);
            if (state.schedule[key].length === 0) {
              delete state.schedule[key];
            }
          }
        });
      });
    },
  },
};
