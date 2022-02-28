import { createStore } from "vuex";
import axios from "axios";
import config from "../../backend.config.json";

export default createStore({
  state: {
    schedule: {},
    username: "",
  },
  getters: {
    getSchedule: (state) => {
      return state.schedule;
    },
    getScheduleById: (state) => (id) => {
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

    getUsername: (state) => {
      return state.username;
    },
  },
  actions: {
    async fetchSchedule({ commit }) {
      try {
        const result = await axios.get(`${config.host}api/schedule`);
        commit("addSchedule", result.data);
      } catch (e) {
        console.log(e);
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
        console.log("addToSchedule Error -> " + e);
      }
    },
    async editNote({ commit }, note) {
      try {
        const result = await axios.put(`${config.host}api/schedule`, note);
      } catch (e) {
        console.log("editSchedule Error -> " + e);
      }
    },
    async deleteFromSchedule({ commit }, id) {
      if (confirm("are you shure?")) {
        try {
          const result = await axios.delete(`${config.host}api/schedule/${id}`);
          commit("deleteFromSchedule", id);
        } catch (e) {
          console.log(`deleteFromSchedule error -> ${e}`);
        }
      }
    },
    async login({ commit }, loginData) {
      try {
        const result = await axios.post(`${config.host}api/auth`, loginData);
        console.log(`user ${result.data.username} is logged in`);
        commit("setUsername", result.data.username);
        const token = result.headers["x-auth-token"];
        localStorage.setItem("x-auth-token", token);
        localStorage.setItem("username", result.data.username);
        axios.defaults.headers.post["x-auth-token"] = token;
        axios.defaults.headers.delete["x-auth-token"] = token;
        axios.defaults.headers.put["x-auth-token"] = token;
      } catch (e) {
        if (e.request != undefined) {
          // console.log("response :" + e.request.response);
          throw e;
        } else {
          console.log(e);
        }
      }
    },
    logout({ commit }) {
      commit("setUsername", "");
      localStorage.removeItem("x-auth-token");
      delete axios.defaults.headers.post["x-auth-token"];
      delete axios.defaults.headers.delete["x-auth-token"];
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
    setUsername(state, username) {
      state.username = username;
    },
    editSchedule(state, note) {
      let noteInSchedule = this.getScheduleById(note.id);
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
});
