<template>
  <div class="input">
    <form action="">
      <div class="form-date">
        {{ String(date.getDate()).padStart(2, "0") }}
        {{ String(date.getMonth() + 1).padStart(2, "0") }}
        {{ date.getFullYear() }}
      </div>
      <textarea name="form-text" v-model="text" class="form-text"></textarea>
      <button class="form-btn" @click.prevent="save()">Save</button>
      <button @click.prevent="$emit('close-form')">Close</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      text: "",
    };
  },
  props: {
    date: {
      type: Date,
      required: true,
    },
  },
  methods: {
    ...mapActions(["addToSchedule"]),
    save(e) {
      if (this.text != "") {
        this.addToSchedule({ date: this.date, text: this.text });
        this.text = "";
        this.$emit("close-form");
      }
    },
  },
};
</script>

<style scoped lang="scss">
.input {
  width: 100%;
  padding: 15px;
  text-align: center;
  transition: all 0.5s ease-out;
  border-radius: 8px;
  z-index: 1;

  .form-date {
    padding: 10px;
    background-color: rgb(255, 255, 255, 0.8);
    border-radius: 10px;
    display: inline-block;
    margin: auto;
    margin-bottom: 10px;
  }

  .form-text {
    width: 50%;
    display: block;
    margin: auto;
    background-color: rgb(255, 255, 255, 0.8);
    text-align: center;
    border: 1px solid black;
    padding: 10px;
    border-radius: 5px;
  }

  .form-btn {
    margin: 10px;
  }
}
</style>