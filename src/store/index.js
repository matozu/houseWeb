import { createStore } from "vuex";
import lightboxStore from "./lightbox";
import usersAndMessagesStore from "./usersAndMessages";
import scheduleStore from "./schedule";

export default createStore({
  modules: {
    scheduleStore,
    lightboxStore,
    usersAndMessagesStore,
  },
});
