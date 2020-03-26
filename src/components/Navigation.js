import React from "react";
import CityBtn from "./CityBtn";
import cities from "../data/cities";
import css from "./Navigation.module.css";

const Navigation = ({ onClick, isLoading, choosenCity }) => (
  <div className={css.buttonsBlock}>
    <div className={isLoading ? css.buttonsCover : css.buttonsNotCover}></div>
    {cities.map(city => (
      <CityBtn
        name={city.name}
        onClick={onClick}
        key={city.id}
        isLoading={isLoading}
        choosenCity={choosenCity}
      />
    ))}
  </div>
);

export default Navigation;
