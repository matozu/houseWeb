import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import io from "./socket";

createApp(App).use(store, io).mount("#app");
