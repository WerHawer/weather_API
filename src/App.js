import React, { Component } from "react";
import weatherAPI from "./utils/weatherAPI";
import Navigation from "./components/Navigation";
import WeatherInfo from "./components/WeatherInfo";

export default class App extends Component {
  state = { choosenCity: "Kyiv", isLoading: false, data: "" };

  async componentDidMount() {
    const { choosenCity } = this.state;
    const weatherData = await weatherAPI.getWeather(choosenCity);

    this.setState({ data: weatherData });
  }

  handleClickOnCityBtn = async e => {
    this.setState({ isLoading: true, choosenCity: e.target.name, data: null });
    const weatherData = await weatherAPI.getWeather(e.target.name);

    this.setState({ isLoading: false, data: weatherData });
  };
  render() {
    const { isLoading, choosenCity, data } = this.state;
    console.log(data);
    return (
      <div className="wrapper">
        <Navigation
          isLoading={isLoading}
          choosenCity={choosenCity}
          onClick={this.handleClickOnCityBtn}
        />
        <WeatherInfo data={data} />
      </div>
    );
  }
}
