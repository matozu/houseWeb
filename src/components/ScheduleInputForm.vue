<template>
  <div class="input" id="if" ref="if">
    <form action="">
      <div v-if="date" class="form-date">
        {{ String(date.getDate()).padStart(2, "0") }}
        {{ String(date.getMonth() + 1).padStart(2, "0") }}
        {{ date.getFullYear() }}
      </div>

      <textarea
        name="form-text"
        v-model="text"
        class="form-text"
        cols="25"
        rows="10"
      ></textarea>

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
  width: 250px;
  background: rgb(222, 184, 135);
  padding: 15px;
  text-align: center;
  transition: all 0.5s ease-out;
  margin-top: 20px;
  margin-bottom: 100px;
  border-radius: 8px;
  z-index: 1;

  .form-date {
    margin-bottom: 10px;
  }

  .form-btn {
    display: block;
    margin: 10px auto;
  }
}
</style>