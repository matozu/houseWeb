import { io } from "socket.io-client";
import store from "../store";
import { groupBy, groupMessages } from "../helpers";
import cnf from "../../backend.config.json";

const socketIO = io(cnf.host, {
  auth: {
    token: localStorage.getItem("x-auth-token"),
  },
});

socketIO.on("connect_error", (error) => {
  console.log(error.message);
});

socketIO.on("messages", (messages) => {
  store.commit("addMessages", groupMessages(messages, store.state.username));
});

socketIO.on("message", (message) => {
  store.commit("addMessage", message);
});

export default socketIO;
