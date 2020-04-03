import React from "react";
import css from "./WeatherByPosition.module.css";
import { CSSTransition } from "react-transition-group";
import slideTransition from "../transitions/slide.module.css";

const WeatherByPosition = ({ data }) => (
  <CSSTransition
    in={!!data}
    timeout={500}
    unmountOnExit
    classNames={slideTransition}
  >
    <div className={css.container}>
      {data && (
        <>
          <h2 className={css.city}>{data.name}</h2>
          <p className={css.byPosition}>(weather by your position)</p>
          <div className={css.weather}>
            <img
              src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
              alt="weather"
            />
            <div>
              <p className={css.temperature}>
                {" "}
                {Math.floor(data.main.temp)} °C
              </p>
              <p className={css.temperature}>{data.weather[0].description}</p>
            </div>
          </div>
        </>
      )}
    </div>
  </CSSTransition>
);

export default WeatherByPosition;
