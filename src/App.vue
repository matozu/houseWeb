<template>
  <div class="container">
    <div class="welcome">
      <h1>welcome to house web</h1>
      <WeatherCard />
    </div>
  </div>
</template>

<script>
import WeatherCard from "./components/weather/WeatherCard.vue";
export default {
  components: {
    WeatherCard,
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
}

body {
  background-image: url("img/bck.jpg");
  background-position: center;
  background-size: 100%;
  background-repeat: no-repeat;
  font-family: "Poppins", sans-serif;
}

.container {
  /* border: 1px solid black; */
  width: 100vw;
  margin: auto;
}

.welcome {
  /* border: 1px solid black; */
  margin: 30vh 0 auto;
  text-align: center;

  h1 {
    color: whitesmoke;
    // text-shadow: 1px 1px 1px gray;
  }
}
</style>
