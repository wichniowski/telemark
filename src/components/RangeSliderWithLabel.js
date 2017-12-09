import React from "react";
import PropTypes from "prop-types";
import styles from "./RangeSliderWithLabel.scss";

const RangeSliderWithLabel = ({ label, min, max, step, onChange }) => (
  <div className={styles.container}>
    <label>{label}</label>
    <input
      className={styles.range}
      onChange={onChange}
      type="range"
      min={min}
      max={max}
      step={step}
    />
  </div>
);

RangeSliderWithLabel.propTypes = {
  label: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  onChange: PropTypes.func
};

export default RangeSliderWithLabel;
