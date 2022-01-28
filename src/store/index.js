import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    schedule: [],
  },
  getters: {
    getSchedule: (state) => {
      return state.schedule;
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
    async addToSchedule({ commit }, day) {
      try {
        const res = await axios.post("http://localhost:5000/api/schedule", day);
      } catch (e) {
        console.log(e);
      }
      commit("addDayToState", day);
    },
  },
  mutations: {
    addDayToState(state, item) {
      state.schedule.push(item);
    },
    addSchedule(state, schedule) {
      schedule.map((s) => {
        state.schedule.push({ date: new Date(s.date), text: s.tex });
      });
    },
  },
});
