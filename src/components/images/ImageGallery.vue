<template>
  <div class="images-header">images</div>
  <div class="image-container">
    <img
      v-for="(image, index) in images"
      @click="show(index)"
      class="image"
      :src="image"
      alt=""
      @mouseenter="emitImageHovered(index)"
    />
  </div>
  <div class="images-footer"></div>
  <lightbox :images="images" />
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Lightbox from "./Lightbox.vue";
export default {
  components: {
    Lightbox,
  },
  emits: ["imageHovered"],
  computed: {
    ...mapGetters(["images"]),
  },
  methods: {
    ...mapMutations([
      "setShowLightbox",
      "setscrollPosition",
      "setLightboxIndex",
    ]),
    show(index) {
      this.setLightboxIndex(index);
      this.setShowLightbox(true);
      this.setscrollPosition(
        document.documentElement.scrollTop || document.body.scrollTop
      );
    },
    emitImageHovered(index) {
      this.$emit("imageHovered", index);
    },
  },
};
</script>

<style scoped>
.images-header {
  text-align: center;
  max-width: 1130px;
  padding: 10px;
  margin: 20px auto;
  background: rgb(128, 128, 223);
}

.image-container {
  flex-wrap: wrap;
  max-width: 1130px;
  margin: auto;
  display: flex;
  justify-content: center;
}
.image {
  width: auto;
  height: 100px;
  margin: 10px;
  cursor: pointer;
}

.images-footer {
  text-align: center;
  max-width: 1130px;
  padding: 2px;
  margin: 20px auto;
  background: rgb(128, 128, 223);
}
</style>