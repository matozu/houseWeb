import { createStore } from "vuex";
import axios from "axios";
import config from "../../backend.config.json";
import io from "../socket";

export default createStore({
  state: {
    schedule: {},
    username: "",
    messages: null,
    chatUsername: null,
    showMessages: false,
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
    getMessages: (state) => {
      return state.messages;
    },
    getChatUsername: (state) => {
      return state.chatUsername;
    },
    getShowMessages: (state) => {
      return state.showMessages;
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
    // async fetchMessages({ commit }) {
    //   try {
    //     const conf = {
    //       headers: {
    //         "x-aut-token": localStorage.getItem("x-auth-token"),
    //       },
    //     };
    //     const result = await axios.get(`${config.host}api/messages`, conf);
    //     commit("addMessages", result.data);
    //   } catch (e) {
    //     console.log(e.message);
    //   }
    // },
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
    async login({ commit, dispatch }, loginData) {
      try {
        const result = await axios.post(`${config.host}api/auth`, loginData);
        console.log(`user ${result.data.username} is logged in`);
        const token = result.headers["x-auth-token"];
        localStorage.setItem("x-auth-token", token);
        localStorage.setItem("username", result.data.username);
        axios.defaults.headers.post["x-auth-token"] = token;
        axios.defaults.headers.delete["x-auth-token"] = token;
        axios.defaults.headers.put["x-auth-token"] = token;
        commit("setUsername", result.data.username);
        io.auth.token = token;
        io.connect();
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
      commit("addMessages", null);
      commit("setShowMessages", false);
      commit("setChatUsername", null);

      localStorage.removeItem("x-auth-token");
      delete axios.defaults.headers.post["x-auth-token"];
      delete axios.defaults.headers.delete["x-auth-token"];
      io.auth.token = null;
      io.close();
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
    addMessages(state, messages) {
      state.messages = messages;
    },
    addMessage(state, message) {
      if (message.from === state.username) {
        if (state.messages[message.to]) {
          state.messages[message.to].push(message);
        } else {
          state.messages[message.to] = [message];
        }
      } else {
        if (state.messages[message.from]) {
          state.messages[message.from].push(message);
        } else {
          state.messages[message.from] = [message];
        }
      }
    },
    setChatUsername(state, username) {
      state.chatUsername = username;
    },
    setShowMessages(state, show) {
      state.showMessages = show;
    },
  },
});
