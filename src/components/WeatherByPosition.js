import React from "react";
import css from "./WeatherByPosition.module.css";

const WeatherByPosition = ({ data }) => (
  <div className={css.container}>
    {data && (
      <>
        <h2 className={css.city}>{data.name}</h2>
        <p className={css.city}>(weather by your position)</p>
        <div className={css.weather}>
          <img
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
            alt="weather"
          />
          <div>
            <p className={css.temperature}> {Math.floor(data.main.temp)} °C</p>
            <p>{data.weather[0].description}</p>
          </div>
        </div>
      </>
    )}
  </div>
);

export default WeatherByPosition;
