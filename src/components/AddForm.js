import React from "react";
import css from "./AddForm.module.css";

const AddForm = ({ onSubmit }) => (
  <form className={css.form} onSubmit={onSubmit}>
    <input
      type="text"
      placeholder="city name"
      className={css.input}
      name="input"
      autoFocus
    />
  </form>
);

export default AddForm;
