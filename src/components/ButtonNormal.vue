<template>
  <div class="show-btn">
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
  margin: 10px;
  padding: 5px;
  background: rgb(100, 149, 237, 0.8);
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
}
</style>