import axios from "axios";
import config from "../../backend.config.json";

export default {
  state: {
    showLightbox: false,
    lightboxIndex: 0,
    images: [],
    scrollPosition: 0,
  },
  getters: {
    showLightbox: (state) => {
      return state.showLightbox;
    },
    lightboxIndex: (state) => {
      return state.lightboxIndex;
    },
    images: (state) => {
      return state.images;
    },
    scrollPosition: (state) => {
      return state.scrollPosition;
    },
  },
  actions: {
    async fetchImages({ commit }) {
      try {
        const result = await axios.get(`${config.host}api/images`);
        commit("addImages", result.data);
      } catch (e) {
        console.log("fetchImage error -> " + e.message);
      }
    },
  },
  mutations: {
    addImages(state, images) {
      images.forEach((image) => {
        let uri = String(image).slice(-9);
        state.images.push(`${config.host}${uri}`);
      });
    },
    setShowLightbox(state, show) {
      state.showLightbox = show;
    },
    setLightboxIndex(state, index) {
      state.lightboxIndex = index;
    },
    setscrollPosition(state, position) {
      state.scrollPosition = position;
    },
  },
};
