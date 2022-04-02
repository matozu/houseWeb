<template>
  <div class="chat-container" v-show="chatUsername">
    <div class="chat-header">
      <span>{{ username }}&nbsp;&larr;&rarr;&nbsp;{{ chatUsername }}</span>
      <i class="fa fa-close" @click="setChatUsername(null)"></i>
    </div>
    <div class="chat" id="chatDiv">
      <div
        :class="[
          'chat-message',
          message.from === username
            ? 'chat-message-left'
            : 'chat-message-right',
        ]"
        v-for="message in messages[chatUsername]"
      >
        {{ message.text }}
      </div>
    </div>
    <div class="chat-input-form">
      <input type="text" ref="chatInputField" v-model="messageText" />
      <button @click="sendMessage" ref="sendBtn">send</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import CloseIcon from "../CloseIcon.vue";
import io from "../../socket/index.js";

export default {
  data() {
    return {
      messageText: "",
    };
  },
  components: {
    CloseIcon,
  },
  computed: {
    ...mapGetters(["messages", "username", "chatUsername"]),
  },
  methods: {
    ...mapMutations(["setChatUsername"]),
    sendMessage() {
      io.emit("postMessage", {
        to: this.chatUsername,
        text: this.messageText,
      });
      this.messageText = "";
    },
  },
  watch: {
    chatUsername() {
      const chatDiv = document.getElementById("chatDiv");
      if (chatDiv) {
        chatDiv.scrollTop = chatDiv.scrollHeight;
      }
    },
  },
  mounted() {
    var self = this;
    this.$refs.chatInputField.addEventListener("keyup", function (event) {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        self.sendMessage();
      }
    });
  },
  updated() {
    const chatDiv = document.getElementById("chatDiv");
    if (chatDiv) {
      chatDiv.scrollTop = chatDiv.scrollHeight;
    }
  },
};
</script>

<style scoped lang="scss">
.chat-container {
  position: absolute;
  bottom: 10px;
  right: 1vw;
  max-width: 300px;
  width: 30vw;
  background: rgb(255, 255, 255, 0.1);
  border-radius: 5px;
  padding: 10px;
}

.chat {
  display: flex;
  flex-direction: column;
  height: 250px;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-behavior: smooth;
}

.chat-message {
  margin: 5px;
  border-radius: 3px;
  max-width: 80%;
  padding: 3px 5px;
  background: rgb(245, 245, 245, 0.7);
  border: 0.5px solid gray;
}

.chat-message-left {
  text-align: left;
  align-self: flex-start;
  border-left: 2px solid gray;
}

.chat-message-right {
  text-align: right;
  align-self: flex-end;
  border-right: 2px solid gray;
}

.chat-input-form {
  display: flex;
  margin-top: 10px;
  input {
    flex-grow: 1;
    width: 75%;
    margin-right: 3%;
  }
}

.chat-header {
  color: whitesmoke;
  display: flex;
  justify-content: center;
  background: rgb(255, 255, 255, 0.2);
  margin: -10px -10px 10px -10px;
  padding: 5px;
  i {
    position: absolute;
    right: 10px;
    cursor: pointer;
  }
}

@media (max-width: 800px) {
  .chat-container {
    max-width: 400px;
    width: 80vw;
    right: calc(20vw / 2);
    background: rgb(130, 187, 225, 0.95);
    border: 1px solid rgb(93, 92, 92);
  }

  .chat-message {
    border: none;
  }
}
</style>