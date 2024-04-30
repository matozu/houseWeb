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

socketIO.on("connected", (data) => {
  store.commit(
    "addMessages",
    groupMessages(data.messages, localStorage.getItem("username"))
  );
  store.commit("addUsers", data.users);
});

socketIO.on("message", (message) => {
  store.commit("addMessage", message);
});

socketIO.on("newUserConnected", (username) => {
  store.commit("updateUserStatus", { username: username, status: true });
});

socketIO.on("disconnected", (username) => {
  store.commit("updateUserStatus", { username: username, status: false });
  console.log(username + " disconnected");
});

export default socketIO;
