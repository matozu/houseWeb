import { createStore } from "vuex";
import axios from "axios";
import config from "../../backend.config.json";
import io from "../socket";

export default createStore({
  state: {
    schedule: {},
    username: "",
    messages: {},
    chatUsername: null,
    showMessages: false,
    showUsers: false,
    showLightbox: false,
    lightboxIndex: 0,
    scrollPosition: 0,
    users: {},
    images: [],
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

    username: (state) => {
      return state.username;
    },
    messages: (state) => {
      return state.messages;
    },
    chatUsername: (state) => {
      return state.chatUsername;
    },
    showMessages: (state) => {
      return state.showMessages;
    },
    users: (state) => {
      return state.users;
    },
    showUsers: (state) => {
      return state.showUsers;
    },
    showLightbox: (state) => {
      return state.showLightbox;
    },
    scrollPosition: (state) => {
      return state.scrollPosition;
    },
    lightboxIndex: (state) => {
      return state.lightboxIndex;
    },
    images: (state) => {
      return state.images;
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
    async fetchImages({ commit }) {
      try {
        const result = await axios.get(`${config.host}api/images`);
        commit("addImages", result.data);
      } catch (e) {
        console.log("fetchImage error -> " + e.message);
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
    async login({ commit, dispatch }, loginData) {
      try {
        const result = await axios.post(`${config.host}api/auth`, loginData);
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
          console.log("response :" + e.request.response);
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
      delete axios.defaults.headers.put["x-auth-token"];
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
    addImages(state, images) {
      images.forEach((image) => {
        let uri = String(image).slice(-9);
        state.images.push(`${config.host}${uri}`);
      });
    },
    setUsername(state, username) {
      state.username = username;
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
      if (state.chatUsername != null) {
        state.showSchedule = false;
      }
    },
    setShowMessages(state, show) {
      state.showMessages = show;
      if (state.showMessages == true) {
        state.showSchedule = false;
      }
    },
    addUsers(state, users) {
      state.users = users;
    },
    updateUserStatus(state, data) {
      try {
        console.log("update status 4 " + data.username + " : " + data.status);
        const index = state.users.findIndex(
          (user) => user.username === data.username
        );
        state.users[index].isConnected = data.status;
      } catch (e) {
        console.log(e.message);
      }
    },
    setShowUsers(state, show) {
      state.showUsers = show;
    },
    setShowLightbox(state, show) {
      state.showLightbox = show;
    },
    setscrollPosition(state, position) {
      state.scrollPosition = position;
    },
    setLightboxIndex(state, index) {
      state.lightboxIndex = index;
    },
  },
});
