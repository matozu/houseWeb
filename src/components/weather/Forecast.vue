<template>
  <div class="forecast">
    &nbsp 5 day forecast
    <hr />
    <table>
      <tr>
        <th v-for="day in forecast" key="day.dt">{{ day.day }}</th>
      </tr>
      <tr>
        <td v-for="day in forecast" key="day.dt">
          {{ calcTemp(day.main.temp) }}°
        </td>
      </tr>
      <tr>
        <td v-for="day in forecast" key="day.dt">
          <img :src="getIconUrl(day.weather[0].icon)" alt="" />
        </td>
      </tr>
      <tr>
        <td v-for="day in forecast" key="day.dt">
          {{ day.weather[0].main }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "Forecast",
  props: {
    forecast: Array,
  },
  methods: {
    calcTemp(tempK) {
      return Math.round(Number(tempK) - 273.15);
    },
    getIconUrl(icon) {
      return `http://openweathermap.org/img/w/${icon}.png`;
    },
  },
};
</script>

<style lang="scss" scoped>
.forecast {
  width: 100%;
  margin-top: 10px;
  text-align: left;
  transition: all 1s ease-in-out;

  table {
    transition: all 0.5s ease-in-out;
    width: calc(100% + 15px);
    margin-left: -5px;
    margin-top: 10px;
    text-align: center;
    line-height: 1.5em;
  }
}
</style>