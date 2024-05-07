<template>
  <div class="lightbox" id="lightbox" v-show="showLightbox" @click="hide">
    
    <div class="image-container">
        <div class="close" @click="hide">&times;</div>
      <div class="prev" @click.stop="prev" v-show="hasPrev"><span >&#10094</span></div>
      <img class="image" :src="images[lightboxIndex]" alt="" @click.stop=""/>
      <div class="next" @click.stop="next" v-show="hasNext" ><span >&#10095</span></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["showLightbox", "scrollPosition", "lightboxIndex"]),
    hasNext() {
      return this.lightboxIndex + 1 < this.images.length;
    },
    hasPrev() {
      return this.lightboxIndex - 1 >= 0;
    },
  },
  watch: {
    showLightbox(newValue) {
      document.getElementById("lightbox").style.top =
        this.scrollPosition + "px";
      if (newValue) {
        this.preventScrolling();
      } else {
        this.enableScrolling();
      }
    },
  },
  methods: {
    ...mapMutations(["setShowLightbox", "setLightboxIndex"]),
    preventScroll(e) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    },
    preventScrolling() {
      document
        .getElementsByTagName("BODY")[0]
        .addEventListener("wheel", this.preventScroll, { passive: false });
    },
    enableScrolling() {
      document
        .getElementsByTagName("BODY")[0]
        .removeEventListener("wheel", this.preventScroll);
    },
    show(index) {
      this.setLightboxIndex(index);
    },
    hide() {
      this.setShowLightbox(false);
      this.setLightboxIndex(0);
    },
    next() {
      if (this.hasNext) {
        this.setLightboxIndex(this.lightboxIndex + 1);
      }
    },
    prev() {
      if (this.hasPrev) {
        this.setLightboxIndex(this.lightboxIndex - 1);
      }
    },
    onKeydown(e) {
      if (this.showLightbox) {
        switch (e.key) {
          case "ArrowRight":
            this.next();
            break;
          case "ArrowLeft":
            this.prev();
            break;
          case "ArrowUp":
          case "ArrowDown":
          case " ":
            e.preventDefault();
            break;
          case "Escape":
            this.hide();
            break;
        }
      }
    },
  },
  mounted() {
    window.addEventListener("keydown", this.onKeydown);
  },
  destroyed() {
    window.removeEventListener("keydown", this.onKeydown);
  },
};
</script>

<style scoped>
.lightbox {
  position: absolute;
  z-index: 1;
  margin-left: -10px;
  margin-top: -10px;
  width: 100vw;
  height: calc(100vh + 10px);
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  background: rgb(0, 0, 0, 0.9);
  justify-content: center;
}

.close {
  position: absolute;
  top: 10px;
  right: 20px;
  color: gray;
  font-size: 2rem;
  font-weight: bolder;
  cursor: pointer;
}
.image-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

.prev,
.next {
  font-size: 3rem;
  color: gray;
  cursor: pointer;
  width: 45%;
  height: 100%;
  display: flex;
  align-items: center;
}
.prev {
  position: absolute;
  left: 5px;
}

.next {
  position: absolute;
  right: 5px;
  justify-content: right;
}
.image {
  width: auto;
  height: auto;
  max-height: 70vh;
  max-width: 90vw;
}

.images {
  margin: 10px;
  max-width: 90vw;
  max-height: 15vh;
  overflow: auto;
  white-space: nowrap;
}

.img {
  width: auto;
  height: 10vh;
  border: 2px solid gray;
  display: inline-block;
  vertical-align: top;
  margin: 0 10px;
}
@media (max-width: 500px) {
  .prev,
  .next {
    font-size: 2rem;
  }

  .close {
    font-size: 1.5rem;
  }
}
</style>