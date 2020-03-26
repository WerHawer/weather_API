import React from "react";
import css from "./CityBtn.module.css";

const CityBtn = ({ name, onClick, isLoading, choosenCity }) => (
  <button
    type="button"
    onClick={onClick}
    name={name}
    disabled={isLoading}
    className={choosenCity === name ? css.active : css.button}
  >
    {isLoading ? <div className={css.ldsDualRing}></div> : name}
  </button>
);
export default CityBtn;
