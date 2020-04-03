import React from "react";
import CityBtn from "./CityBtn";
import css from "./Navigation.module.css";
import AddCity from "./AddForm";
import { CSSTransition } from "react-transition-group";
import slideTransition from "../transitions/slide.module.css";

const Navigation = ({
  onClick,
  isLoading,
  choosenCity,
  cities,
  addForm,
  onAddCityClick,
  onSubmit,
  onDelete
}) => (
  <div className={css.buttonsBlock}>
    <CSSTransition
      in={addForm}
      timeout={500}
      unmountOnExit
      classNames={slideTransition}
    >
      <AddCity onSubmit={onSubmit} />
    </CSSTransition>

    <div className={isLoading ? css.buttonsCover : css.buttonsNotCover}></div>
    {cities.map(city => (
      <CityBtn
        name={city.name}
        id={city.id}
        onClick={onClick}
        key={city.id}
        isLoading={isLoading}
        choosenCity={choosenCity}
        onDelete={onDelete}
      />
    ))}
    <CityBtn name="add City" onClick={onAddCityClick} />
  </div>
);

export default Navigation;
