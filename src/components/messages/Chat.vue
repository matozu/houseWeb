<template>
  <div class="chat-container" v-if="getChatUsername">
    <close-icon @click="setChatUsername(null)"></close-icon>
    <div class="username">
      {{ getChatUsername }}
    </div>
    <div class="chat">
      <div
        class="chat-messages"
        v-for="message in getMessages[getChatUsername]"
      >
        <div
          :class="[
            'chat-message',
            message.from === getUsername
              ? 'chat-message-left'
              : 'chat-message-right',
          ]"
        >
          {{ message.text }}
        </div>
      </div>
    </div>
    <div class="chat-input-form">
      <input type="text" v-model="messageText" />
      <button @click="sendMessage">send</button>
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
    ...mapGetters(["getMessages", "getUsername", "getChatUsername"]),
  },
  methods: {
    ...mapMutations(["setChatUsername"]),
    sendMessage() {
      io.emit("postMessage", {
        to: this.getChatUsername,
        text: this.messageText,
      });
      this.messageText = "";
    },
  },
};
</script>

<style scoped lang="scss">
.chat-container {
  position: absolute;
  bottom: 10px;
  right: 50px;
  width: 300px;
  background: rgb(100, 149, 237, 0.5);
  border-radius: 5px;
  padding: 10px;
}

.chat {
  max-height: 250px;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-behavior: smooth;
}

.chat-message {
  margin: 5px;
  border-radius: 3px;
}

.chat-message-left {
  text-align: left;
  margin-left: 0;
  background: rgba(180, 248, 79, 0.8);
}

.chat-message-right {
  text-align: right;
  margin-right: 0;
  background: rgba(235, 75, 46, 0.8);
}

.chat-input-form {
  margin-top: 10px;
}

.username {
  position: absolute;
  top: -17px;
  left: -8px;
  background: gray;
  padding: 3px;
  border-radius: 5px;
  border: 1px solid white;
}
</style>