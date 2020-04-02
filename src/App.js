import React, { Component } from "react";
import weatherAPI from "./utils/weatherAPI";
import Navigation from "./components/Navigation";
import WeatherInfo from "./components/WeatherInfo";
import FiveDaysWeather from "./components/FiveDaysWeather";
import getPosition from "./utils/nav";
import WeatherByPosition from "./components/WeatherByPosition";

export default class App extends Component {
  state = {
    choosenCity: "Kyiv",
    isLoading: false,
    data: "",
    dataByPosition: "",
    fiveDaysWeather: null,
    coords: null
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const { choosenCity } = this.state;
    const weatherData = await weatherAPI.getWeather(choosenCity);
    const fiveDaysWeather = await weatherAPI.getFiveDaysWeather(choosenCity);

    getPosition.then(coords => this.setState({ coords }));

    this.setState({
      data: weatherData,
      fiveDaysWeather,
      isLoading: false
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    const { coords, dataByPosition } = this.state;
    if (prevState.coords !== this.state.coords) {
      const dataByPosition = await weatherAPI.getWeatherByPosition(coords);
      this.setState({ dataByPosition });
    }
  }

  handleClickOnCityBtn = async e => {
    const choosenCity = e.target.name;
    this.setState({
      isLoading: true,
      choosenCity,
      data: null,
      fiveDaysWeather: null
    });
    const weatherData = await weatherAPI.getWeather(choosenCity);
    const fiveDaysWeather = await weatherAPI.getFiveDaysWeather(choosenCity);

    this.setState({ isLoading: false, data: weatherData, fiveDaysWeather });
  };

  render() {
    const {
      isLoading,
      choosenCity,
      data,
      fiveDaysWeather,
      dataByPosition
    } = this.state;

    return (
      <div className="wrapper">
        <WeatherByPosition data={dataByPosition} />
        <Navigation
          isLoading={isLoading}
          choosenCity={choosenCity}
          onClick={this.handleClickOnCityBtn}
        />
        <WeatherInfo data={data} />
        {fiveDaysWeather && (
          <FiveDaysWeather fiveDaysWeather={fiveDaysWeather} />
        )}
      </div>
    );
  }
}
