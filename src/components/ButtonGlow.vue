<template>
  <div class="glow-on-hover" @click="$event.target.classList.toggle('active')">
    {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    text: String,
  },
};
</script>

<style scoped>
.glow-on-hover {
  width: 5em;
  /* height: 50px; */
  display: inline-block;
  padding: 5px;
  text-align: center;
  border: none;
  outline: none;
  margin: 10px;
  color: #fff;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 5px;
  transition: all 0.5s ease-in-out;
}

.active {
  transform: rotate(360deg);
}

.glow-on-hover:before {
  content: "";
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff7300,
    #fffb00,
    #48ff00,
    #00ffd5,
    #002bff,
    #7a00ff,
    #ff00c8,
    #ff0000
  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing 20s linear infinite;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
}

.glow-on-hover:active {
  color: #000;
}

.glow-on-hover:active:after {
  background: transparent;
}

.glow-on-hover:hover:before {
  opacity: 1;
}

.glow-on-hover:after {
  z-index: -1;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgb(100, 149, 237);
  left: 0;
  top: 0;
  border-radius: 10px;
}

@keyframes glowing {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}
</style>