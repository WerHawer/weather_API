import axios from "axios";

export default {
  BASE_URL: "https://api.openweathermap.org/data/2.5/find?q=",

  key: "c2dcf8ffb5cdc3f8977bfd2ae7ea4738",

  temperatureFormatC: "&units=metric",

  async getWeather(city) {
    const finalUrl = `${this.BASE_URL}${city}${this.temperatureFormatC}&appid=${this.key}`;
    const weatherResponse = await axios.get(finalUrl);

    return weatherResponse.data.list[0];
  }
};
