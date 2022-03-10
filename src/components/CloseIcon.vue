<template>
  <div class="close-icon"></div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.close-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -3px;
  right: -3px;
  height: 12px;
  width: 12px;
  border: 1px solid white;
  border-radius: 100%;
  background: rgb(245, 245, 245);
  cursor: pointer;
}

.close-icon::after {
  content: "\00d7";
  font-size: 1em;
  color: gray;
}

.close-icon:hover::after {
  font-weight: bold;
}
</style>