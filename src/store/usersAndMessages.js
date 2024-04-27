import axios from "axios";
import config from "../../backend.config.json";
import io from "../socket";

export default {
  state: {
    username: "",
    messages: {},
    chatUsername: null,
    showMessages: false,
    showUsers: false,
    users: {},
  },
  getters: {
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
  },
  actions: {
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
    setUsername(state, username) {
      state.username = username;
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
  },
};
