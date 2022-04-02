<template>
  <div class="message-container" v-if="showMessages">
    <div class="messages-header">
      messages
      <i class="fa fa-close" @click="setShowMessages(false)"></i>
    </div>
    <div
      class="message"
      @click="setChatUsername(key)"
      v-for="(value, key) in messages"
    >
      <span class="username"
        ><b>{{ key }}:</b></span
      >
      <span class="text">
        {{ value[value.length - 1].text }}
      </span>
    </div>
    <div v-if="messagesIsEmpty">no messages</div>
    <i class="start-chat fa fa-plus" @click="setShowUsers(true)"></i>
  </div>
</template>

<script>
import CloseIcon from "../CloseIcon.vue";
import { mapGetters, mapMutations } from "vuex";
import _ from "lodash";
export default {
  name: "Messages",
  components: {
    CloseIcon,
  },
  data() {
    return {
      messageText: "",
    };
  },
  computed: {
    ...mapGetters(["messages", "username", "showMessages"]),
    messagesIsEmpty() {
      return _.isEmpty(this.messages);
    },
  },
  methods: {
    ...mapMutations(["setChatUsername", "setShowMessages", "setShowUsers"]),
  },
  created() {},
};
</script>

<style scoped lang="scss">
.message-container {
  position: absolute;
  top: 50px;
  right: 1vw;
  max-width: 300px;
  max-height: 250px;
  width: 30vw;
  background: rgb(255, 255, 255, 0.1);
  border: 1px dotted whitesmoke;
  border-radius: 0 0.5px 5px;
  padding: 10px;
}
.message {
  display: flex;
  margin: 5px;
  background: rgb(245, 245, 245, 0.4);
  border: 1px solid whitesmoke;
  border-radius: 2px;
  padding: 5px;
  cursor: pointer;

  .username {
    background: rgb(245, 245, 245, 0.8);
    padding: 0 2px;
    margin-right: 12px;
  }

  .text {
    height: 1em;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}

.start-chat {
  display: flex;
  justify-content: right;
  width: 95%;
  color: whitesmoke;
  font-size: 0.8em;
  cursor: pointer;
  margin-top: 10px;
}

.messages-header {
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

.close-icon {
  position: absolute;
  right: 0;
  color: white;
}

@media (max-width: 800px) {
  .message-container {
    max-width: 400px;
    width: 80vw;
    right: calc(20vw / 2);
    background: rgb(130, 187, 225, 0.95);
  }
}
</style>