import React from "react";
import css from "./WeatherInfo.module.css";

const WeatherInfo = ({ data }) => (
  <>
    {data && (
      <ul className={css.list}>
        <li className={css.cityName}>{data.name}</li>

        <li className={css.element}>
          <span className={css.elementName}>Temperature</span>
          <span>{data.main.temp} °С</span>
        </li>

        <li className={css.element}>
          <span className={css.elementName}> Atmospheric pressure</span>
          <span>{data.main.pressure} hPa</span>
        </li>

        <li className={css.element}>
          <span className={css.elementName}>Humidity</span>
          <span>{data.main.humidity} %</span>
        </li>

        <li className={css.element}>
          <span className={css.elementName}>Wind speed </span>
          <span>{data.wind.speed} meter/sec</span>
        </li>

        <li className={css.element}>
          <span className={css.elementName}>Wind direction</span>
          <span>{data.wind.deg ? data.wind.deg : "90"} °</span>
        </li>
      </ul>
    )}
  </>
);

export default WeatherInfo;
