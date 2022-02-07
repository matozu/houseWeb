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
.show-btn {
  width: 5em;
  margin: 10px;
  padding: 5px;
  background: rgb(100, 149, 237, 0.8);
  text-align: center;
  border-radius: 5px;
  transition: all 0.5s ease-in-out;
  // transform: scale(0.5);
  cursor: pointer;
}

</style>