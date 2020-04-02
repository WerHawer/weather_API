import React, { Component } from "react";
import css from "./FiveDaysWeather.module.css";
import mS from "../data/monthes";
import getTime from "../utils/getTime";
import shortid from "shortid";

const grupeByDate = arrData => {
  if (!arrData) return;

  const forecast = arrData.list;

  let grupeByDate = forecast.reduce((acc, el) => {
    const D = new Date(el.dt_txt).getDate();
    const M = new Date(el.dt_txt).getMonth();
    const Y = new Date(el.dt_txt).getFullYear();
    const minT = Math.floor(el.main.temp_min);
    const maxT = Math.floor(el.main.temp_max);

    const forecastObj = {
      D,
      M,
      Y,
      minT,
      maxT,
      id: shortid.generate(),
      icon: el.weather[0].icon
    };

    return (acc = [...acc, forecastObj]);
  }, []);

  grupeByDate = [...grupeByDate, {}];

  return grupeByDate;
};

const oneDayFilter = arr => {
  if (!arr) return;

  let filterByOneDate = [];
  arr.reduce((acc, el) => {
    if (acc.D === el.D) {
      const minT = acc.minT < el.minT ? acc.minT : el.minT;
      const maxT = acc.maxT > el.maxT ? acc.maxT : el.maxT;
      const icon = acc.icon.replace("n", "d");

      return (acc = { ...acc, minT, maxT, icon });
    } else {
      filterByOneDate = [...filterByOneDate, acc];
      return (acc = el);
    }
  });

  return filterByOneDate;
};

export default class FiveDaysWeather extends Component {
  state = { detailedDayInfo: "", choosen: "", oneDayFiltered: null };

  componentDidMount() {
    this.fiveDaysWeatherForecastBuilder(this.props.fiveDaysWeather);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.fiveDaysWeather !== this.props.fiveDaysWeather) {
      this.fiveDaysWeatherForecastBuilder(this.props.fiveDaysWeather);
    }
  }

  handleClickDetails = (e, oneDayForecastObj) => {
    const choosen = e.target.id;
    const { fiveDaysWeather } = this.props;

    const detailedDayInfo = fiveDaysWeather.list.filter(el => {
      const DM = new Date(el.dt_txt).getDate();
      const MM = new Date(el.dt_txt).getMonth();

      const { D, M } = oneDayForecastObj;

      return DM === D && MM === M;
    });

    this.setState({ detailedDayInfo, choosen });
  };

  handleClickHide = () => {
    this.setState({ detailedDayInfo: "", choosen: "" });
  };

  fiveDaysWeatherForecastBuilder = data => {
    const firstFilter = grupeByDate(data);
    const oneDayFiltered = oneDayFilter(firstFilter);
    this.setState({ oneDayFiltered });
  };

  render() {
    const { detailedDayInfo, choosen, oneDayFiltered } = this.state;
    return (
      <>
        <div className={css.container}>
          {oneDayFiltered &&
            oneDayFiltered.map(forecast => (
              <div key={forecast.id} className={css.oneDayContainer}>
                <p className={css.date}>{` ${forecast.D} ${mS[forecast.M]}`}</p>
                <div className={css.imgContainer}>
                  <img
                    src={`http://openweathermap.org/img/wn/${forecast.icon}.png`}
                    alt="weather"
                  />
                </div>

                <p>{`${forecast.minT} - ${forecast.maxT} °C`}</p>

                <button
                  className={choosen === forecast.id ? css.active : css.button}
                  type="button"
                  id={forecast.id}
                  onClick={e => this.handleClickDetails(e, forecast)}
                >
                  Day details
                </button>
              </div>
            ))}
        </div>
        {detailedDayInfo && (
          <div className={css.details}>
            <div className={css.container}>
              {detailedDayInfo.map(el => (
                <div key={el.dt}>
                  <p className={css.date}>{getTime(el.dt_txt)}</p>
                  <div className={css.weather}>
                    <div className={css.imgContainer}>
                      <img
                        src={`http://openweathermap.org/img/wn/${el.weather[0].icon}.png`}
                        alt="weather"
                      />
                    </div>
                    <p className={css.temperature}>{`${Math.floor(
                      el.main.temp
                    )} °C`}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={this.handleClickHide}
              className={css.button}
            >
              Hide
            </button>
          </div>
        )}
      </>
    );
  }
}