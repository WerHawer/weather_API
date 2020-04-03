import React, { Component } from "react";
import shortid from "shortid";
import weatherAPI from "./utils/weatherAPI";
import getPosition from "./utils/nav";
import localStorage from "./utils/localStorage";
import Navigation from "./components/Navigation";
import WeatherInfo from "./components/WeatherInfo";
import FiveDaysWeather from "./components/FiveDaysWeather";
import WeatherByPosition from "./components/WeatherByPosition";

export default class App extends Component {
  state = {
    cities: [
      {
        id: shortid.generate(),
        name: "Kyiv"
      }
    ],
    addForm: false,
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

    const citiesLS = localStorage.load("cities");

    if (citiesLS) {
      this.setState({ cities: citiesLS });
    }

    this.setState({
      data: weatherData,
      fiveDaysWeather,
      isLoading: false
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    const { coords, cities } = this.state;
    if (prevState.coords !== coords) {
      const dataByPosition = await weatherAPI.getWeatherByPosition(coords);
      this.setState({ dataByPosition });
    }

    if (prevState.cities !== cities) {
      localStorage.save("cities", cities);
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

  onAddCityClick = () => {
    this.setState({ addForm: true });
  };

  onSubmitAddCity = e => {
    e.preventDefault();
    if (!e.target.elements.input.value) {
      this.setState({ addForm: false });
      return;
    }
    const newCity = {
      name: e.target.elements.input.value,
      id: shortid.generate()
    };
    this.setState({ addForm: false, cities: [...this.state.cities, newCity] });
  };

  onDeleteCity = e => {
    const cityToDel = e.target;
    e.stopPropagation();

    this.setState({
      cities: this.state.cities.filter(city => city.id !== cityToDel.id)
    });
  };

  render() {
    const {
      isLoading,
      choosenCity,
      data,
      fiveDaysWeather,
      dataByPosition,
      cities,
      addForm
    } = this.state;

    return (
      <div className="wrapper">
        <WeatherByPosition data={dataByPosition} />
        <Navigation
          onDelete={this.onDeleteCity}
          onAddCityClick={this.onAddCityClick}
          addForm={addForm}
          cities={cities}
          isLoading={isLoading}
          choosenCity={choosenCity}
          onClick={this.handleClickOnCityBtn}
          onSubmit={this.onSubmitAddCity}
        />
        <WeatherInfo data={data} />
        {fiveDaysWeather && (
          <FiveDaysWeather fiveDaysWeather={fiveDaysWeather} />
        )}
      </div>
    );
  }
}
