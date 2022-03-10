<template>
  <div class="message-container" v-if="getShowMessages">
    <close-icon @click="setShowMessages(false)" />
    <div
      class="message"
      @click="setChatUsername(key)"
      v-for="(value, key) in getMessages"
    >
      <b>{{ key }}:</b>
      {{ value[value.length - 1].text }}
    </div>
  </div>
</template>

<script>
import CloseIcon from "../CloseIcon.vue";
import { mapGetters, mapMutations } from "vuex";
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
    ...mapGetters(["getMessages", "getUsername", "getShowMessages"]),
  },
  methods: {
    ...mapMutations(["setChatUsername", "setShowMessages"]),
  },
};
</script>

<style scoped lang="scss">
.message-container {
  position: absolute;
  top: 50px;
  right: 50px;
  width: 300px;
  background: rgb(100, 149, 237, 0.5);
  border-radius: 5px;
  padding: 10px;
}
.message {
  margin: 5px;
  background: rgb(100, 149, 237, 0.5);
  padding: 5px;
  cursor: pointer;
}
</style>