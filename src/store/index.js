import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    schedule: {},
    username: "",
  },
  getters: {
    getSchedule: (state) => {
      return state.schedule;
    },
    getUsername: (state) => {
      return state.username;
    },
  },
  actions: {
    async fetchSchedule({ commit }) {
      try {
        const result = await axios.get("http://localhost:5000/api/schedule");
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
        const result = await axios.post(
          "http://localhost:5000/api/schedule",
          day
        );
        commit("addSchedule", result.data);
      } catch (e) {
        console.log("addToSchedule Error -> " + e);
      }
    },
    async deleteFromSchedule({ commit }, id) {
      console.log(`deleteFromSchedule:${id}`);
      try {
        const result = await axios.delete(
          `http://localhost:5000/api/schedule/${id}`
        );
        commit("addSchedule", result.data);
      } catch (e) {
        console.log(`deleteFromSchedule error -> ${e}`);
      }
    },
    async login({ commit }, loginData) {
      try {
        const result = await axios.post(
          "http://localhost:5000/api/auth",
          loginData
        );
        console.log(`user ${result.data.username} is logged in`);
        commit("setUsername", result.data.username);
        const token = result.headers["x-auth-token"];
        localStorage.setItem("x-auth-token", token);
        localStorage.setItem("username", result.data.username);
        axios.defaults.headers.post["x-auth-token"] = token;
        axios.defaults.headers.delete["x-auth-token"] = token;
      } catch (e) {
        if (e.request != undefined) {
          console.log("response :" + e.request.response);
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
      for (let group in schedule) {
        for (let index in schedule[group]) {
          schedule[group][index].date = new Date(schedule[group][index].date);
        }
      }
      state.schedule = schedule;
    },
    setUsername(state, username) {
      state.username = username;
    },
  },
});
