<template>
  <div class="card" v-if="weather.name">
    <div class="header-left">
      <b>{{ weather.name }}</b> , {{ weather.weather[0].description }}
    </div>
    <div class="header-right">
      <img :src="getIconUrl(weather.weather[0].icon)" alt="" />
    </div>

    <div style="clear: both"></div>

    <div class="weather-main">
      <div class="main-temp">{{ calcTemp(weather.main.temp) }}°</div>
      <div class="main-right">
        Feels Like: {{ calcTemp(weather.main.feels_like) }} °C
        <br />
        Pressure:{{ weather.main.pressure }} hPa
        <br />
        Humidity: {{ weather.main.humidity }} %
        <br />
        Wind: {{ calcWindSpeed(weather.wind.speed) }} km/h,
        {{ calcWindDirection(weather.wind.deg) }}
      </div>
    </div>

    <div class="show-forecast-btn" @click="toggleShowForecast">
      <div
        :class="showForecast ? 'forecast-icon-minus' : 'forecast-icon'"
      ></div>
    </div>
    <div style="clear: both"></div>

    <forecast v-show="showForecast" :forecast="weather.forecast" />
  </div>
</template>

<script>
import axios from "axios";
import Forecast from "./Forecast.vue";

export default {
  name: "WeatherCard",
  components: {
    Forecast,
  },
  data() {
    return {
      weather: {},
      showForecast: false,
    };
  },
  methods: {
    calcTemp(tempK) {
      return Math.round(Number(tempK) - 273.15);
    },
    calcWindSpeed(ms_speed) {
      return Math.round(ms_speed * 3.6 * 10) / 10;
    },
    getIconUrl(icon) {
      return `http://openweathermap.org/img/w/${icon}.png`;
    },
    calcWindDirection(deg) {
      var val = Math.floor(deg / 22.5 + 0.5);
      var arr = [
        "N",
        "NNE",
        "NE",
        "ENE",
        "E",
        "ESE",
        "SE",
        "SSE",
        "S",
        "SSW",
        "SW",
        "WSW",
        "W",
        "WNW",
        "NW",
        "NNW",
      ];
      return arr[val % 16];
    },
    toggleShowForecast() {
      if (!this.weather.forecast) {
        this.fetchForecast().catch((e) => console.log(e));
      }
      this.showForecast = !this.showForecast;
    },
    async fetchWeather() {
      try {
        const result = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather/?q=gudovac&appid=524464013431281f7aabe3e488765d52"
        );
        this.weather = await result.data;
      } catch (e) {
        console.log(e);
      }
    },

    async fetchForecast() {
      const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const forecast = [];
      try {
        const result = await axios.get(
          "https://api.openweathermap.org/data/2.5/forecast/?q=gudovac&appid=524464013431281f7aabe3e488765d52"
        );
        const data = await result.data;
        if (typeof data !== "undefined") {
          for (let i = 7; i <= data.list.length; i += 8) {
            let dt = new Date(data.list[i].dt_txt);
            data.list[i].day = weekday[dt.getDay()];
            forecast.push(data.list[i]);
          }

          this.weather.forecast = forecast;
        } else {
          throw "problem with fetching forecast";
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  created() {
    this.fetchWeather();
  },
};
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  // width: 300px;
  border: 1px solid gray;
  border-radius: 5px;
  margin: 30px auto;
  padding: 20px;
  background: rgb(220, 220, 220, 0.6);
}

.header-left {
  margin-top: 12px;
  margin-left: 12px;
  float: left;
}

.header-right {
  float: right;
}

.weather-main {
  padding: 2px;
  overflow: auto;
}

.main-temp {
  font-size: 4em;
  right: 5px;
  float: left;
}

.main-right {
  float: right;
  text-align: left;
}

.show-forecast-btn {
  cursor: pointer;
  float: right;
  height: 15px;
  width: 15px;
  margin-top: 10px;
}

.forecast-icon {
  height: 10px;
  width: 10px;
  border-style: solid;
  border-color: black;
  border-width: 0px 1px 1px 0px;
  transform: rotate(45deg);
}

// .forecast-icon:hover {
.show-forecast-btn:hover .forecast-icon {
  border-bottom-width: 2px;
  border-right-width: 2px;
}

.forecast-icon-minus {
  box-sizing: border-box;
  height: 0px;
  width: 10px;
  border-style: solid;
  border-color: black;
  border-width: 1px 0 0 0;
  margin-top: 5px;
}

.show-forecast-btn:hover .forecast-icon-minus {
  border-width: 2px 0 0 0;
}

.circle {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -10px;
  right: -10px;
  background: whitesmoke;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  border: 1px solid black;
  cursor: pointer;
}

.circle::after {
  display: inline-block;
  content: "\00d7";
  font-size: 1.5em;
  color: gray;
}

.circle:hover::after {
  font-weight: bold;
}
</style>