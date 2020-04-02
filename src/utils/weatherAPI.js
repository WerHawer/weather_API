import axios from "axios";

export default {
  BASE_URL: "https://api.openweathermap.org/data/2.5/",

  key: "c2dcf8ffb5cdc3f8977bfd2ae7ea4738",

  temperatureFormatC: "&units=metric",

  async getWeather(city) {
    try {
      const finalUrl = `${this.BASE_URL}find?q=${city}${this.temperatureFormatC}&appid=${this.key}`;
      const weatherResponse = await axios.get(finalUrl);

      return weatherResponse.data.list[0];
    } catch (error) {
      alert(error);
    }
  },

  async getFiveDaysWeather(city) {
    try {
      const finalUrl = `${this.BASE_URL}forecast?q=${city}${this.temperatureFormatC}&appid=${this.key}`;
      const weatherResponse = await axios.get(finalUrl);

      return weatherResponse.data;
    } catch (error) {
      alert(error);
    }
  },

  async getWeatherByPosition(coords) {
    try {
      const finalUrl = `${this.BASE_URL}weather?lat=${coords.lat}&lon=${coords.lon}${this.temperatureFormatC}&appid=${this.key}`;
      const weatherResponse = await axios.get(finalUrl);

      return weatherResponse.data;
    } catch (error) {
      alert("leelel");
    }
  }
};
