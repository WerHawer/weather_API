import React from "react";
import css from "./CityBtn.module.css";

const CityBtn = ({ name, id, onClick, isLoading, choosenCity, onDelete }) => (
  <>
    <button
      type="button"
      onClick={onClick}
      name={name}
      disabled={isLoading}
      className={choosenCity === name ? css.active : css.button}
    >
      {isLoading ? <div className={css.ldsDualRing}></div> : name}
      <div
        className={name === "add City" ? css.del_none : css.del}
        onClick={onDelete}
      >
        <img src={require("../img/delete.png")} alt="del" id={id} />
      </div>
    </button>
  </>
);
export default CityBtn;
