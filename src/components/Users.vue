<template>
  <transition>
    <div class="users-container" v-if="username && showUsers">
      <div class="users">
        <i class="fa fa-close" @click="setShowUsers(false)"></i>
        <div
          :class="['user', user.isConnected ? 'user-online' : '']"
          @click="
            setChatUsername(user.username);
            setShowUsers(false);
          "
          v-for="user in users"
        >
          {{ user.username }}
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters(["users", "username", "showUsers"]),
  },
  methods: {
    ...mapMutations(["setShowUsers", "setChatUsername"]),
  },
};
</script>

<style scoped lang="scss">
.users-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 80%;
  width: 100%;
}

.users {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 30%;
  padding: 10px;
  background: rgb(255, 255, 255);
  border: 1px solid whitesmoke;
  border-radius: 5px;

  i {
    position: absolute;
    top: 0;
    right: 0;
    margin: 8px 10px;
    color: gray;
    font-size: 1em;
    cursor: pointer;
  }
}

.user {
  padding: 5px;
  margin: 10px;
  width: 50%;
  text-align: center;
  background: rgb(245, 245, 245, 0.8);
  border: 1px solid gray;
  cursor: pointer;
}

.user-online {
  border: 2px solid green;
  background: rgb(0, 128, 0, 0.5);
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: scale(1.5);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.8s ease-in-out;
  z-index: 3;
}

.v-enter-to,
.v-leave-from {
  opacity: 1;
  transform: scale(1);
}

@media (max-width: 800px) {
  .users {
    width: 60%;
    z-index: 3;
  }
}
</style>